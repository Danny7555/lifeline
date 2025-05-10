"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LandingPage from './components/landingPage/page';
import Loader from './components/Loader';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);
  
  // Show loader on navigation
  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };

    window.addEventListener('beforeunload', handleRouteChange);
    
    return () => {
      window.removeEventListener('beforeunload', handleRouteChange);
    };
  }, [pathname]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <LandingPage />
    </>
  );
}