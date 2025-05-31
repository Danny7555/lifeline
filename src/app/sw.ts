import { installSerwist } from '@serwist/sw';
import { StaleWhileRevalidate, NetworkOnly } from '@serwist/strategies';

// Add a cache version that you can increment with each significant deployment
const CACHE_VERSION = '1';

interface CustomServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
  __SW_MANIFEST: Array<string | { url: string; revision: string | null }> | undefined;
}
declare const self: CustomServiceWorkerGlobalScope;

// Define runtime caching rules - completely exclude auth routes
const runtimeCaching = [
  // Static assets
  {
    matcher: ({ url }: { url: URL }) => {
      const exts = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.ico', '.woff', '.woff2'];
      return exts.some((ext) => url.pathname.endsWith(ext));
    },
    handler: new StaleWhileRevalidate(),
    options: {
      cacheName: `static-assets-${CACHE_VERSION}`,
      expiration: { maxEntries: 100, maxAgeSeconds: 3600 },
    },
  },
  // API - exclude auth routes completely
  {
    matcher: ({ url }: { url: URL }) => {
      // Skip auth-related routes - make sure these are COMPLETELY excluded
      if (url.pathname.includes('/api/auth/') || 
          url.pathname.includes('/api/register') ||
          url.pathname.includes('/auth/')) {
        return false;
      }
      return url.pathname.startsWith('/api/');
    },
    handler: new NetworkOnly(),
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
