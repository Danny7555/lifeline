import { User, ChevronDown } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="pt-16 lg:pt-0 max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="rounded-full bg-black w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
              <User className="text-white w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-black">LIFELINER</h1>
              <p className="text-gray-600">Nowhere, Bahamas</p>
            </div>
          </div>

          {/* Profile Form */}
          <form className="space-y-6 sm:space-y-8">
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Name Field */}
              <div>
                <label className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Name</label>
                <input
                  type="text"
                  placeholder="e.g, Surname, Firstname"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                />
              </div>

              {/* Age Field */}
              <div>
                <label className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Age</label>
                <div className="relative">
                  <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 appearance-none bg-white text-sm sm:text-base">
                    <option value="">Select Age</option>
                    <option value="18-25">18-25</option>
                    <option value="26-35">26-35</option>
                    <option value="36-45">36-45</option>
                    <option value="46-55">46-55</option>
                    <option value="56-65">56-65</option>
                    <option value="65+">65+</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Gender Field */}
              <div>
                <label className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Gender</label>
                <div className="relative">
                  <select className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 appearance-none bg-white text-sm sm:text-base">
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Phone Number Field */}
              <div>
                <label className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g, (+233) 020 343 787"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Location Field */}
              <div>
                <label className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">Location</label>
                <input
                  type="text"
                  placeholder="e.g, Nowhere, Bahamas"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                />
              </div>

              {/* Medical Condition Field */}
              <div>
                <label className="block text-base sm:text-lg font-medium text-black mb-2 sm:mb-3">
                  Medical Condition
                </label>
                <input
                  type="text"
                  placeholder="e.g, Diabetes"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-[#F5A5A5] focus:outline-none text-gray-700 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-6 sm:pt-8">
              <button
                type="submit"
                className="bg-[#F5A5A5] text-black px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium hover:bg-[#F08080] transition-colors w-full sm:w-auto"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
