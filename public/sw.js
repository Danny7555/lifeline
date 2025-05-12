const CACHE_NAME = 'lifeline-offline-v2';

const urlsToCache = [
  '/',
  '/offline.html',
  '/icons/life.png',
  '/manifest.json',
  '/images/logo.png',
  '/_next/static/**/*',
  '/api/**/*',
  // Fonts
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.gstatic.com/**/*'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Cache failed:', err);
        throw err;
      })
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => cacheName !== CACHE_NAME)
            .map(cacheName => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  // Handle non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request.clone())
          .then(response => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cache the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(err => console.error('Cache put failed:', err));

            return response;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            
            // Handle offline scenarios
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
            
            if (event.request.destination === 'image') {
              return caches.match('/icons/life.png');
            }
            
            if (event.request.destination === 'style') {
              return new Response(
                `body { 
                  font-family: 'Inter', system-ui, sans-serif; 
                  background: #f5f5f5;
                  color: #333;
                  margin: 0;
                  padding: 20px;
                }`,
                { 
                  headers: { 
                    'Content-Type': 'text/css',
                    'Cache-Control': 'public, max-age=31536000'
                  } 
                }
              );
            }
            
            // Default fallback
            return new Response('Offline Content Not Available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain',
                'Cache-Control': 'no-cache'
              })
            });
          });
      })
  );
});
