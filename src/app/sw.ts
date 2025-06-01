import { installSerwist } from '@serwist/sw';

interface CustomServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
  __SW_MANIFEST: Array<string | { url: string; revision: string | null }> | undefined;
}
declare const self: CustomServiceWorkerGlobalScope;

// Reference to SW_MANIFEST to prevent build errors
const manifest = self.__SW_MANIFEST;

// Install minimal service worker
installSerwist({
  precacheEntries: [],
  skipWaiting: true,
  clientsClaim: true,
  disableDevLogs: true,
  navigationPreload: false,
  runtimeCaching: [],
});

// Completely replaced fetch handler to always prioritize network
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip handling authentication-related requests
  if (url.pathname.includes('/api/auth/') || 
      url.pathname.includes('/api/register') ||
      url.pathname.includes('/auth/signIn') || 
      url.pathname.includes('/auth/signUp')) {
    return; // Let the browser handle auth requests normally
  }
  
  // Skip handling certain types of requests
  if (url.pathname.includes('_next/data/')) {
    return;
  }
  
  // Skip handling external requests (like Google OAuth)
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // For all other requests, prioritize network
  event.respondWith(
    fetch(event.request).catch(() => {
      // Fallback to cache if network fails
      return caches.match(event.request).then(response => {
        // Return the cached response if found, otherwise return a custom offline response
        return response || new Response('Offline content not available', { 
          status: 503, 
          statusText: 'Service Unavailable' 
        });
      });
    })
  );
});

// Immediately skip waiting on install
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Explicitly claim clients on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
