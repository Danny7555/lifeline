
import React from 'react';
import type { Metadata } from "next";
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
  title: "Lifeliner - Your Health Companion",
  description: "Login to your Lifeliner account and manage your health journey",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoaderWrapper>
          {children}
          <SpeedInsights />
        </LoaderWrapper>
      </body>
    </html>
  );
}
