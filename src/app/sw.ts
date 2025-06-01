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

// Immediately skip waiting on install
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Explicitly claim clients on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
