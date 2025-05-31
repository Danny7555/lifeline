import { installSerwist } from '@serwist/sw';
import { StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies'; // Import strategies

const CACHE_VERSION = '1';

interface CustomServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
  __SW_MANIFEST: Array<string | { url: string; revision: string | null }> | undefined;
}
declare const self: CustomServiceWorkerGlobalScope;

// Updated runtimeCaching with proper Workbox strategies
const runtimeCaching = [
  // Static assets
  {
    matcher: ({ url }: { url: URL }) => 
      ['.js', '.css', '.png', '.jpg', '.svg', '.woff2'].some(ext => 
        url.pathname.endsWith(ext)
      ),
    handler: new StaleWhileRevalidate({ // ✅ Use strategy object
      cacheName: `static-assets-${CACHE_VERSION}`,
    }),
  },
  // API routes
  {
    matcher: ({ url }: { url: URL }) => url.pathname.startsWith('/api/'),
    handler: new NetworkOnly(), // ✅ Force network
  },
];

installSerwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching, // ✅ No more type errors
});

// Minimal offline page cache (keep this)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-assets').then(cache => 
      cache.add('/offline.html').catch(console.warn)
    )
  );
});

// Cache cleanup (keep this)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== 'offline-assets').map(key => caches.delete(key)))
    )
  );
});

// Remove your custom fetch handler entirely - Serwist handles it!