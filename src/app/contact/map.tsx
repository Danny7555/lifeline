import React from 'react';

const Map: React.FC = () => {
  const location = {
    lat: 5.6500,  // University of Ghana coordinates
    lng: -0.1962,
    zoom: 15
  };
  
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.lat},${location.lng}&zoom=${location.zoom}`;
  
  return (
    <div className="w-full h-64 relative border-t border-gray-200">
      <iframe
        src={mapUrl}
        className="w-full h-full"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Map;