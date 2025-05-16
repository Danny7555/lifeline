"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LandingPage from './components/landingPage/page';
import Loader from './components/Loader';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  
  // Initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  // Show loader on navigation between routes
  useEffect(() => {
  
    if (!isLoading) {
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, isLoading]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <LandingPage />
    </>
  );
}