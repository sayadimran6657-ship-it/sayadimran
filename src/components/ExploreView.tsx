import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  Heart,
  Calendar,
  X,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Restaurant, CuisineType } from '../types';
import { CUISINES_LIST } from '../data/mockData';

interface ExploreViewProps {
  restaurants: Restaurant[];
  savedIds: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onQuickReserve: (restaurant: Restaurant, e: React.MouseEvent) => void;
  initialCuisine?: CuisineType;
  initialSearch?: string;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  restaurants,
  savedIds,
  onToggleFavorite,
  onSelectRestaurant,
  onQuickReserve,
  initialCuisine = 'All',
  initialSearch = '',
}) => {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType>(initialCuisine);
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [onlyOpenNow, setOnlyOpenNow] = useState(false);
  const [onlyDelivery, setOnlyDelivery] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'reviews' | 'priceLow'>('recommended');

  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter((r) => {
        // Search text match
        if (search) {
          const q = search.toLowerCase();
          const matchName = r.name.toLowerCase().includes(q);
          const matchCuisine = r.cuisine.toLowerCase().includes(q);
          const matchTagline = r.tagline.toLowerCase().includes(q);
          const matchDish = r.menu.some((m) => m.name.toLowerCase().includes(q));
          if (!matchName && !matchCuisine && !matchTagline && !matchDish) return false;
        }

        // Cuisine
        if (selectedCuisine !== 'All' && r.cuisine !== selectedCuisine) {
          return false;
        }

        // Area
        if (selectedArea !== 'All' && !r.location.toLowerCase().includes(selectedArea.toLowerCase())) {
          return false;
        }

        // Price
        if (selectedPrice !== 'All' && r.priceLevel !== selectedPrice) {
          return false;
        }

        // Open now
        if (onlyOpenNow && !r.isOpen) return false;

        // Delivery
        if (onlyDelivery && !r.hasDelivery) return false;

        // Min rating
        if (minRating > 0 && r.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        if (sortBy === 'priceLow') return a.priceLevel.length - b.priceLevel.length;
        return 0; // recommended
      });
  }, [
    restaurants,
    search,
    selectedCuisine,
    selectedArea,
    selectedPrice,
    onlyOpenNow,
    onlyDelivery,
    minRating,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCuisine('All');
    setSelectedArea('All');
    setSelectedPrice('All');
    setOnlyOpenNow(false);
    setOnlyDelivery(false);
    setMinRating(0);
    setSortBy('recommended');
  };

  return (
    <div id="explore-view" className="py-8 sm:py-12 bg-[#F7F1E5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#596B27]">
            Gastronomy Atlas
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102038]">
            Explore All Restaurants
          </h1>
          <p className="text-sm sm:text-base text-[#68675F]">
            Browse and filter culinary destinations across the city with real-time availability.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#FBF8F0] p-4 sm:p-6 rounded-3xl border border-[#DDD6C7] shadow-sm mb-8 space-y-4">
          {/* Top Search bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-[#596B27] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by restaurant name, signature dish, or cuisine..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-[#DDD6C7] text-sm text-[#102038] placeholder-[#68675F] focus:outline-none focus:ring-2 focus:ring-[#596B27]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#68675F] hover:text-[#102038]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter dropdowns and toggles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {/* Cuisine */}
            <div>
              <label className="block font-bold text-[#68675F] uppercase text-[10px] mb-1">
                Cuisine
              </label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value as CuisineType)}
                className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C7] font-medium text-[#102038]"
              >
                {CUISINES_LIST.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Neighborhood */}
            <div>
              <label className="block font-bold text-[#68675F] uppercase text-[10px] mb-1">
                Area
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C7] font-medium text-[#102038]"
              >
                <option value="All">All Neighborhoods</option>
                <option value="SoHo">SoHo</option>
                <option value="West Village">West Village</option>
                <option value="Nolita">Nolita</option>
                <option value="Midtown">Midtown</option>
                <option value="Tribeca">Tribeca</option>
                <option value="Brooklyn">Brooklyn</option>
              </select>
            </div>

            {/* Price Level */}
            <div>
              <label className="block font-bold text-[#68675F] uppercase text-[10px] mb-1">
                Price
              </label>
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C7] font-medium text-[#102038]"
              >
                <option value="All">Any Price</option>
                <option value="$$">$$ (Moderate)</option>
                <option value="$$$">$$$ (Fine)</option>
                <option value="$$$$">$$$$ (Luxury)</option>
              </select>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block font-bold text-[#68675F] uppercase text-[10px] mb-1">
                Rating
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C7] font-medium text-[#102038]"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={4.8}>4.8+ Stars</option>
                <option value={4.9}>4.9+ Stars</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block font-bold text-[#68675F] uppercase text-[10px] mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C7] font-medium text-[#102038]"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="priceLow">Price: Low to High</option>
              </select>
            </div>

            {/* Quick Reset */}
            <div className="flex items-end">
              <button
                onClick={handleResetFilters}
                className="w-full p-2.5 rounded-xl border border-[#DDD6C7] hover:bg-[#EDE5D5] text-[#102038] font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Quick toggle chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#DDD6C7]/50 text-xs">
            <button
              onClick={() => setOnlyOpenNow(!onlyOpenNow)}
              className={`px-3 py-1.5 rounded-xl border transition-colors ${
                onlyOpenNow
                  ? 'bg-[#596B27] text-white border-[#596B27]'
                  : 'bg-white text-[#18202B] border-[#DDD6C7]'
              }`}
            >
              Open Now Only
            </button>
            <button
              onClick={() => setOnlyDelivery(!onlyDelivery)}
              className={`px-3 py-1.5 rounded-xl border transition-colors ${
                onlyDelivery
                  ? 'bg-[#596B27] text-white border-[#596B27]'
                  : 'bg-white text-[#18202B] border-[#DDD6C7]'
              }`}
            >
              Has Direct Delivery
            </button>
            <span className="text-[#68675F] ml-auto text-xs font-medium">
              Showing {filteredRestaurants.length} restaurants
            </span>
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16 bg-[#FBF8F0] rounded-3xl border border-[#DDD6C7] p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EDE5D5] flex items-center justify-center mx-auto text-[#68675F]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#102038]">
              No Restaurants Match Your Criteria
            </h3>
            <p className="text-sm text-[#68675F] max-w-md mx-auto">
              Try loosening your filters or resetting your search to explore all available venues.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 rounded-xl bg-[#596B27] text-white font-bold text-xs"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredRestaurants.map((restaurant) => {
              const isSaved = savedIds.includes(restaurant.id);

              return (
                <div
                  key={restaurant.id}
                  onClick={() => onSelectRestaurant(restaurant)}
                  className="group bg-[#FBF8F0] rounded-3xl overflow-hidden border border-[#DDD6C7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-[#EDE5D5]">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-[#102038]/80 backdrop-blur-md text-white text-xs font-semibold">
                        {restaurant.cuisine}
                      </span>

                      <button
                        onClick={(e) => onToggleFavorite(restaurant.id, e)}
                        className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#102038] flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isSaved ? 'fill-[#C95718] text-[#C95718]' : 'text-[#102038]'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10">
                      <span className="px-2.5 py-1 rounded-full bg-[#102038]/80 backdrop-blur-md">
                        {restaurant.distance} • {restaurant.isOpen ? 'Open Now' : 'Closed'}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#102038]/80 backdrop-blur-md font-bold text-[#EDE5D5]">
                        {restaurant.priceLevel}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-[#C95718] font-bold">
                          <Star className="w-4 h-4 fill-current" />
                          <span>{restaurant.rating.toFixed(1)}</span>
                          <span className="text-[#68675F]">
                            ({restaurant.reviewCount} reviews)
                          </span>
                        </div>
                        <span className="text-[#68675F]">{restaurant.priceRangeStr}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-[#102038] mt-1.5 group-hover:text-[#596B27] transition-colors leading-tight">
                        {restaurant.name}
                      </h3>

                      <p className="text-xs text-[#68675F] line-clamp-2 mt-1 leading-relaxed">
                        {restaurant.tagline}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-[#68675F] mt-2.5">
                        <MapPin className="w-3.5 h-3.5 text-[#596B27] shrink-0" />
                        <span className="truncate">{restaurant.address}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#DDD6C7] flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#102038]">
                        Chef {restaurant.chefName.split(' ')[0]}
                      </span>

                      <button
                        onClick={(e) => onQuickReserve(restaurant, e)}
                        className="px-4 py-2 rounded-xl bg-[#596B27] hover:bg-[#48571f] text-white text-xs font-bold transition-all shadow-xs"
                      >
                        Reserve Table
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
