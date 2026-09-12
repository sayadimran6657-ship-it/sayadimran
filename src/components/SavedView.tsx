import React, { useState } from 'react';
import { Heart, Star, MapPin, Trash2, Calendar, Plus, Compass } from 'lucide-react';
import { Restaurant, MenuItem, RestaurantCollection } from '../types';

interface SavedViewProps {
  savedRestaurantIds: string[];
  savedDishIds: string[];
  allRestaurants: Restaurant[];
  allDishes: MenuItem[];
  allCollections: RestaurantCollection[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onToggleSaveDish: (id: string, e: React.MouseEvent) => void;
  onSelectRestaurant: (r: Restaurant) => void;
  onQuickReserve: (r: Restaurant, e: React.MouseEvent) => void;
  onAddToCart: (item: MenuItem, e: React.MouseEvent) => void;
  onExploreClick: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedRestaurantIds,
  savedDishIds,
  allRestaurants,
  allDishes,
  allCollections,
  onToggleFavorite,
  onToggleSaveDish,
  onSelectRestaurant,
  onQuickReserve,
  onAddToCart,
  onExploreClick,
}) => {
  const [activeTab, setActiveTab] = useState<'restaurants' | 'dishes'>('restaurants');

  const savedRestaurants = allRestaurants.filter((r) => savedRestaurantIds.includes(r.id));
  const savedDishes = allDishes.filter((d) => savedDishIds.includes(d.id));

  return (
    <div id="saved-view" className="py-8 sm:py-12 bg-[#F7F1E5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#596B27]">
              Personal Vault
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#102038]">
              Saved For Later
            </h1>
            <p className="text-sm text-[#68675F]">
              Your curated shortlist of restaurants and culinary dishes to experience next.
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex items-center p-1 bg-[#EDE5D5] rounded-2xl border border-[#DDD6C7] self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'restaurants'
                  ? 'bg-[#102038] text-white shadow-xs'
                  : 'text-[#18202B] hover:text-[#102038]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Restaurants ({savedRestaurants.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('dishes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'dishes'
                  ? 'bg-[#102038] text-white shadow-xs'
                  : 'text-[#18202B] hover:text-[#102038]'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Signature Dishes ({savedDishes.length})</span>
            </button>
          </div>
        </div>

        {/* Restaurants Tab */}
        {activeTab === 'restaurants' && (
          <div>
            {savedRestaurants.length === 0 ? (
              <div className="text-center py-16 bg-[#FBF8F0] rounded-3xl border border-[#DDD6C7] p-8 space-y-4">
                <Heart className="w-12 h-12 text-[#68675F] mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#102038]">
                  No Saved Restaurants Yet
                </h3>
                <p className="text-xs sm:text-sm text-[#68675F] max-w-sm mx-auto">
                  Tap the heart icon on any restaurant card across the platform to save it to your personal shortlist.
                </p>
                <button
                  onClick={onExploreClick}
                  className="px-6 py-3 rounded-xl bg-[#596B27] text-white font-bold text-xs"
                >
                  Explore Restaurants
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {savedRestaurants.map((restaurant) => (
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
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span className="px-3 py-1 rounded-full bg-[#102038]/80 text-white text-xs font-semibold">
                          {restaurant.cuisine}
                        </span>

                        <button
                          onClick={(e) => onToggleFavorite(restaurant.id, e)}
                          title="Remove from saved"
                          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-rose-600 flex items-center justify-center transition-transform hover:scale-110 shadow-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white z-10">
                        <span>{restaurant.distance}</span>
                        <span className="font-bold text-[#EDE5D5]">{restaurant.priceLevel}</span>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 text-[#C95718] font-bold">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{restaurant.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-[#68675F]">{restaurant.priceRangeStr}</span>
                        </div>

                        <h3 className="font-serif text-2xl font-bold text-[#102038] mt-1.5 group-hover:text-[#596B27] transition-colors leading-tight">
                          {restaurant.name}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs text-[#68675F] mt-2.5">
                          <MapPin className="w-3.5 h-3.5 text-[#596B27] shrink-0" />
                          <span className="truncate">{restaurant.address}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#DDD6C7] flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-[#102038]">
                          Chef {restaurant.chefName}
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
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dishes Tab */}
        {activeTab === 'dishes' && (
          <div>
            {savedDishes.length === 0 ? (
              <div className="text-center py-16 bg-[#FBF8F0] rounded-3xl border border-[#DDD6C7] p-8 space-y-4">
                <Star className="w-12 h-12 text-[#68675F] mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#102038]">
                  No Saved Dishes Yet
                </h3>
                <p className="text-xs sm:text-sm text-[#68675F] max-w-sm mx-auto">
                  Save chef signatures and seasonal specialties to build your ultimate dining wishlist.
                </p>
                <button
                  onClick={onExploreClick}
                  className="px-6 py-3 rounded-xl bg-[#596B27] text-white font-bold text-xs"
                >
                  Browse Chef Signatures
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {savedDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="group bg-[#FBF8F0] rounded-3xl overflow-hidden border border-[#DDD6C7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative h-52 w-full overflow-hidden bg-[#EDE5D5]">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#102038]/80 text-white text-[10px] font-semibold">
                          ${dish.price}
                        </span>

                        <button
                          onClick={(e) => onToggleSaveDish(dish.id, e)}
                          title="Remove from saved dishes"
                          className="w-8 h-8 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#596B27] font-semibold">{dish.chefName}</span>
                          <span className="text-[#C95718] font-bold">★ {dish.rating}</span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-[#102038] mt-1">
                          {dish.name}
                        </h3>

                        <p className="text-xs text-[#68675F] mt-1 line-clamp-2">
                          {dish.description}
                        </p>
                      </div>

                      <button
                        onClick={(e) => onAddToCart(dish, e)}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#596B27] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#48571f] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order • ${dish.price}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
