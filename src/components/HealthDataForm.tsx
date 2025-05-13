import React, { useState } from 'react';
import { useHealthData } from '../hooks/useHealthData';
import { HealthRecord } from '../utils/indexedDBService';

const HealthDataForm: React.FC = () => {
  const { error, addRecord } = useHealthData();
  
  const [formData, setFormData] = useState<Omit<HealthRecord, 'id' | 'timestamp'>>({
    recordType: 'bloodPressure',
    value: 120,
    unit: 'mmHg',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await addRecord({
        timestamp: Date.now(),
        recordType: formData.recordType,
        value: formData.value,
        unit: formData.unit,
        notes: formData.notes
      });
      
      // Reset form
      setFormData({
        recordType: 'bloodPressure',
        value: 120,
        unit: 'mmHg',
        notes: ''
      });
      
      alert('Health record saved successfully!');
    } catch (err) {
      alert('Failed to save health record. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Record Health Data</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="recordType" className="block mb-2 font-medium">
            Type of Reading
          </label>
          <select 
            id="recordType"
            name="recordType"
            className="w-full p-2 border rounded"
            value={formData.recordType}
            onChange={handleChange}
          >
            <option value="bloodPressure">Blood Pressure</option>
            <option value="bloodGlucose">Blood Glucose</option>
            <option value="weight">Weight</option>
            <option value="heartRate">Heart Rate</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="value" className="block mb-2 font-medium">
            Value
          </label>
          <input
            type="number"
            id="value"
            name="value"
            className="w-full p-2 border rounded"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="unit" className="block mb-2 font-medium">
            Unit
          </label>
          <input
            type="text"
            id="unit"
            name="unit"
            className="w-full p-2 border rounded"
            value={formData.unit}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="notes" className="block mb-2 font-medium">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className="w-full p-2 border rounded"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
          />
        </div>
        
        <button 
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Record
        </button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default HealthDataForm;