import { installSerwist } from '@serwist/sw';

// Add a cache version that you can increment with each significant deployment
const CACHE_VERSION = '1';

interface CustomServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
  __SW_MANIFEST: Array<string | { url: string; revision: string | null }> | undefined;
}
declare const self: CustomServiceWorkerGlobalScope;

// Define runtime caching rules
const runtimeCaching = [
  // Static assets
  {
    matcher: ({ url }: { url: URL }) => {
      const exts = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.ico', '.woff', '.woff2'];
      return exts.some((ext) => url.pathname.endsWith(ext));
    },
    handler: 'CacheFirst',
    options: {
      cacheName: `static-assets-${CACHE_VERSION}`,
      expiration: { maxEntries: 100, maxAgeSeconds: 2592000 }, // 30 days
    },
  },
  // API
  {
    matcher: ({ url }: { url: URL }) => url.pathname.startsWith('/api/'),
    handler: 'NetworkFirst',
    options: {
      cacheName: `api-cache-${CACHE_VERSION}`,
      networkTimeoutSeconds: 5, // Reduced timeout
      expiration: { maxEntries: 50, maxAgeSeconds: 86400 }, // 24 hours
    },
  },
];

// Install service worker with Serwist
installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  // @ts-ignore - Type mismatch
  runtimeCaching,
});


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-assets').then((cache) => 
      cache.add('/offline.html').catch(err => 
        console.warn('Failed to cache offline page', err)
      )
    )
  );
});

// Activate and cleanup - delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => {
            // Delete any cache that doesn't match our current version
            return !key.includes(`-${CACHE_VERSION}`) && 
                  !key.includes('offline-assets'); // Keep the offline assets cache
          })
          .map((key) => {
            console.log(`Deleting old cache: ${key}`);
            return caches.delete(key);
          })
      );
      
      // Now cache the remaining resources in background
      const cache = await caches.open(`offline-assets-${CACHE_VERSION}`);
      const resourcesToPrecache = [
        '/', 
        '/icons/life.png',
        '/manifest.json',
        '/offline.html'
      ];
      
      // Cache resources in the background with timeouts
      resourcesToPrecache.forEach(resource => {
        // Use a timeout to prevent blocking
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        );
        
        Promise.race([
          fetch(resource).then(response => {
            if (response.ok) cache.put(resource, response);
            return response;
          }),
          timeoutPromise
        ]).catch(err => console.warn(`Background caching failed for ${resource}:`, err));
      });
      
      await self.clients.claim();
    })()
  );
});

// Track when pages were last refreshed
const pageRefreshTimestamps = new Map();

// Modified fetch handler with more aggressive refresh strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip handling certain types of requests
  if (url.pathname.includes('_next/data/')) {
    return;
  }
  
  // Handle navigation requests with more aggressive refresh strategy
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const sendNavigationComplete = () => {
            self.clients.matchAll().then(clients => {
              clients.forEach(client => {
                client.postMessage({ type: 'NAVIGATION_COMPLETE' });
              });
            });
          };
          
          const currentPath = url.pathname;
          const currentTime = Date.now();
          const lastRefreshTime = pageRefreshTimestamps.get(currentPath) || 0;
          const timeSinceLastRefresh = currentTime - lastRefreshTime;
          
          // Force network refresh if it's been more than 5 minutes since last refresh
          // This is much more aggressive than the 30 minutes from before
          const shouldHardRefresh = timeSinceLastRefresh > 5 * 60 * 1000;
          
          if (shouldHardRefresh) {
            // Add a custom header to bypass CDN cache if present
            const customHeaders = new Headers(event.request.headers);
            customHeaders.append('X-Force-Refresh', 'true');
            
            // Bypass cache for a hard refresh
            const freshRequest = new Request(event.request, {
              cache: 'reload',
              headers: customHeaders
            });
            
            const response = await fetch(freshRequest);
            // Update the refresh timestamp
            pageRefreshTimestamps.set(currentPath, currentTime);
            sendNavigationComplete();
            return response;
          }
          
          // Otherwise, try stale-while-revalidate approach
          const cachePromise = caches.match(event.request);
          const fetchPromise = fetch(event.request).then(response => {
            // If we get a valid response, cache it and update timestamp
            if (response && response.ok) {
              const clonedResponse = response.clone();
              caches.open(`offline-assets-${CACHE_VERSION}`).then(cache => {
                cache.put(event.request, clonedResponse);
              });
              pageRefreshTimestamps.set(currentPath, currentTime);
            }
            return response;
          });
          
          // Try to respond with cache first, but fetch in background
          const response = await cachePromise || fetchPromise;
          sendNavigationComplete();
          return response;
        } catch (error) {
          const cache = await caches.open(`offline-assets-${CACHE_VERSION}`);
          const cachedResponse = await cache.match('/offline.html');
          return cachedResponse || new Response('Offline page not found', { status: 404 });
        }
      })()
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'FORCE_REFRESH') {
    const path = event.data.path || '/';
    pageRefreshTimestamps.delete(path);
  } else if (event.data && event.data.type === 'CLEAR_ALL_CACHES') {
    // Add handling for completely purging caches
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        console.log('All caches cleared successfully');
        // Notify clients that caches were cleared
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'CACHES_CLEARED'
            });
          });
        });
      })
    );
  }
});
