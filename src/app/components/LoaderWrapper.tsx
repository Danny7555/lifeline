"use client";
import React, { useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Loader from './Loader';

interface LoaderWrapperProps {
  children: ReactNode;
}

export default function LoaderWrapper({ children }: LoaderWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  
  useEffect(() => {
    // Initial loading with safety timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Safety mechanism - ensure loader disappears after max time
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, []);
  
  // Show loader on navigation
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    // Safety mechanism - ensure loader disappears after max time
    const safetyTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(safetyTimer);
    };
  }, [pathname]);

  return (
    <>
      <Loader isLoading={isLoading} />
      {children}
    </>
  );
}