"use client"

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, ChevronDown } from "lucide-react";
import { searchLaptops } from "@/mock_data/data";

type ComparisonButtonProps = {
  currentLaptopId: string;
};

export default function ComparisonButton({ currentLaptopId }: ComparisonButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedLaptops, setSelectedLaptops] = useState<string[]>([currentLaptopId]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Sticky positioning based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        // Stay in viewport
        buttonRef.current.style.top = `${Math.min(
          Math.max(100, scrollY - 100),
          scrollY + viewportHeight - 150
        )}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize position
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search function
  useEffect(() => {
    if (searchTerm.length > 1) {
      const results = searchLaptops(searchTerm);
      // Filter out already selected laptops and limit to 5 results
      const filteredResults = results
        .filter(laptop => !selectedLaptops.includes(laptop.id))
        .slice(0, 5);
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, selectedLaptops]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setSearchTerm("");
    setSearchResults([]);
  };

  const selectLaptop = (laptopId: string) => {
    if (selectedLaptops.length < 3 && !selectedLaptops.includes(laptopId)) {
      setSelectedLaptops([...selectedLaptops, laptopId]);
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  const removeLaptop = (laptopId: string) => {
    // Don't allow removing current laptop
    if (laptopId !== currentLaptopId) {
      setSelectedLaptops(selectedLaptops.filter(id => id !== laptopId));
    }
  };

  const compareSelected = () => {
    if (selectedLaptops.length > 1) {
      // Create URL for comparison page
      const compareUrl = `/compare/${selectedLaptops.join("-vs-")}`;
      router.push(compareUrl);
    }
  };

  return (
    <>
      {/* Floating compare button */}
      <div 
        ref={buttonRef}
        className={`fixed right-8 z-50 transition-all duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
        style={{ top: '100px' }}
      >
        <button
          onClick={toggleOpen}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
          aria-label="Compare laptops"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Compare modal */}
      {isOpen && (
        <div 
          ref={modalRef}
          className="fixed right-8 z-50 bg-white rounded-lg shadow-xl p-4 w-80 transition-all duration-300"
          style={{ top: '100px' }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Compare Laptops</h3>
            <button onClick={toggleOpen} className="text-gray-500 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Select up to 3 laptops to compare:</p>
            
            {/* Selected laptops */}
            <div className="space-y-2 mb-4">
              {selectedLaptops.map((id, index) => {
                const laptop = searchLaptops("").find(l => l.id === id);
                return laptop ? (
                  <div key={id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <span className="text-sm font-medium truncate flex-1">{laptop.name}</span>
                    {id !== currentLaptopId && (
                      <button 
                        onClick={() => removeLaptop(id)} 
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ) : null;
              })}
            </div>

            {/* Search input */}
            {selectedLaptops.length < 3 && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search laptops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}

            {/* Search results */}
            {searchResults.length > 0 && (
              <div className="mt-2 max-h-60 overflow-y-auto border rounded-md">
                {searchResults.map(laptop => (
                  <div
                    key={laptop.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectLaptop(laptop.id)}
                  >
                    <p className="text-sm font-medium">{laptop.name}</p>
                    <p className="text-xs text-gray-500">{laptop.specs.cpu}, {laptop.specs.ram}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={compareSelected}
            disabled={selectedLaptops.length < 2}
            className={`w-full py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
              selectedLaptops.length < 2
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Compare <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
}