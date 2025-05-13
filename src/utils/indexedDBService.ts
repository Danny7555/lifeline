/**
 * IndexedDB service for client-side data storage
 */

const DB_NAME = 'lifelinerDB';
const DB_VERSION = 1;

/**
 * Check if running in browser environment
 */
const isBrowser = typeof window !== 'undefined' && window.indexedDB;

// Define your database schema types
export interface HealthRecord {
  id?: number;
  timestamp: number; // Use timestamps for easier sorting
  recordType: string;
  value: number;
  unit: string;
  notes?: string;
}

// Initialize the database
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    // IndexedDB is only available in browser environments
    if (!isBrowser) {
      console.warn('IndexedDB is not available in this environment');
      reject(new Error('IndexedDB is not available in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error('IndexedDB error:', event);
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    // This is called if the database doesn't exist or needs upgrading
    request.onupgradeneeded = (event) => {
      console.log('Creating or upgrading IndexedDB');
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object stores (similar to tables in SQL)
      if (!db.objectStoreNames.contains('healthRecords')) {
        const healthStore = db.createObjectStore('healthRecords', { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        
        // Create indexes for faster querying
        healthStore.createIndex('timestamp', 'timestamp', { unique: false });
        healthStore.createIndex('recordType', 'recordType', { unique: false });
      }

      if (!db.objectStoreNames.contains('userPreferences')) {
        db.createObjectStore('userPreferences', { keyPath: 'key' });
      }
    };
  });
};

// Add a health record
export const addHealthRecord = async (record: HealthRecord): Promise<number> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('healthRecords', 'readwrite');
    const store = transaction.objectStore('healthRecords');
    
    const request = store.add(record);
    
    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result as number);
    };
    
    request.onerror = () => {
      reject(new Error('Failed to add health record'));
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

// Get all health records
export const getAllHealthRecords = async (): Promise<HealthRecord[]> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('healthRecords', 'readonly');
    const store = transaction.objectStore('healthRecords');
    const request = store.getAll();
    
    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result as HealthRecord[]);
    };
    
    request.onerror = () => {
      reject(new Error('Failed to retrieve health records'));
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

// Get health records by type
export const getHealthRecordsByType = async (recordType: string): Promise<HealthRecord[]> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('healthRecords', 'readonly');
    const store = transaction.objectStore('healthRecords');
    const index = store.index('recordType');
    const request = index.getAll(recordType);
    
    request.onsuccess = (event) => {
      resolve((event.target as IDBRequest).result as HealthRecord[]);
    };
    
    request.onerror = () => {
      reject(new Error(`Failed to retrieve ${recordType} records`));
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

// Update a health record
export const updateHealthRecord = async (record: HealthRecord): Promise<void> => {
  if (!record.id) {
    throw new Error('Record ID is required for update');
  }
  
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('healthRecords', 'readwrite');
    const store = transaction.objectStore('healthRecords');
    const request = store.put(record);
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = () => {
      reject(new Error('Failed to update health record'));
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

// Delete a health record
export const deleteHealthRecord = async (id: number): Promise<void> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('healthRecords', 'readwrite');
    const store = transaction.objectStore('healthRecords');
    const request = store.delete(id);
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = () => {
      reject(new Error('Failed to delete health record'));
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

// Save user preferences
export const savePreference = async (key: string, value: any): Promise<void> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('userPreferences', 'readwrite');
    const store = transaction.objectStore('userPreferences');
    
    const request = store.put({ key, value });
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = () => {
      reject(new Error('Failed to save preference'));
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

// Get user preferences
export const getPreference = async (key: string): Promise<any> => {
  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('userPreferences', 'readonly');
    const store = transaction.objectStore('userPreferences');
    
    const request = store.get(key);
    
    request.onsuccess = (event) => {
      const result = (event.target as IDBRequest).result;
      resolve(result ? result.value : null);
    };
    
    request.onerror = () => {
      reject(new Error('Failed to retrieve preference'));
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};