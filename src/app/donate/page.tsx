'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DonatePage = () => {
  const router = useRouter();
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [selectedFrequency, setSelectedFrequency] = useState('one-time');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount) return;
    
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  const presetAmounts = [10, 25, 50, 100, 250];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-[#E8F5E9] mx-auto flex items-center justify-center h-32 w-32 rounded-full mb-8">
            <svg className="h-16 w-16 text-[#4CAF50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Donation!
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Your generous contribution of <span className="font-bold">${donationAmount}</span> will help us continue our mission to provide life-saving resources.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => setIsSuccess(false)}
              className="w-full py-3 px-6 bg-[#FF7A7A] hover:bg-[#ff5e5e] text-white font-bold rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              Make Another Donation
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full py-2.5 px-6 bg-transparent hover:bg-gray-100 text-gray-700 font-medium rounded-full transition-colors border border-gray-300"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Support Our Mission
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your donation helps us provide life-saving resources and support to those in need.
          </p>
        </div>

        <div className="bg-white border border-gray-800 rounded-[2rem] overflow-hidden p-6 sm:p-8">
          <form onSubmit={handleDonation}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Donation Amount</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount)}
                      className={`px-4 py-3 rounded-full font-bold text-sm sm:text-base ${
                        donationAmount === amount
                          ? 'bg-[#FF7A7A] text-white hover:bg-[#ff5e5e]'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      } transition-colors`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter a custom amount
                  </label>
                  <div className="relative rounded-full overflow-hidden border border-gray-300">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      name="custom-amount"
                      id="custom-amount"
                      className="block w-full pl-10 pr-4 py-3 text-gray-900 focus:outline-none"
                      placeholder="0.00"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value ? Number(e.target.value) : '')}
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Donation Frequency</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['one-time', 'monthly', 'quarterly', 'yearly'].map((frequency) => (
                    <div key={frequency} className="relative">
                      <input
                        id={frequency}
                        name="frequency"
                        type="radio"
                        className="absolute opacity-0 w-0 h-0"
                        checked={selectedFrequency === frequency}
                        onChange={() => setSelectedFrequency(frequency)}
                      />
                      <label 
                        htmlFor={frequency} 
                        className={`block w-full text-center py-2 px-4 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                          selectedFrequency === frequency
                            ? 'bg-[#FF7A7A] text-white hover:bg-[#ff5e5e]'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {frequency.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FFF0F0] p-4 sm:p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-[#FF5E5E] mb-2">Your Impact</h3>
                <p className="text-gray-800">
                  {donationAmount 
                    ? `A donation of $${donationAmount} ${selectedFrequency === 'one-time' ? '' : ` ${selectedFrequency}`} can help us ${getImpactText(Number(donationAmount), selectedFrequency)}.`
                    : 'Enter an amount to see your impact.'
                  }
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!donationAmount || isProcessing}
                  className={`w-full py-3 px-6 rounded-full text-white font-bold text-lg transition-colors ${
                    !donationAmount || isProcessing
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-[#FF7A7A] hover:bg-[#ff5e5e] shadow-md hover:shadow-lg'
                  }`}
                >
                  {isProcessing ? 'Processing...' : `Donate $${donationAmount || '0'} ${selectedFrequency !== 'one-time' ? `per ${selectedFrequency.replace('ly', '')}` : ''}`.trim()}
                </button>
                <p className="mt-3 text-sm text-gray-500 text-center">
                  Your donation is secure and encrypted with bank-level security.
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-green-50 p-6 rounded-xl">
          <h3 className="text-lg font-medium text-green-800">Other Ways to Give</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="p-4 bg-white rounded-lg border border-green-100">
              <h4 className="font-medium text-green-700">Bank Transfer</h4>
              <p className="mt-1 text-sm text-green-600">Routing: 123456789 | Account: 987654321</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-green-100">
              <h4 className="font-medium text-green-700">Mail a Check</h4>
              <p className="mt-1 text-sm text-green-600">123 Help St, City, Country 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getImpactText(amount: number, frequency: string): string {
  const monthlyAmount = frequency === 'monthly' ? amount : 
                      frequency === 'quarterly' ? amount / 3 : 
                      frequency === 'yearly' ? amount / 12 : 0;
  
  if (amount >= 1000) return 'provide emergency medical supplies for a rural clinic for a month';
  if (amount >= 500) return 'train 5 community health workers in life-saving techniques';
  if (amount >= 250) return 'stock a first aid station with essential supplies';
  if (amount >= 100) return 'provide 10 emergency first aid kits to families in need';
  if (amount >= 50) return 'help us maintain our 24/7 emergency hotline for a day';
  return 'provide basic first aid supplies for one person';
}

export default DonatePage;
