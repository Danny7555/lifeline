const CACHE_NAME = 'lifeline-offline-v1';

// Assets to cache
const urlsToCache = [
  '/',
  '/offline.html',
  '/icons/life.png',
  '/manifest.json',
  '/images/logo.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.error('Cache failed:', err))
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            // Check if valid response
            if (!response || response.status !== 200) {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If fetch fails, return offline page for navigation
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            // Return cached logo for image requests
            if (event.request.destination === 'image') {
              return caches.match('/icons/life.png');
            }
            // Return cached stylesheet for CSS
            if (event.request.destination === 'style') {
              return new Response(
                'body { font-family: system-ui; background: #f5f5f5; }',
                { headers: { 'Content-Type': 'text/css' } }
              );
            }
          });
      })
  );
});
