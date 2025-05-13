"use client";
import React, { useState, useEffect } from 'react';
import { FiSearch, FiAlertTriangle, FiHeart, FiX, FiPhone, FiClock, FiInfo } from 'react-icons/fi';

interface FirstAidItem {
  id: number;
  title: string;
  description: string;
  steps: string[];
  emergency: boolean;
  icon: string;
}

const FirstAidQuickSupport: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<FirstAidItem | null>(null);
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userClearedSelection, setUserClearedSelection] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Sample first aid data with icons
  const firstAidData: FirstAidItem[] = [
    {
      id: 1,
      title: 'Choking',
      description: 'Help someone who is choking and cannot breathe',
      steps: [
        'Stand behind the person and wrap your arms around their waist',
        'Make a fist with one hand and place it slightly above the navel',
        'Grasp your fist with the other hand and perform quick upward thrusts',
        'Continue until the object is expelled or the person becomes unconscious'
      ],
      emergency: true,
      icon: '🚨'
    },
    {
      id: 2,
      title: 'CPR',
      description: 'Cardiopulmonary resuscitation for adults',
      steps: [
        'Place the heel of your hand on the center of the chest',
        'Place your other hand on top and interlock fingers',
        'Press down hard and fast (100-120 compressions per minute)',
        'After 30 compressions, give 2 rescue breaths if trained',
        'Continue until help arrives or the person starts breathing'
      ],
      emergency: true,
      icon: '💓'
    },
    {
      id: 3,
      title: 'Burns',
      description: 'First aid for minor burns',
      steps: [
        'Cool the burn under cool (not cold) running water for 10-15 minutes',
        'Remove jewelry or tight clothing near the burn',
        'Apply a sterile non-stick dressing',
        'Do not apply butter, oil or ice',
        'Take pain relievers if needed'
      ],
      emergency: false,
      icon: '🔥'
    },
    {
      id: 4,
      title: 'Bleeding',
      description: 'Controlling severe bleeding',
      steps: [
        'Apply direct pressure to the wound with a clean cloth',
        'Elevate the injured area above heart level if possible',
        'Add more layers if blood soaks through',
        'Apply a pressure bandage once bleeding slows',
        'Call for emergency help if bleeding is severe'
      ],
      emergency: true,
      icon: '🩸'
    },
    {
      id: 5,
      title: 'Sprains',
      description: 'Treating joint sprains',
      steps: [
        'Rest the injured area',
        'Apply ice wrapped in a cloth for 15-20 minutes every 2-3 hours',
        'Compress with an elastic bandage (not too tight)',
        'Elevate the injured limb',
        'Avoid heat, alcohol, and massaging in first 48 hours'
      ],
      emergency: false,
      icon: '🦵'
    },
    {
      id: 6,
      title: 'Allergic Reaction',
      description: 'Responding to severe allergic reactions',
      steps: [
        'Look for signs like difficulty breathing, swelling, or hives',
        'Help administer epinephrine auto-injector if available',
        'Have person lie on their back and elevate legs',
        'Loosen tight clothing and cover with blanket',
        'Monitor breathing and be prepared to perform CPR'
      ],
      emergency: true,
      icon: '⚠️'
    }
  ];

  const filteredItems = firstAidData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmergency = !showEmergencyOnly || item.emergency;
    return matchesSearch && matchesEmergency;
  });

  const handleEmergencyCall = () => {
    setShowEmergencyModal(true);
  };

  const closeModal = () => {
    setShowEmergencyModal(false);
  };

  // Modify the auto-select effect to consider user choice
  useEffect(() => {
    if (isMobile && filteredItems.length > 0 && !selectedItem && !userClearedSelection) {
      setSelectedItem(filteredItems[0]);
    }
  }, [filteredItems, isMobile, selectedItem, userClearedSelection]);

  return (
    <div className="first-aid-container bg-white rounded-lg shadow-xl overflow-hidden max-w-6xl mx-auto my-4 md:my-8">
      {/* Header */}
      <div className="bg-[#FFB5B5] text-white p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex items-center mb-3 md:mb-0">
          <div className="bg-white text-[#FC7A7A] rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <FiHeart className="text-xl" />
          </div>
          <h1 className="text-xl md:text-2xl text-black">First Aid Quick Support</h1>
        </div>
        <button 
          onClick={handleEmergencyCall}
          className="bg-white text-[#FC7A7A] px-4 py-2 rounded-lg font-semibold flex items-center hover:bg-[#ece6e6] transition shadow-md w-full md:w-auto justify-center"
        >
          <FiAlertTriangle className="mr-2" /> Emergency Help
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="p-4 md:p-6 border-b bg-gray-50">
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search first aid topics (e.g., CPR, burns)..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setUserClearedSelection(false); 
            }}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showEmergencyOnly}
              onChange={() => {
                setShowEmergencyOnly(!showEmergencyOnly);
                setUserClearedSelection(false); // Reset when filter changes
              }}
              className="rounded h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300"
            />
            <span className="text-gray-700 font-medium">Show emergency procedures only</span>
          </label>
          
          <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
            {filteredItems.length} {filteredItems.length === 1 ? 'procedure' : 'procedures'} found
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex flex-col lg:flex-row">
        {/* List of Procedures - Hidden on mobile when item is selected */}
        {(!isMobile || !selectedItem) && (
          <div className={`w-full lg:w-1/3 border-r overflow-y-auto ${isMobile ? 'max-h-64' : 'max-h-[32rem]'}`}>
            {filteredItems.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <FiSearch className="mx-auto text-3xl mb-3 text-gray-300" />
                <p>No matching first aid procedures found</p>
                <button 
                  onClick={() => { setSearchTerm(''); setShowEmergencyOnly(false); }}
                  className="mt-2 text-red-600 hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <ul>
                {filteredItems.map((item) => (
                  <li
                    key={item.id}
                    className={`p-4 border-b cursor-pointer transition flex items-start ${selectedItem?.id === item.id ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                    onClick={() => {
                      setSelectedItem(item);
                      if (isMobile) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold flex items-center">
                        {item.emergency && <FiAlertTriangle className="text-red-500 mr-2" />}
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    {selectedItem?.id === item.id && (
                      <div className="w-2 h-8 bg-red-500 rounded-full ml-3"></div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        
        {/* Procedure Details */}
        <div className={`w-full lg:w-2/3 p-4 md:p-6 overflow-y-auto ${isMobile ? 'min-h-[50vh]' : 'max-h-[32rem]'}`}>
          {selectedItem ? (
            <div>
              {isMobile && (
                <button 
                  onClick={() => {
                    setSelectedItem(null);
                    setUserClearedSelection(true); // Set this flag when user clicks "Back to list"
                  }}
                  className="mb-4 flex items-center text-red-600 hover:underline"
                >
                  <FiX className="mr-1" /> Back to list
                </button>
              )}
              
              <div className="flex items-start mb-4">
                <span className="text-4xl mr-4">{selectedItem.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    {selectedItem.emergency && <FiAlertTriangle className="text-red-500 mr-2" />}
                    {selectedItem.title}
                  </h2>
                  <p className="text-gray-700 mt-1">{selectedItem.description}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold mb-3 text-lg flex items-center">
                  <FiInfo className="text-red-500 mr-2" /> Steps to Follow:
                </h3>
                <ol className="space-y-3">
                  {selectedItem.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-800">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              
              {selectedItem.emergency && (
                <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                  <div className="flex items-start">
                    <FiAlertTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0 text-xl" />
                    <div>
                      <h4 className="font-semibold text-[#FC7A7A] text-lg">Emergency Alert</h4>
                      <p className="text-red-600">
                        This is a life-threatening emergency. Perform first aid immediately while someone calls for emergency medical services.
                      </p>
                      <button 
                        onClick={handleEmergencyCall}
                        className="mt-3 bg-[#d15c5c] text-white px-4 py-2 rounded-lg font-medium flex items-center hover:bg-[#d15c5c] transition"
                      >
                        <FiPhone className="mr-2" /> Call Emergency Services Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10 md:mt-20">
              <FiHeart className="mx-auto text-5xl text-red-200 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">First Aid Instructions</h3>
              <p className="max-w-md mx-auto">
                {isMobile ? 'Select a first aid procedure from the list above' : 'Select a first aid procedure from the list to view detailed instructions'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 border-t">
        <p>For informational purposes only. Always seek professional medical help in emergencies.</p>
      </div>
      
      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in">
            <div className="bg-[#d99191] text-white p-4 flex justify-between items-center">
              <h2 className="text-xl  flex items-center text-black">
                <FiAlertTriangle className="mr-2" /> Emergency Assistance
              </h2>
              <button onClick={closeModal} className="text-white hover:text-red-200">
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start mb-6">
                <div className="bg-red-100 text-[#FC7A7A] rounded-full p-3 mr-4">
                  <FiPhone className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Emergency Services</h3>
                  <p className="text-gray-600">
                    You are about to call your local emergency number. Please confirm to proceed.
                  </p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FiInfo className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Important:</strong> Stay calm and provide clear information about the emergency situation and your location.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    alert('Calling emergency services at 913...');
                    closeModal();
                  }}
                  className="w-full bg-[#e47f7f] text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center hover:bg-[#d66666] transition"
                >
                  <FiPhone className="mr-2 font-poppins font-bold" /> Call Now (913)
                </button>
                
                <button
                  onClick={closeModal}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 text-center text-xs text-gray-500 border-t">
              <p>Emergency numbers vary by location. 193 is used in Ghana.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstAidQuickSupport;