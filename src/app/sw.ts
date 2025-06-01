import { installSerwist } from '@serwist/sw';
import { NetworkOnly } from '@serwist/strategies';

interface CustomServiceWorkerGlobalScope extends ServiceWorkerGlobalScope {
  __SW_MANIFEST: Array<string | { url: string; revision: string | null }> | undefined;
}
declare const self: CustomServiceWorkerGlobalScope;

// Define runtime rules - all requests go to network
const runtimeCaching = [
  // All routes use NetworkOnly strategy
  {
    matcher: ({ url }: { url: URL }) => true,
    handler: new NetworkOnly(),
    options: {}
  }
];

// Install service worker with Serwist - no caching
installSerwist({
  precacheEntries: [], // Empty array instead of self.__SW_MANIFEST to avoid precaching
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching,
});

// Install event listener
self.addEventListener('install', (event) => {
  console.log('Service worker installed');
  // Skip waiting phase
  self.skipWaiting();
});

// Activate event listener
self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
  // Claim clients to take control immediately
  event.waitUntil(self.clients.claim());
});

// Simple message handler only for skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
