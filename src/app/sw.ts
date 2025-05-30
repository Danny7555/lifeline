import { installSerwist } from '@serwist/sw';

// Add a cache version that you can increment with each significant deployment
const CACHE_VERSION = '1';

interface CustomServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
  __SW_MANIFEST: Array<string | { url: string; revision: string | null }> | undefined;
}
declare const self: CustomServiceWorkerGlobalScope;

// Define runtime caching rules - modified to prioritize fresh content
const runtimeCaching = [
  // Static assets - still cache but with network checks
  {
    matcher: ({ url }: { url: URL }) => {
      const exts = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.ico', '.woff', '.woff2'];
      return exts.some((ext) => url.pathname.endsWith(ext));
    },
    handler: 'StaleWhileRevalidate', // Changed from CacheFirst to always check for updates
    options: {
      cacheName: `static-assets-${CACHE_VERSION}`,
      expiration: { maxEntries: 100, maxAgeSeconds: 3600 }, // Reduced to 1 hour
    },
  },
  // API - always get from network first
  {
    matcher: ({ url }: { url: URL }) => url.pathname.startsWith('/api/'),
    handler: 'NetworkOnly', // Changed from NetworkFirst to always use network
    options: {
      cacheName: `api-cache-${CACHE_VERSION}`,
      networkTimeoutSeconds: 5,
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

// Only cache the offline page
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-assets').then((cache) => 
      cache.add('/offline.html').catch(err => 
        console.warn('Failed to cache offline page', err)
      )
    )
  );
});

// Activate and cleanup - delete all caches except offline page
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => {
            // Only keep the offline assets cache
            return key !== 'offline-assets';
          })
          .map((key) => {
            console.log(`Deleting cache: ${key}`);
            return caches.delete(key);
          })
      );
      
      await self.clients.claim();
    })()
  );
});

// Completely replaced fetch handler to always prioritize network
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip handling authentication-related requests
  if (url.pathname.includes('/api/auth/') || 
      url.pathname.includes('/auth/signIn') || 
      url.pathname.includes('/auth/signUp')) {
    return; // Let the browser handle auth requests normally
  }
  
  // Skip handling certain types of requests
  if (url.pathname.includes('_next/data/')) {
    return;
  }
  
  // For navigation requests, always try network first, fall back to offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Always add cache-busting query param to force fresh content
          const freshUrl = new URL(event.request.url);
          freshUrl.searchParams.append('_sw_nocache', Date.now().toString());
          
          const customHeaders = new Headers(event.request.headers);
          customHeaders.append('X-Force-Refresh', 'true');
          customHeaders.append('Cache-Control', 'no-cache, no-store, must-revalidate');
          customHeaders.append('Pragma', 'no-cache');
          
          // Always try network first with cache-busting
          const freshRequest = new Request(freshUrl, {
            cache: 'no-store',
            headers: customHeaders
          });
          
          return await fetch(freshRequest);
        } catch (error) {
          console.error('Failed to fetch from network:', error);
          // Only fall back to offline page when completely offline
          const cache = await caches.open('offline-assets');
          const cachedResponse = await cache.match('/offline.html');
          return cachedResponse || new Response('Offline page not found', { status: 404 });
        }
      })()
    );
  } else {
    // For non-navigation requests (assets, API calls)
    event.respondWith(
      (async () => {
        try {
          // For API calls, always use network
          if (url.pathname.startsWith('/api/')) {
            return await fetch(event.request);
          }
          
          // For static assets, still try network first
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          // Fall back to cache only when offline
          const cachedResponse = await caches.match(event.request);
          return cachedResponse || new Response('Resource not available offline', { status: 404 });
        }
      })()
    );
  }
});

// Message handler to clear caches
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'CLEAR_ALL_CACHES') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(name => name !== 'offline-assets').map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        console.log('All caches cleared successfully');
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
