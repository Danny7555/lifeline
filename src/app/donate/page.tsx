'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/landingPage/navBar';
import Footer from '../components/landingPage/footer';

const DonatePage = () => {
  const router = useRouter();
  const [donationAmount, setDonationAmount] = useState<number | ''>('');
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState('one-time');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(type);
    setTimeout(() => setIsCopied(null), 2000);
  };

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount) return;
    
    setShowPaymentDetails(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const presetAmounts = [10, 20, 50, 100, 200];

  const handlePaymentComplete = () => {
    setShowPaymentDetails(false);
    setDonationAmount('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Support Our Mission
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Your donation helps us provide life-saving resources and support to those in need.
            </p>
          </div>
        </div>

        <div className="bg-white bg-opacity-90 border border-gray-800 rounded-[2rem] overflow-hidden p-6 sm:p-8 backdrop-blur-sm">
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
                      className={`px-4 py-3 rounded-full font-bold text-sm sm:text-base border border-gray-800 ${
                        donationAmount === amount
                          ? 'bg-[#FF7A7A] text-white hover:bg-[#ff5e5e]'
                          : 'bg-white text-gray-800 hover:bg-gray-100'
                      } transition-colors`}
                    >
                      ₵{amount}
                    </button>
                  ))}
                </div>
                <div className="mt-6">
                  <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter a custom amount
                  </label>
                  <div className="relative rounded-full overflow-hidden border border-gray-800">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-700">₵</span>
                    </div>
                    <input
                      type="number"
                      name="custom-amount"
                      id="custom-amount"
                      className="block w-full pl-10 pr-4 py-3 text-gray-900 focus:outline-none bg-transparent"
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
                    ? `A donation of ₵${donationAmount} ${selectedFrequency === 'one-time' ? '' : ` ${selectedFrequency}`} can help us ${getImpactText(Number(donationAmount), selectedFrequency)}.`
                    : 'Enter an amount to see your impact.'
                  }
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!donationAmount || isProcessing}
                  className={`w-full py-3 px-6 rounded-full text-white font-bold text-lg transition-colors border border-gray-800 ${
                    !donationAmount || isProcessing
                      ? 'bg-gray-300 cursor-not-allowed border-gray-300'
                      : 'bg-[#FF7A7A] hover:bg-[#ff5e5e] shadow-md hover:shadow-lg'
                  }`}
                >
                  {isProcessing ? 'Processing...' : `Donate ₵${donationAmount || '0'} ${selectedFrequency !== 'one-time' ? `per ${selectedFrequency.replace('ly', '')}` : ''}`.trim()}
                </button>
                <p className="mt-3 text-sm text-gray-500 text-center">
                  Your donation is secure and encrypted with bank-level security.
                </p>
              </div>
            </div>
          </form>
        </div>
      {/* Payment Details */}
        <div className="mt-12">
          {!showPaymentDetails ? (
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Other Payment Methods</h3>
          ) : (
            <>
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Complete Your Donation of ₵{donationAmount}</h3>
              <p className="text-center text-gray-700 mb-8">
                Please use one of the payment methods below to complete your donation of ₵{donationAmount}.
                After payment, you&apos;ll receive a confirmation email with your donation receipt.
              </p>
            </>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Telecel-Cash */}
            <div className="p-6 bg-white bg-opacity-90 border border-gray-800 rounded-[2rem] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-100">
                  <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 .88-.58 1.63-1.39 1.88l-.61.22v2.9h2v1h-3v-3.26c1.5-.8 2.5-2.41 2.5-4.24 0-2.21-1.79-4-4-4z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Telecel-Cash</h4>
              </div>
              <div className="space-y-2 pl-2">
                <div className="flex items-center gap-2">
                  <p className="text-gray-700">+233 20 343 0787</p>
                  <button 
                    onClick={() => copyToClipboard('+233203430787', 'telecel')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {isCopied === 'telecel' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm text-gray-500">Daniella Asiedu</p>
              </div>
            </div>

            {/* MTN-MOMO */}
            <div className="p-6 bg-white bg-opacity-90 border border-gray-800 rounded-[2rem] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-100">
                  <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">MTN Mobile Money</h4>
              </div>
              <div className="space-y-2 pl-2">
                <div className="flex items-center gap-2">
                  <p className="text-gray-700">+233 55 178 4926</p>
                  <button 
                    onClick={() => copyToClipboard('+233551784926', 'mtn')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {isCopied === 'mtn' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm text-gray-500">David Obuobi</p>
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="p-6 bg-white bg-opacity-90 border border-gray-800 rounded-[2rem] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-100">
                  <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0 0l-6 2m6-2v10" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">Bank Transfer (GCB)</h4>
              </div>
              <div className="space-y-2 pl-2">
                <div className="flex items-center gap-2">
                  <p className="text-gray-700">Account: 1331250000242</p>
                  <button 
                    onClick={() => copyToClipboard('1331250000242', 'bank')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {isCopied === 'bank' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm text-gray-500">Lifeline Foundation</p>
              </div>
            </div>

            {/* USDT Wallet */}
            <div className="p-6 bg-white bg-opacity-90 border border-gray-800 rounded-[2rem] relative overflow-hidden md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-100">
                  <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">USDT (TRC20)</h4>
              </div>
              <div className="space-y-2 pl-2">
                <div className="relative">
                  <p className="text-gray-700 break-all pr-10">TCvvhtnFTm6dQcrtq3x3uXabRULzvEkwr1</p>
                  <button 
                    onClick={() => copyToClipboard('TCvvhtnFTm6dQcrtq3x3uXabRULzvEkwr1', 'usdt')}
                    className="absolute top-0 right-0 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    {isCopied === 'usdt' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm text-gray-500">Network: TRC20</p>
              </div>
            </div>
          </div>
          {showPaymentDetails && (
            <div className="mt-8 text-center">
              <button
                onClick={handlePaymentComplete}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full font-medium transition-colors border border-gray-300"
              >
                Change Donation Amount
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
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
