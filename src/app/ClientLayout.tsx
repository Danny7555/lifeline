"use client";
import React, { useEffect } from 'react';
import LoaderWrapper from './components/LoaderWrapper';
import IndexedDBInitializer from '../indexed-components/IndexedDBInitializer';
import { AuthProvider } from "./providers";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          console.log('Unregistering service worker');
          registration.unregister();
        });
    
        if (registrations.length > 0) {
          window.location.reload();
        }
      });
    }
  }, []);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:text-black focus:z-50">
        Skip to main content
      </a>
      
      {/* This initializes IndexedDB on client-side */}
      <IndexedDBInitializer />
      
      {/* Wrap everything in AuthProvider, then LoaderWrapper */}
      <AuthProvider>
        <LoaderWrapper>
          <main id="main-content">
            {children}
          </main>
        </LoaderWrapper>
      </AuthProvider>
    </>
  );
}