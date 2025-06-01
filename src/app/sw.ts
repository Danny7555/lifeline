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

// Critical: Bypass ALL auth-related fetch events
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Don't intercept ANY auth-related requests
  if (url.pathname.includes('/api/auth') || 
      url.pathname.includes('/auth/') ||
      url.search.includes('callback') ||
      url.search.includes('error=')) {
    return; // Let the browser handle these requests
  }
  
  // For all other requests
  return;
});
