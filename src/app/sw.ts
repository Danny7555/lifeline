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
      networkTimeoutSeconds: 10,
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

// Offline installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open('offline-assets');
      await cache.addAll([
        '/', 
        '/auth',
        '/landingPage', 
        '/contact',
        '/offline.html',
        '/icons/life.png',
        '/manifest.json'
      ]);
      await self.skipWaiting();
    })()
  );
});

// Activate and cleanup
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !['offline-assets', 'static-assets', 'api-cache'].includes(k))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

// Fetch event for offline fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => 
        caches.match('/offline.html').then(response => 
          response ?? new Response('Offline page not found', { status: 404 })
        )
      )
    );
  } else {
    const url = new URL(event.request.url);
    const isImage = /\.(jpe?g|png|gif|svg|webp|bmp|ico)$/i.test(url.pathname);
    
    if (isImage) {
      event.respondWith(
        caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            return fetch(event.request).catch(() => {
              return new Response('Image not available offline', { status: 404 });
            });
          })
      );
    }
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
