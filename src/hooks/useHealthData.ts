import { useState, useEffect } from 'react';
import { 
  HealthRecord, 
  addHealthRecord, 
  getAllHealthRecords, 
  getHealthRecordsByType, 
  updateHealthRecord,
  deleteHealthRecord
} from '../utils/indexedDBService';

export const useHealthData = (recordType?: string) => {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Load records on component mount
  useEffect(() => {
    const loadRecords = async () => {
      try {
        setLoading(true);
        
        const data = recordType 
          ? await getHealthRecordsByType(recordType)
          : await getAllHealthRecords();
          
        setRecords(data);
        setError(null);
      } catch (err) {
        console.error('Error loading health records:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, [recordType]);

  // Add a new record
  const addRecord = async (record: Omit<HealthRecord, 'id'>) => {
    try {
      const newId = await addHealthRecord(record as HealthRecord);
      const newRecord = { ...record, id: newId };
      setRecords(prev => [...prev, newRecord]);
      return newId;
    } catch (err) {
      console.error('Error adding health record:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  };

  // Update an existing record
  const updateRecord = async (record: HealthRecord) => {
    try {
      await updateHealthRecord(record);
      setRecords(prev => 
        prev.map(r => r.id === record.id ? record : r)
      );
    } catch (err) {
      console.error('Error updating health record:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  };

  // Delete a record
  const deleteRecord = async (id: number) => {
    try {
      await deleteHealthRecord(id);
      setRecords(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      console.error('Error deleting health record:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    }
  };

  return {
    records,
    loading,
    error,
    addRecord,
    updateRecord,
    deleteRecord
  };
};