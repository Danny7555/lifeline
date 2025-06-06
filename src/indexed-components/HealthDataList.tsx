import React from 'react';
import { useHealthData } from '../hooks/useHealthData';

const HealthDataList: React.FC<{ recordType?: string }> = ({ recordType }) => {
  const { records, loading, error, deleteRecord } = useHealthData(recordType);

  if (loading) {
    return <div className="p-4 text-center">Loading your health data...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Error loading data: {error.message}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No health records found. Start by adding some data!
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {recordType ? `${recordType} Records` : 'All Health Records'}
      </h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Date & Time</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-right">Value</th>
              <th className="p-3 text-left">Notes</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id} className="border-t">
                <td className="p-3">{formatDate(record.timestamp)}</td>
                <td className="p-3">{record.recordType}</td>
                <td className="p-3 text-right">
                  {record.value} {record.unit}
                </td>
                <td className="p-3">
                  {record.notes || '—'}
                </td>
                <td className="p-3 text-center">
                  <button 
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this record?')) {
                        deleteRecord(record.id as number);
                      }
                    }}
                    className="p-1 text-red-600 hover:text-red-800"
                    aria-label="Delete record"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthDataList;