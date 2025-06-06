"use client";
import React, { useState, useEffect } from 'react';
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

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-update unit based on record type
  useEffect(() => {
    const unitMap: {[key: string]: string} = {
      bloodPressure: 'mmHg',
      bloodGlucose: 'mg/dL',
      weight: 'kg',
      heartRate: 'bpm',
      temperature: '°C',
      oxygenSaturation: '%'
    };
    
    setFormData(prev => ({
      ...prev,
      unit: unitMap[prev.recordType] || prev.unit
    }));
  }, [formData.recordType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addRecord({
        timestamp: Date.now(),
        recordType: formData.recordType,
        value: formData.value,
        unit: formData.unit,
        notes: formData.notes
      });
      
      // Reset form
      setFormData(prev => ({
        ...prev,
        value: getDefaultValue(prev.recordType),
        notes: ''
      }));
      
      setSuccessMessage('Health record saved successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultValue = (recordType: string): number => {
    const defaults: {[key: string]: number} = {
      bloodPressure: 120,
      bloodGlucose: 100,
      weight: 70,
      heartRate: 75,
      temperature: 37,
      oxygenSaturation: 98
    };
    return defaults[recordType] || 0;
  };

  const getValueLabel = (recordType: string): string => {
    const labels: {[key: string]: string} = {
      bloodPressure: 'Systolic/Diastolic',
      bloodGlucose: 'Blood Glucose Level',
      weight: 'Weight',
      heartRate: 'Heart Rate',
      temperature: 'Body Temperature',
      oxygenSaturation: 'Oxygen Saturation'
    };
    return labels[recordType] || 'Value';
  };

  const getRecordTypeIcon = (type: string): string => {
    const icons: {[key: string]: string} = {
      bloodPressure: '🫀', 
      bloodGlucose: '🩸',
      weight: '⚖️',
      heartRate: '💓',
      temperature: '🌡️',
      oxygenSaturation: '💨'
    };
    return icons[type] || '📊';
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg transition-all">
      <div className="flex items-center space-x-3 mb-5">
        <div className="bg-blue-100 p-3 rounded-full">
          <span role="img" aria-label="health icon" className="text-2xl">
            {getRecordTypeIcon(formData.recordType)}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Record Health Data</h2>
      </div>
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="recordType" className="block text-sm font-medium text-gray-700 mb-1">
            Type of Reading
          </label>
          <div className="relative">
            <select 
              id="recordType"
              name="recordType"
              className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              value={formData.recordType}
              onChange={handleChange}
            >
              <option value="bloodPressure">Blood Pressure</option>
              <option value="bloodGlucose">Blood Glucose</option>
              <option value="weight">Weight</option>
              <option value="heartRate">Heart Rate</option>
              <option value="temperature">Body Temperature</option>
              <option value="oxygenSaturation">Oxygen Saturation</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
              {getValueLabel(formData.recordType)}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="number"
                id="value"
                name="value"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 py-3 sm:text-sm border-gray-300 rounded-md"
                value={formData.value}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              Unit
            </label>
            <input
              type="text"
              id="unit"
              name="unit"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-3 py-3 sm:text-sm border-gray-300 rounded-md bg-gray-50"
              value={formData.unit}
              onChange={handleChange}
              readOnly
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className="focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-3 sm:text-sm border-gray-300 rounded-md"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Add any additional information here..."
          />
        </div>
        
        <div className="pt-2">
          <button 
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span>Save Record</span>
            )}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error.message}
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Regular health monitoring helps identify trends and changes in your condition. Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthDataForm;