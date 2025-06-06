import Image from "next/image";

const FeatureCards = () => {
  return (
    <div className="relative border-t border-gray-900 bg-white bg-opacity-90">
      <div className="mt-12 mb-10 sm:mt-16 max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* Symptom Checker Card */}
          <div className="flex-1 p-6 sm:p-8 border border-gray-800 rounded-[2rem] relative overflow-hidden">
            <div className="flex flex-col h-full max-w-[90%] sm:max-w-[65%]">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Symptom Checker</h2>
              <p className="text-black text-xs sm:text-sm mb-4 sm:mb-6">
                Identify potential medical conditions based on your symptoms.
              </p>
              <div className="mt-auto">
                <button className="bg-[#FF7A7A] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-md font-bold">
                  What&apos;s Wrong?
                </button>
              </div>
            </div>
            <div className="absolute right-0 sm:right-4 top-1/2 transform -translate-y-1/2">
              <Image
                src="/images/back.png" 
                alt="Person holding their neck in pain"
                width={140}
                height={140}
                className="object-contain w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]"
              />
            </div>
          </div>

          {/* First Aid Guide Card */}
          <div className="flex-1 p-6 sm:p-8 border border-gray-800 rounded-[2rem] relative overflow-hidden">
            <div className="flex flex-col h-full max-w-[90%] sm:max-w-[65%]">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">First Aid Guide</h2>
              <p className="text-black text-xs sm:text-sm mb-4 sm:mb-6">
                Provide step-by-step instructions for various medical emergencies.
              </p>
              <div className="mt-auto">
                <button className="bg-[#FF7A7A] text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-md font-bold">
                  Get First Aid Help
                </button>
              </div>
            </div>
            <div className="absolute right-0 sm:right-4 top-1/2 transform -translate-y-1/2">
              <Image
                src="/images/care.png"
                alt="People with first aid kit"
                width={140}
                height={140}
                className="object-contain w-[70px] h-[70px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;