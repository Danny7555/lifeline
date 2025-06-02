"use client";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ResponsiveSidebar } from "../components/responsive-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== 'loading') {
      setIsLoading(false);
     
      if (status === 'unauthenticated') {
        redirect('/auth/signIn');
      }
    }
  }, [status]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-red-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === 'authenticated') {
    return (
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <ResponsiveSidebar />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    );
  }

  return null;
}