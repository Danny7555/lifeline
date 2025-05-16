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

// Optimized fetch handler
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Add this check to prevent infinite loading
  const url = new URL(event.request.url);
  // Skip handling certain types of requests that might interfere with normal navigation
  if (url.pathname.includes('_next/data/')) {
    return; // Let the browser handle Next.js data requests normally
  }
  
  // Use navigation preload for better performance
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Always notify clients after navigation, regardless of cache or network
          const sendNavigationComplete = () => {
            self.clients.matchAll().then(clients => {
              clients.forEach(client => {
                client.postMessage({ type: 'NAVIGATION_COMPLETE' });
              });
            });
          };
          
          // Try to use navigation preload response if available
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            sendNavigationComplete();
            return preloadResponse;
          }
          
          // Otherwise do a network request
          const response = await fetch(event.request);
          sendNavigationComplete();
          return response;
        } catch (error) {
          // Fall back to the offline page if network fails
          const cache = await caches.open('offline-assets');
          const cachedResponse = await cache.match('/offline.html');
          return cachedResponse || new Response('Offline page not found', { status: 404 });
        }
      })()
    );
  } else {
    const url = new URL(event.request.url);
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
  
  // If it's a navigation request, notify clients when complete
  if (event.request.mode === 'navigate') {
    event.waitUntil(
      fetch(event.request).then(() => {
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({ type: 'NAVIGATION_COMPLETE' });
          });
        });
      }).catch(err => console.warn('Navigation notification failed:', err))
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
