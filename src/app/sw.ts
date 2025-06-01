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

// Critical: Bypass ALL fetch events
// This prevents the service worker from intercepting any requests
self.addEventListener('fetch', (event) => {
  // Do not call event.respondWith()
  // This allows the browser to handle all requests normally
  return;
});
