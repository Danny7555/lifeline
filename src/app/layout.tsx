import React from 'react';
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import LoaderWrapper from './components/LoaderWrapper';
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
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  viewportFit: 'cover',
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoaderWrapper>
          {children}
        </LoaderWrapper>
      </body>
    </html>
  );
}
