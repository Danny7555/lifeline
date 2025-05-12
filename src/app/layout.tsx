import React from 'react';
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/life.png" />
      </head>
      <body className={inter.className}>
        <LoaderWrapper>
          {children}
          <SpeedInsights />
        </LoaderWrapper>
      </body>
    </html>
  );
}
