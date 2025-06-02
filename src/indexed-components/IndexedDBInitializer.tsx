'use client';

import { useEffect, useState } from 'react';
import { initDB } from '../utils/indexedDBService';

/**
 * This component initializes the IndexedDB database on mount
 * Place it in your layout or top-level component
 */
const IndexedDBInitializer: React.FC = () => {
  const [dbInitialized, setDbInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
    const initialize = async () => {
      try {
        await initDB();
        console.log('IndexedDB initialized successfully');
        setDbInitialized(true);
      } catch (err) {
        console.error('Failed to initialize IndexedDB:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    initialize();
  }, []);

  // Only show error in development
  if (error && process.env.NODE_ENV === 'development') {
    return <div style={{ display: 'none' }}>IndexedDB Error: {error.message}</div>;
  }

  // Component doesn't render anything visible
  return null;
};

export default IndexedDBInitializer;