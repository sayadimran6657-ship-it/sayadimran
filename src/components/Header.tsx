import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Utensils,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  ordersCount: number;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  onOpenSearch: () => void;
  onOpenReservation: () => void;
}

export const CITIES = [
  'New York, USA',
  'Paris, France',
  'London, UK',
  'Tokyo, Japan',
  'San Francisco, USA',
  'Rome, Italy',
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  ordersCount,
  selectedLocation,
  setSelectedLocation,
  onOpenSearch,
  onOpenReservation,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="dinenest-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F1E5]/95 backdrop-blur-md shadow-xs border-b border-[#DDD6C7]'
            : 'bg-[#F7F1E5] border-b border-[#DDD6C7]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Original DineNest Logo & Brand */}
            <div className="flex items-center gap-6">
              <button
                id="header-logo-button"
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-3 text-left group focus:outline-none"
              >
                {/* Logo Mark: Elegant Nested Cloche & Sprout in Olive & Burnt Orange */}
                <div className="w-10 h-10 rounded-xl bg-[#102038] flex items-center justify-center text-[#F7F1E5] shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Cloche dome */}
                    <path
                      d="M6 21C6 14.5 10.5 9 16 9C21.5 9 26 14.5 26 21H6Z"
                      fill="#F7F1E5"
                      fillOpacity="0.15"
                      stroke="#F7F1E5"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    {/* Cloche handle */}
                    <path
                      d="M16 9V6M14 6H18"
                      stroke="#C95718"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Nest curve line */}
                    <path
                      d="M4 23.5C9 25 23 25 28 23.5"
                      stroke="#596B27"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    {/* Steam / Aroma Leaf */}
                    <path
                      d="M16 13C16 13 18 15 16 17C14 15 16 13 16 13Z"
                      fill="#C95718"
                    />
                  </svg>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold tracking-tight text-[#102038] block leading-none">
                    DineNest
                  </span>
                  <span className="text-[10px] tracking-widest text-[#596B27] font-semibold uppercase block mt-1">
                    Discover • Dine • Enjoy
                  </span>
                </div>
              </button>

              {/* Location Selector Dropdown */}
              <div className="hidden lg:block relative">
                <button
                  id="header-location-selector"
                  onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EDE5D5]/80 hover:bg-[#EDE5D5] text-xs font-medium text-[#102038] border border-[#DDD6C7] transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#C95718]" />
                  <span>{selectedLocation}</span>
                  <ChevronDown className="w-3 h-3 text-[#68675F]" />
                </button>

                {locationDropdownOpen && (
                  <div
                    id="location-dropdown-menu"
                    className="absolute top-full left-0 mt-2 w-52 bg-[#FBF8F0] rounded-xl shadow-lg border border-[#DDD6C7] py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#68675F] border-b border-[#DDD6C7]/50">
                      Select Dining City
                    </div>
                    {CITIES.map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedLocation(city);
                          setLocationDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#EDE5D5]/60 transition-colors ${
                          selectedLocation === city
                            ? 'font-semibold text-[#596B27] bg-[#EDE5D5]/40'
                            : 'text-[#18202B]'
                        }`}
                      >
                        <span>{city}</span>
                        {selectedLocation === city && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#596B27]"></span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'explore', label: 'Explore' },
                { id: 'restaurants', label: 'Restaurants' },
                { id: 'experiences', label: 'Experiences' },
                { id: 'offers', label: 'Offers' },
                { id: 'articles', label: 'Articles' },
              ].map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id as ActiveTab)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-[#102038] font-bold bg-[#EDE5D5]/70'
                        : 'text-[#18202B]/80 hover:text-[#102038] hover:bg-[#EDE5D5]/40'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search button */}
              <button
                id="header-search-btn"
                onClick={onOpenSearch}
                aria-label="Search restaurants and dishes"
                className="p-2.5 rounded-full text-[#18202B] hover:bg-[#EDE5D5] transition-colors focus:outline-none"
              >
                <Search className="w-4 h-4 text-[#102038]" />
              </button>

              {/* Saved / Favorites */}
              <button
                id="header-saved-btn"
                onClick={() => handleNavClick('saved')}
                aria-label="View saved restaurants"
                className="relative p-2.5 rounded-full text-[#18202B] hover:bg-[#EDE5D5] transition-colors focus:outline-none"
              >
                <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-[#C95718] text-[#C95718]' : 'text-[#102038]'}`} />
                {savedCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C95718] text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {savedCount}
                  </span>
                )}
              </button>

              {/* Orders Dashboard */}
              <button
                id="header-orders-btn"
                onClick={() => handleNavClick('orders')}
                aria-label="View current orders"
                className="relative p-2.5 rounded-full text-[#18202B] hover:bg-[#EDE5D5] transition-colors focus:outline-none"
              >
                <ShoppingBag className="w-4 h-4 text-[#102038]" />
                {ordersCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#596B27] text-white text-[10px] font-bold flex items-center justify-center leading-none animate-pulse">
                    {ordersCount}
                  </span>
                )}
              </button>

              {/* Reserve quick button */}
              <button
                id="header-reserve-cta"
                onClick={onOpenReservation}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#596B27] hover:bg-[#48571f] text-[#F7F1E5] text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-sm"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </button>

              {/* Account / Profile Button */}
              <button
                id="header-account-btn"
                onClick={() => handleNavClick('account')}
                aria-label="Manage Account"
                className={`p-1.5 rounded-full border transition-all ${
                  activeTab === 'account'
                    ? 'border-[#596B27] bg-[#EDE5D5]'
                    : 'border-[#DDD6C7] hover:border-[#102038]'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-[#102038] text-[#F7F1E5] flex items-center justify-center text-xs font-semibold">
                  SI
                </div>
              </button>

              {/* Mobile Hamburger toggle */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="md:hidden p-2 rounded-lg text-[#102038] hover:bg-[#EDE5D5] focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-drawer"
            className="md:hidden border-b border-[#DDD6C7] bg-[#F7F1E5] px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200"
          >
            {/* Mobile Location Selector */}
            <div className="p-3 bg-[#EDE5D5]/60 rounded-xl border border-[#DDD6C7] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C95718]" />
                <span className="text-xs font-medium text-[#102038]">{selectedLocation}</span>
              </div>
              <select
                aria-label="Select location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="text-xs bg-[#FBF8F0] border border-[#DDD6C7] rounded-md px-2 py-1 text-[#102038]"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Nav links */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'explore', label: 'Explore All' },
                { id: 'restaurants', label: 'Restaurants' },
                { id: 'experiences', label: 'Experiences' },
                { id: 'offers', label: 'Special Offers' },
                { id: 'articles', label: 'Food Stories' },
                { id: 'orders', label: 'My Orders' },
                { id: 'saved', label: 'Saved Favorites' },
                { id: 'account', label: 'Account & VIP' },
                { id: 'contact', label: 'Contact Us' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id as ActiveTab)}
                  className={`text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#102038] text-white'
                      : 'bg-[#EDE5D5]/50 text-[#18202B] hover:bg-[#EDE5D5]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 rounded-xl bg-[#596B27] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
            >
              <Utensils className="w-4 h-4" />
              <span>Reserve a Table Now</span>
            </button>
          </div>
        )}
      </header>
    </>
  );
};
