import Image from "next/image"

export default function SupportHelpPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Illustration */}
          <div className="mb-8">
            <Image
              src="/images/nurse.png" 
              alt="Nurse on mobile phone" 
              width={250} 
              height={250}
              className="object-contain"
              priority
            />
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Are you facing any problem or want to give a compliment?
          </h1>

          {/* Subtext */}
          <p className="text-gray-600 max-w-2xl mb-10 text-center">
            We&apos;re here to help! Whether you have a question about our services, need to
            schedule an appointment, or simply want to share your feedback, we&apos;re happy
            to hear from you.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-md mx-auto">
            <button className="flex-1 py-3 px-6 bg-[#FA9D9D] text-black rounded-full font-medium hover:bg-[#FFAEBB] transition-colors">
              Donate?
            </button>
            <button className="flex-1 py-3 px-6 bg-[#FA9D9D] text-black rounded-full font-medium hover:bg-[#FFAEBB] transition-colors">
              Start Live Chat
            </button>
          </div>

          {/* Divider text */}
          <p className="text-gray-500 mb-6">Or you can contact us at</p>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto mb-12">
            <div className="border border-[#FFAEBB] rounded-md p-4 bg-[#FFF5F7] text-center">
              <p className="text-gray-700">Email: support@gmail.com</p>
            </div>
            <div className="border border-[#FFAEBB] rounded-md p-4 bg-[#FFF5F7] text-center">
              <p className="text-gray-700">Phone: 0201346530</p>
            </div>
          </div>

          {/* Bold Message */}
          <div className="mt-4">
            <h2 className="text-xl font-bold uppercase text-gray-800">WE HAVE THE SOLUTION!</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
