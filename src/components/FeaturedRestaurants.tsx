import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Clock,
  Heart,
  Navigation,
  Utensils,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Restaurant } from '../types';

interface FeaturedRestaurantsProps {
  restaurants: Restaurant[];
  savedIds: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onQuickReserve: (restaurant: Restaurant, e: React.MouseEvent) => void;
}

export const FeaturedRestaurants: React.FC<FeaturedRestaurantsProps> = ({
  restaurants,
  savedIds,
  onToggleFavorite,
  onSelectRestaurant,
  onQuickReserve,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'topRated' | 'openNow' | 'delivery'>('all');

  const filtered = restaurants.filter((r) => {
    if (filterMode === 'topRated') return r.rating >= 4.9;
    if (filterMode === 'openNow') return r.isOpen;
    if (filterMode === 'delivery') return r.hasDelivery;
    return true;
  });

  return (
    <section id="featured-restaurants-section" className="py-14 sm:py-20 bg-[#F7F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title & Quick Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#596B27]">
              Editor's Choice
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102038] mt-1">
              Restaurants Worth Discovering
            </h2>
            <p className="text-sm sm:text-base text-[#68675F] max-w-xl mt-2">
              Distinguished establishments where meticulous craft, warm hospitality, and unforgettable flavors converge.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EDE5D5]/70 rounded-2xl border border-[#DDD6C7] self-start md:self-auto overflow-x-auto max-w-full">
            {[
              { id: 'all', label: 'All Places' },
              { id: 'topRated', label: '★ 4.9+ Rated' },
              { id: 'openNow', label: 'Open Now' },
              { id: 'delivery', label: 'Fast Delivery' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterMode(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filterMode === tab.id
                    ? 'bg-[#102038] text-white shadow-xs'
                    : 'text-[#18202B] hover:text-[#102038] hover:bg-[#EDE5D5]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((restaurant) => {
            const isSaved = savedIds.includes(restaurant.id);

            return (
              <div
                key={restaurant.id}
                id={`restaurant-card-${restaurant.id}`}
                onClick={() => onSelectRestaurant(restaurant)}
                className="group relative bg-[#FBF8F0] rounded-3xl overflow-hidden border border-[#DDD6C7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
              >
                {/* Image Container with Badges */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-[#EDE5D5]">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />

                  {/* Top Badges: Cuisine & Favorite Heart */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-[#102038]/80 backdrop-blur-md text-white text-xs font-semibold border border-white/10">
                      {restaurant.cuisine}
                    </span>

                    <button
                      id={`fav-btn-${restaurant.id}`}
                      onClick={(e) => onToggleFavorite(restaurant.id, e)}
                      aria-label="Save restaurant to favorites"
                      className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#102038] flex items-center justify-center transition-transform hover:scale-110 shadow-md focus:outline-none"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isSaved ? 'fill-[#C95718] text-[#C95718]' : 'text-[#102038]'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Bottom Badges on Image: Status & Distance */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-white z-10">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#102038]/80 backdrop-blur-md text-[11px] font-medium border border-white/10">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          restaurant.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                        }`}
                      />
                      <span>{restaurant.isOpen ? 'Open Now' : 'Closed'}</span>
                      <span className="text-white/40">•</span>
                      <span>{restaurant.distance}</span>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-[#102038]/80 backdrop-blur-md text-[11px] font-bold text-[#EDE5D5] border border-white/10">
                      {restaurant.priceLevel}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Rating & Review count */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#C95718]">
                        <Star className="w-4 h-4 fill-[#C95718]" />
                        <span className="text-xs font-bold text-[#102038]">
                          {restaurant.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-[#68675F]">
                          ({restaurant.reviewCount} reviews)
                        </span>
                      </div>

                      <span className="text-xs text-[#68675F] font-medium">
                        {restaurant.priceRangeStr}
                      </span>
                    </div>

                    {/* Restaurant Name & Tagline */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#102038] mt-1.5 group-hover:text-[#596B27] transition-colors leading-tight">
                      {restaurant.name}
                    </h3>

                    <p className="text-xs text-[#68675F] line-clamp-2 mt-1 leading-relaxed">
                      {restaurant.tagline}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-[#68675F] mt-2.5">
                      <MapPin className="w-3.5 h-3.5 text-[#596B27] shrink-0" />
                      <span className="truncate">{restaurant.address}</span>
                    </div>
                  </div>

                  {/* Highlights / Features Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {restaurant.features.slice(0, 2).map((feat) => (
                      <span
                        key={feat}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#EDE5D5] text-[#18202B] font-medium"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Actions: View details & Reserve */}
                  <div className="pt-3 border-t border-[#DDD6C7] flex items-center justify-between gap-3">
                    <div className="text-xs">
                      <span className="text-[10px] uppercase font-bold text-[#68675F] block">Chef</span>
                      <span className="font-semibold text-[#102038]">{restaurant.chefName}</span>
                    </div>

                    <button
                      id={`card-reserve-${restaurant.id}`}
                      onClick={(e) => onQuickReserve(restaurant, e)}
                      className="px-4 py-2 rounded-xl bg-[#596B27] hover:bg-[#48571f] text-white text-xs font-bold transition-all shadow-xs hover:shadow-sm"
                    >
                      Reserve Table
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
