import { installSerwist } from '@serwist/sw';

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
      cacheName: 'static-assets',
      expiration: { maxEntries: 100, maxAgeSeconds: 2592000 }, // 30 days
    },
  },
  // API
  {
    matcher: ({ url }: { url: URL }) => url.pathname.startsWith('/api/'),
    handler: 'NetworkFirst',
    options: {
      cacheName: 'api-cache',
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

// Activate and cleanup - cache the rest of resources after activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !['offline-assets', 'static-assets', 'api-cache'].includes(k))
          .map((k) => caches.delete(k))
      );
      
      // Now cache the remaining resources in background
      const cache = await caches.open('offline-assets');
      const resourcesToPrecache = [
        '/', 
        '/favicon.ico', 
        '/contact',
        '/icons/life.png',
        '/manifest.json'
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

// Modified fetch handler that includes hard refresh logic
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip handling certain types of requests
  if (url.pathname.includes('_next/data/')) {
    return;
  }
  
  // Handle navigation requests with potential hard refresh
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
          
          // Force network refresh if it's been more than 30 minutes since last refresh
          const shouldHardRefresh = timeSinceLastRefresh > 30 * 60 * 1000;
          
          if (shouldHardRefresh) {
            // Bypass cache for a hard refresh
            const response = await fetch(event.request, { cache: 'reload' });
            // Update the refresh timestamp
            pageRefreshTimestamps.set(currentPath, currentTime);
            sendNavigationComplete();
            return response;
          }
          
          // Regular flow for non-hard-refresh
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            sendNavigationComplete();
            return preloadResponse;
          }
          
          const response = await fetch(event.request);
          sendNavigationComplete();
          return response;
        } catch (error) {
          const cache = await caches.open('offline-assets');
          const cachedResponse = await cache.match('/offline.html');
          return cachedResponse || new Response('Offline page not found', { status: 404 });
        }
      })()
    );
  } else {
    const isImage = /\.(jpe?g|png|gif|svg|webp|bmp|ico)$/i.test(url.pathname);
    
    if (isImage) {
      event.respondWith(
        caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) return cachedResponse;
            return fetch(event.request).catch(() => 
              new Response('Image not available offline', { status: 404 })
            );
          })
      );
    }
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'FORCE_REFRESH') {
    // Allow the client to request a hard refresh
    const path = event.data.path || '/';
    pageRefreshTimestamps.delete(path);
  }
});
