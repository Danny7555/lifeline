import React from 'react';
import Image from 'next/image';

export type ContactInfo = {
  name: string;
  phone: string;
};

export type ContactGroup = {
  title: string;
  contacts: ContactInfo[];
};

const ContactCard: React.FC<{
  name: string;
  phone: string;
  isLast: boolean;
}> = ({ name, phone, isLast }) => (
  <div className={`${!isLast ? 'border-b border-gray-200 pb-2 mb-2' : ''}`}>
    <p className="font-medium text-base">{name}: {phone}</p>
  </div>
);

const EmergencySection: React.FC = () => {
  const contactGroups: ContactGroup[] = [
    {
      title: 'Details:',
      contacts: [
        { name: 'Greater Accra Regional Hospital', phone: '0302428460 / 0551727552' },
        { name: 'Korle Bu Teaching Hospital, Accra', phone: '030 273 9510' },
        { name: 'Komfo Anokye Teaching Hospital (KATH), Kumasi', phone: '032 200 1769' },
        { name: 'Koforidua Regional Hospital', phone: '034 202 3011' }
      ]
    },
    {
      title: 'Contacts:',
      contacts: [
        { name: 'Ama Atta Aidoo', phone: '020 567 0800' },
        { name: 'Okomfo Anokye', phone: '025 273 9510' },
        { name: 'Togbe Tsali', phone: '032 200 1769' },
        { name: 'Agorkoli', phone: '034 202 3011' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-800 p-8">
      <h1 className="text-3xl font-extrabold text-center mb-4">EMERGENCY HELP NEEDED?</h1>
      
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-xl">
          <Image
            src="/images/emergency.png" 
            alt="Emergency" 
            className="w-12 h-12"
            width={48}
            height={48}
          />
        </div>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-gray-700 text-2xl font-semibold">Not sure what to do?</p>
        <p className="text-gray-700 text-xl">Reach out to the contacts below</p>
      </div>
      
      <div className="bg-white rounded-2xl p-4 flex items-center gap-4 mb-6 border border-gray-500">
        <Image
          src="/images/ambulance.png"
          alt="Ambulance"
          className="w-8 h-8"
          width={32}
          height={32}
        />
        <span className="font-extrabold text-xl">Call: 112/030 278 7301</span>
      </div>
      
      {contactGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-4 last:mb-0">
          <div className="bg-white rounded-2xl p-4 border border-gray-800">
            <div className="flex gap-6 items-center">
              <div className="flex-shrink-0">
                {groupIndex === 0 ? (
                  <Image
                    src="/images/hospital.png" 
                    alt="Hospital" 
                    className="w-16 h-16"
                    width={50}
                    height={50}
                  />
                ) : (
                  <Image
                    src="/images/doctor.png"
                    alt="Doctor"
                    className="w-16 h-16"
                    width={50}
                    height={50}
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-lg mb-2">{group.title}</h3>
                {group.contacts.map((contact, index) => (
                  <ContactCard
                    key={index}
                    name={contact.name}
                    phone={contact.phone}
                    isLast={index === group.contacts.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmergencySection;