"use client";
import { Filter, X } from "lucide-react"
import Image from "next/image"
import { useState, useRef, useEffect, useMemo } from "react"

export default function LifelineHistoryPage() {
  // State for filter dropdown
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredConditions, setFilteredConditions] = useState<Array<{ title: string; icon: string; lastVisited: string }>>([])
  const [filters, setFilters] = useState({
    searchTerm: "",
    date: "",
    sortBy: "newest" // newest, oldest, alphabetical
  })
  const filterRef = useRef<HTMLDivElement | null>(null)
  
  // Use useMemo to prevent recreation on every render
  const medicalConditions = useMemo(() => [
    {
      title: "BURNS",
      icon: "/images/palm.png", 
      lastVisited: "02, May, 2025",
    },
    {
      title: "FRACTURE",
      icon: "/images/leg.png",
      lastVisited: "02, May, 2025",
    },
    {
      title: "CUT",
      icon: "/images/cut.png",
      lastVisited: "02, May, 2025",
    },
    {
      title: "ASTHMA",
      icon: "/images/asthma.png",
      lastVisited: "02, May, 2025",
    },
    {
      title: "COUGH",
      icon: "/images/cough.png",
      lastVisited: "02, May, 2025",
    },
    {
      title: "SNAKE BITE",
      icon: "/images/snake.png",
      lastVisited: "02, May, 2025",
    },
    {
      title: "BLEEDING",
      icon: "/images/bleed.png",
      lastVisited: "02, May, 2025",
    },
    {
      title: "STING",
      icon: "/images/bee.png",
      lastVisited: "02, May, 2025",
    },
    {
      title: "SORE THROAT",
      icon: "/images/nose.png",
      lastVisited: "02, May, 2025",
    },
  ], []); // Empty dependency array means this only runs once

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Filter and sort the medical conditions based on current filters
  useEffect(() => {
    // Only run this effect when filters or medicalConditions change
    const applyFilters = () => {
      let results = [...medicalConditions]
      
      // Apply search filter
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase()
        results = results.filter(condition => 
          condition.title.toLowerCase().includes(term)
        )
      }
      
      // Apply date filter (simplified example)
      if (filters.date) {
        // In a real app, you would parse the dates and filter properly
        results = results.filter(condition => 
          condition.lastVisited.includes(filters.date)
        )
      }
      
      // Apply sorting
      switch (filters.sortBy) {
        case "alphabetical":
          results.sort((a, b) => a.title.localeCompare(b.title))
          break
        case "newest":
          // For demonstration - in a real app, you'd parse dates properly
          results.sort((a, b) => b.lastVisited.localeCompare(a.lastVisited))
          break
        case "oldest":
          results.sort((a, b) => a.lastVisited.localeCompare(b.lastVisited))
          break
      }
      
      return results
    }
    
    // Set filtered results
    setFilteredConditions(applyFilters())
    
  }, [filters, medicalConditions]) // Only depend on filters and medicalConditions

  // Handle filter changes
  const handleFilterChange = (key: 'searchTerm' | 'date' | 'sortBy', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      searchTerm: "",
      date: "",
      sortBy: "newest"
    })
  }

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
      {/* Header with improved spacing and alignment */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">Lifeline History</h1>
        <div className="relative" ref={filterRef}>
          <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors shadow-sm
              ${isFilterOpen ? 'bg-gray-100 text-black border border-gray-300' : 'bg-white border border-gray-700 text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="w-4 h-4" />
            Filters
            {(filters.searchTerm || filters.date || filters.sortBy !== "newest") && (
              <span className="inline-flex items-center justify-center w-5 h-5 ml-1 bg-[#FFAEBB] text-white text-xs rounded-full">
                {[!!filters.searchTerm, !!filters.date, filters.sortBy !== "newest"].filter(Boolean).length}
              </span>
            )}
          </button>
          
          {/* Filter dropdown */}
          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-gray-800">Filter</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-gray-500 hover:text-gray-800 underline"
                  >
                    Clear all
                  </button>
                </div>
                
                {/* Search filter */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Search</label>
                  <input
                    type="text"
                    value={filters.searchTerm}
                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    placeholder="Search conditions..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                {/* Date filter (simplified) */}
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Month/Year</label>
                  <input
                    type="text"
                    value={filters.date}
                    onChange={(e) => handleFilterChange('date', e.target.value)}
                    placeholder="e.g. May, 2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                {/* Sort options */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Sort by</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="alphabetical">Alphabetical</option>
                  </select>
                </div>
                
                {/* Apply button */}
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full mt-4 bg-[#FFAEBB] hover:bg-[#FFD3DB] text-black font-medium py-2 rounded-md transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Show filtered count if filters are applied */}
      {(filters.searchTerm || filters.date || filters.sortBy !== "newest") && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Showing {filteredConditions.length} result{filteredConditions.length !== 1 ? 's' : ''}
          </span>
          <button 
            onClick={clearFilters}
            className="text-xs flex items-center gap-1 text-gray-500 hover:text-black"
          >
            <X size={12} /> Clear filters
          </button>
        </div>
      )}

      {/* Medical Conditions Grid with improved cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Use either filteredConditions or medicalConditions, not both */}
        {(filters.searchTerm || filters.date || filters.sortBy !== "newest") 
          ? (filteredConditions.length > 0 
              ? filteredConditions.map((condition, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-700 rounded-2xl p-6 relative hover:shadow-md transition-shadow duration-300 group"
                >
                  {/* Position the action button in the top right with improved styling */}
                  <div className="absolute top-4 right-4">
                    <button className="w-8 h-8 rounded-full border border-[#df8484] flex items-center justify-center group-hover:bg-[#FFD3DB] transition-colors">
                      <svg width="14" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="#FFAEBB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover:stroke-[#110d0d] transition-colors"
                        />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex flex-col relative pt-8">
                    {/* Icon at top-left styled to extend above and outside container */}
                    <div className="absolute -top-16 -left-4">
                      <Image 
                        src={condition.icon}
                        alt={condition.title}
                        width={80}  
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    
                    {/* Title with left alignment */}
                    <h3 className="text-lg font-bold text-black mb-2">{condition.title}</h3>
                    
                    {/* Last Visited with left alignment */}
                    <p className="text-sm text-gray-500">
                      Last Visited: {condition.lastVisited}
                    </p>
                  </div>
                </div>
              ))
            : null) // Will be handled by empty state below
          : medicalConditions.map((condition, index) => (
            <div
              key={index}
              className="bg-white border border-gray-700 rounded-2xl p-6 relative hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Position the action button in the top right with improved styling */}
              <div className="absolute top-4 right-4">
                <button className="w-8 h-8 rounded-full border border-[#df8484] flex items-center justify-center group-hover:bg-[#FFD3DB] transition-colors">
                  <svg width="14" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="#FFAEBB"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-[#110d0d] transition-colors"
                    />
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-col relative pt-8">
                {/* Icon at top-left styled to extend above and outside container */}
                <div className="absolute -top-8 -left-4">
                  <Image 
                    src={condition.icon}
                    alt={condition.title}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                
                {/* Title with left alignment */}
                <h3 className="text-lg font-bold text-black mb-2">{condition.title}</h3>
                
                {/* Last Visited with left alignment */}
                <p className="text-sm text-gray-500">
                  Last Visited: {condition.lastVisited}
                </p>
              </div>
            </div>
          ))
        }
        
        {/* Empty state when no results match filters */}
        {filteredConditions.length === 0 && (filters.searchTerm || filters.date || filters.sortBy !== "newest") && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No results found</h3>
            <p className="text-gray-500 max-w-md">
              We couldn&apos;t find any medical conditions matching your current filters.
            </p>
            <button 
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-[#FFAEBB] hover:bg-[#FFD3DB] text-black rounded-md transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
