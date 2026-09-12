import React from 'react';
import {
  Sparkles,
  Pizza,
  UtensilsCrossed,
  Soup,
  Flame,
  Coffee,
  Salad,
  Fish,
  Cake,
  Wine,
} from 'lucide-react';
import { CuisineType } from '../types';

interface CuisineSectionProps {
  selectedCuisine: CuisineType;
  onSelectCuisine: (c: CuisineType) => void;
}

interface CuisineItem {
  id: CuisineType;
  name: string;
  icon: React.ElementType;
  count: number;
  highlight: string;
}

export const CuisineSection: React.FC<CuisineSectionProps> = ({
  selectedCuisine,
  onSelectCuisine,
}) => {
  const cuisines: CuisineItem[] = [
    { id: 'All', name: 'All Cuisines', icon: Sparkles, count: 48, highlight: 'Full Selection' },
    { id: 'Italian', name: 'Italian', icon: Pizza, count: 14, highlight: 'Stone Hearth & Pasta' },
    { id: 'Asian', name: 'Asian', icon: UtensilsCrossed, count: 12, highlight: 'Bistros & Woks' },
    { id: 'Indian', name: 'Indian', icon: Soup, count: 9, highlight: 'Dum & Saffron' },
    { id: 'Mexican', name: 'Mexican', icon: Flame, count: 8, highlight: 'Oaxacan Coastal' },
    { id: 'Pakistani', name: 'Pakistani', icon: Coffee, count: 6, highlight: 'Aromatic Karahi' },
    { id: 'Mediterranean', name: 'Mediterranean', icon: Salad, count: 11, highlight: 'Wood-Fired & Olive' },
    { id: 'Japanese', name: 'Japanese', icon: Fish, count: 10, highlight: 'Edomae & Robata' },
    { id: 'Desserts', name: 'Desserts', icon: Cake, count: 7, highlight: 'Artisanal Pâtisserie' },
  ];

  return (
    <section id="cuisine-discovery-section" className="py-12 sm:py-16 bg-[#F7F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#596B27]">
              Gastronomic Variety
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#102038] mt-1">
              Find Your Flavor
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#68675F] max-w-sm mt-2 sm:mt-0 font-medium">
            Filter our network of chef-guided kitchens by traditions, heritage seasonings, and culinary styles.
          </p>
        </div>

        {/* Cuisines Grid / Scrollable on mobile */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4">
          {cuisines.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedCuisine === item.id;

            return (
              <button
                key={item.id}
                id={`cuisine-btn-${item.id.toLowerCase()}`}
                onClick={() => onSelectCuisine(item.id)}
                className={`group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-300 focus:outline-none ${
                  isSelected
                    ? 'bg-[#102038] border-[#102038] text-[#F7F1E5] shadow-md -translate-y-1'
                    : 'bg-[#FBF8F0] border-[#DDD6C7] text-[#18202B] hover:border-[#596B27] hover:bg-[#EDE5D5]/50 hover:-translate-y-1 hover:shadow-xs'
                }`}
              >
                {/* Rounded Icon Circle */}
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2.5 transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#C95718] text-white shadow-xs'
                      : 'bg-[#EDE5D5] text-[#596B27] group-hover:bg-[#596B27] group-hover:text-white group-hover:scale-105'
                  }`}
                >
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-6" />
                </div>

                {/* Cuisine Name */}
                <span
                  className={`text-xs sm:text-sm font-semibold text-center leading-tight tracking-tight ${
                    isSelected ? 'text-white' : 'text-[#18202B]'
                  }`}
                >
                  {item.name}
                </span>

                {/* Restaurant count */}
                <span
                  className={`text-[10px] mt-1 ${
                    isSelected ? 'text-[#DDD6C7]' : 'text-[#68675F]'
                  }`}
                >
                  {item.count} places
                </span>

                {/* Small indicator dot when selected */}
                {isSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C95718] mt-1.5 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
