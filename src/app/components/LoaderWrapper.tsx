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
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  // Show loader on navigation
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <Loader isLoading={isLoading} />
      {children}
    </>
  );
}