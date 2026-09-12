import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Utensils, X, ChevronRight, Sparkles } from 'lucide-react';
import { CuisineType } from '../types';
import { CUISINES_LIST } from '../data/mockData';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCuisine: CuisineType;
  setSelectedCuisine: (c: CuisineType) => void;
  selectedLocation: string;
  setSelectedLocation: (l: string) => void;
  onSearchSubmit?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCuisine,
  setSelectedCuisine,
  selectedLocation,
  setSelectedLocation,
  onSearchSubmit,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Quick popular search phrases
  const popularKeywords = [
    'Truffle Risotto',
    'Wood-Fired Pizza',
    'Rooftop Terrace',
    'Omakase',
    'Oysters',
    'Saffron Chicken',
  ];

  // Close suggestions if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectKeyword = (kw: string) => {
    setSearchQuery(kw);
    setShowSuggestions(false);
    if (onSearchSubmit) onSearchSubmit();
  };

  return (
    <div
      ref={containerRef}
      id="hero-search-container"
      className="relative max-w-5xl mx-auto px-4 -mt-6 sm:-mt-8 z-20"
    >
      <div className="bg-[#FBF8F0] p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#DDD6C7] shadow-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowSuggestions(false);
            if (onSearchSubmit) onSearchSubmit();
          }}
          className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
        >
          {/* 1. Main Search Text Input (5 cols) */}
          <div className="md:col-span-5 relative flex items-center px-3 py-2.5 bg-white/80 rounded-xl border border-[#DDD6C7] focus-within:border-[#596B27] focus-within:ring-1 focus-within:ring-[#596B27] transition-all">
            <Search className="w-5 h-5 text-[#596B27] shrink-0 mr-3" />
            <input
              id="hero-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search restaurants, dishes or cuisines..."
              className="w-full bg-transparent text-sm sm:text-base text-[#18202B] placeholder-[#68675F] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-[#68675F] hover:text-[#18202B]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 2. Cuisine Selector (3 cols) */}
          <div className="md:col-span-3 relative flex items-center px-3 py-2.5 bg-white/80 rounded-xl border border-[#DDD6C7] focus-within:border-[#596B27] transition-all">
            <Utensils className="w-4 h-4 text-[#C95718] shrink-0 mr-2.5" />
            <div className="w-full">
              <label htmlFor="search-cuisine-select" className="block text-[10px] uppercase font-bold text-[#68675F] tracking-wider">
                Cuisine
              </label>
              <select
                id="search-cuisine-select"
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value as CuisineType)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#18202B] focus:outline-none cursor-pointer"
              >
                {CUISINES_LIST.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Location Selector (2 cols) */}
          <div className="md:col-span-2 relative flex items-center px-3 py-2.5 bg-white/80 rounded-xl border border-[#DDD6C7] focus-within:border-[#596B27] transition-all">
            <MapPin className="w-4 h-4 text-[#596B27] shrink-0 mr-2" />
            <div className="w-full overflow-hidden">
              <label htmlFor="search-location-select" className="block text-[10px] uppercase font-bold text-[#68675F] tracking-wider truncate">
                Area
              </label>
              <select
                id="search-location-select"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#18202B] focus:outline-none cursor-pointer truncate"
              >
                <option value="All Areas">All Areas</option>
                <option value="SoHo">SoHo</option>
                <option value="West Village">West Village</option>
                <option value="Nolita">Nolita</option>
                <option value="Midtown">Midtown</option>
                <option value="Tribeca">Tribeca</option>
                <option value="Brooklyn">Brooklyn</option>
              </select>
            </div>
          </div>

          {/* 4. Search Submit Button (2 cols) */}
          <div className="md:col-span-2">
            <button
              id="hero-search-submit-btn"
              type="submit"
              className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#596B27] hover:bg-[#48571f] text-[#F7F1E5] text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Find Table</span>
            </button>
          </div>
        </form>

        {/* Quick Suggestion Dropdown */}
        {showSuggestions && (
          <div className="mt-3 pt-3 border-t border-[#DDD6C7]/60 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#68675F] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C95718]" />
              Trending Diners:
            </span>
            {popularKeywords.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => handleSelectKeyword(kw)}
                className="px-2.5 py-1 rounded-full bg-[#EDE5D5] hover:bg-[#DDD6C7] text-[#102038] font-medium transition-colors flex items-center gap-1"
              >
                <span>{kw}</span>
                <ChevronRight className="w-2.5 h-2.5 text-[#68675F]" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
