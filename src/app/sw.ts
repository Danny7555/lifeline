import { installSerwist } from '@serwist/sw';
import { NetworkOnly } from '@serwist/strategies';

interface CustomServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
  __SW_MANIFEST: Array<string | { url: string; revision: string | null }> | undefined;
}
declare const self: CustomServiceWorkerGlobalScope;

// Reference to SW_MANIFEST to prevent build errors
const manifest = self.__SW_MANIFEST;

// Install minimal service worker with no caching
installSerwist({
  precacheEntries: [],  // Empty array to prevent precaching
  skipWaiting: true,
  clientsClaim: true,
  disableDevLogs: true,
  navigationPreload: false,  // Disable navigation preload
  runtimeCaching: [],  // Empty runtime caching
});

// Immediately skip waiting on install
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Explicitly claim clients on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Handle fetch events with specific Google auth bypass
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Don't intercept ANY auth-related requests
  if (url.pathname.includes('/api/auth') || 
      url.pathname.includes('/auth/') ||
      url.search.includes('callback') ||
      url.search.includes('error=') ||
      url.search.includes('callbackUrl') ||
      // Google-specific auth endpoints
      url.hostname.includes('accounts.google.com') ||
      url.pathname.includes('/oauth2/') ||
      url.pathname.includes('/signin/') ||
      url.search.includes('oauth') ||
      // Common Google Auth endpoints
      url.hostname.includes('apis.google.com') ||
      url.hostname.includes('oauth2.googleapis.com') ||
      // Completely bypass NextAuth.js paths
      url.pathname.startsWith('/auth')) {
    return; // Let the browser handle these requests directly
  }
  
  // For all other requests, use NetworkOnly strategy
  // to prevent caching that might interfere with auth
  event.respondWith(new NetworkOnly().handle(event));
});
