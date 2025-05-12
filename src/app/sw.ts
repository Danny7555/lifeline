import { installSerwist } from '@serwist/sw';

interface CustomServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
  __SW_MANIFEST: Array<string | { url: string; revision: string | null }>;
}

declare const self: CustomServiceWorkerGlobalScope;

// Define runtime caching rules with proper matching
const runtimeCaching = [
  // Static assets
  {
    // Use string pattern instead of RegExp
    urlPattern: ({ url }: { url: URL }) => {
      const fileExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.ico', '.woff', '.woff2'];
      return fileExtensions.some(ext => url.pathname.endsWith(ext));
    },
    handler: 'CacheFirst' as const,
    options: {
      cacheName: 'static-assets',
      expiration: {
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
  // Google Fonts
  {
    urlPattern: ({ url }: { url: URL }) => {
      return url.origin === 'https://fonts.googleapis.com' || 
             url.origin === 'https://fonts.gstatic.com';
    },
    handler: 'CacheFirst' as const,
    options: {
      cacheName: 'google-fonts',
      expiration: {
        maxEntries: 25,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
      },
    },
  },
  // API calls
  {
    urlPattern: ({ url }: { url: URL }) => {
      return url.pathname.startsWith('/api/');
    },
    handler: 'NetworkFirst' as const,
    options: {
      cacheName: 'api-cache',
      networkTimeoutSeconds: 10,
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  // HTML pages
  {
    urlPattern: ({ url }: { url: URL }) => {
      return !url.pathname.startsWith('/api/') && 
             !url.pathname.match(/\.\w+$/) &&
             url.origin === self.location.origin;
    },
    handler: 'NetworkFirst' as const,
    options: {
      cacheName: 'pages-cache',
      expiration: {
        maxEntries: 30,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
      },
    },
  },
  // Images
  {
    urlPattern: ({ url }: { url: URL }) => {
      return url.pathname.startsWith('/images/');
    },
    handler: 'CacheFirst' as const,
    options: {
      cacheName: 'image-cache',
      expiration: {
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
];

// Install the service worker
installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  // @ts-ignore - Type mismatch between Serwist versions
  runtimeCaching,
});

// Handle installation
self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  event.waitUntil(
    Promise.all([
      // Pre-cache critical offline assets
      caches.open('offline-assets').then((cache) => {
        return cache.addAll([
          '/offline.html',
          '/icons/life.png',
          '/manifest.json',
        ]);
      }),
      self.skipWaiting(),
    ])
  );
});

// Handle activation
self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          // Delete caches that don't match our current names
          return cacheName.startsWith('workbox-') || 
                 (cacheName !== 'offline-assets' && 
                  cacheName !== 'static-assets' && 
                  cacheName !== 'google-fonts' && 
                  cacheName !== 'api-cache' && 
                  cacheName !== 'pages-cache' &&
                  cacheName !== 'image-cache');
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Handle fetch events for offline support
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Special handling for navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const response = await caches.match('/offline.html');
        return response || new Response(
          'You are offline. Please check your connection.',
          {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html'
            })
          }
        );
      })
    );
  }
  
  // Handle image requests with fallback
  else if (event.request.destination === 'image') {
    event.respondWith(
      fetch(event.request)
        .catch(async () => {
          const cachedResponse = await caches.match(event.request);
          const fallbackResponse = await caches.match('/icons/life.png');
          return cachedResponse || fallbackResponse || new Response('Image not found', { status: 404 });
        })
    );
  }
});

// Handle message events (useful for communicating with the main thread)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
