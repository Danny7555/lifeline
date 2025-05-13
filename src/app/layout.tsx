import React from 'react';
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import LoaderWrapper from './components/LoaderWrapper';
import IndexedDBInitializer from '../indexed-components/IndexedDBInitializer';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'Lifeliner - Your Health Companion',
  description: 'Login to your Lifeliner account and manage your health journey',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/life.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Lifeliner - Your Health Companion',
  },
  formatDetection: {
    telephone: false,
  },
  applicationName: 'Lifeliner',
  authors: [{ name: 'Lifeliner Team' }],
  keywords: ['health', 'wellness', 'tracking', 'medical', 'accessibility'],
  category: 'Health & Wellness',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FC7A7A',
  viewportFit: 'cover',
  minimumScale: 1,
  maximumScale: 5, 
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:text-black focus:z-50">
          Skip to main content
        </a>
        {/* This initializes IndexedDB on client-side */}
        <IndexedDBInitializer />
        <LoaderWrapper>
          <main id="main-content">
            {children}
          </main>
        </LoaderWrapper>
      </body>
    </html>
  );
}
