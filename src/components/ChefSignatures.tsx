import React from 'react';
import { Heart, Plus, Star, Sparkles, ChefHat } from 'lucide-react';
import { MenuItem } from '../types';
import { CHEF_SIGNATURE_DISHES } from '../data/mockData';

interface ChefSignaturesProps {
  savedDishIds: string[];
  onToggleSaveDish: (id: string, e: React.MouseEvent) => void;
  onAddToCart: (item: MenuItem, e: React.MouseEvent) => void;
}

export const ChefSignatures: React.FC<ChefSignaturesProps> = ({
  savedDishIds,
  onToggleSaveDish,
  onAddToCart,
}) => {
  return (
    <section id="chef-signatures-section" className="py-14 sm:py-20 bg-[#EDE5D5]/50 border-y border-[#DDD6C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C95718]">
              <ChefHat className="w-4 h-4" />
              <span>Culinary Highlights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102038] mt-1">
              Chef Signatures
            </h2>
            <p className="text-sm sm:text-base text-[#68675F] max-w-xl mt-2">
              Signature courses crafted with precision, seasonal harvests, and generations of technique.
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-2 text-xs font-semibold text-[#596B27]">
            <Sparkles className="w-4 h-4 text-[#C95718]" />
            <span>Prepared fresh to order</span>
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CHEF_SIGNATURE_DISHES.map((dish) => {
            const isSaved = savedDishIds.includes(dish.id);

            return (
              <div
                key={dish.id}
                id={`signature-dish-${dish.id}`}
                className="group bg-[#FBF8F0] rounded-3xl overflow-hidden border border-[#DDD6C7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Dish Photo */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#EDE5D5]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                  {/* Top: Dietary & Favorite */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <div className="flex gap-1.5">
                      {dish.dietary?.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full bg-[#102038]/80 backdrop-blur-md text-white text-[10px] font-semibold border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      id={`fav-dish-${dish.id}`}
                      onClick={(e) => onToggleSaveDish(dish.id, e)}
                      aria-label="Save dish to favorites"
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#102038] flex items-center justify-center transition-transform hover:scale-110 shadow-md focus:outline-none"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isSaved ? 'fill-[#C95718] text-[#C95718]' : 'text-[#102038]'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 z-10">
                    <span className="px-3 py-1 rounded-xl bg-[#102038]/90 backdrop-blur-md text-white font-serif font-bold text-base shadow-sm border border-white/15">
                      ${dish.price}
                    </span>
                  </div>
                </div>

                {/* Dish Information Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Chef & Rating */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#596B27] font-semibold flex items-center gap-1">
                        <ChefHat className="w-3.5 h-3.5" />
                        {dish.chefName}
                      </span>

                      <div className="flex items-center gap-1 text-[#C95718] font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{dish.rating}</span>
                      </div>
                    </div>

                    {/* Dish Name */}
                    <h3 className="font-serif text-xl font-bold text-[#102038] mt-1.5 group-hover:text-[#596B27] transition-colors leading-snug">
                      {dish.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#68675F] mt-1 leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>
                  </div>

                  {/* Add to Order Button */}
                  <button
                    id={`add-order-${dish.id}`}
                    onClick={(e) => onAddToCart(dish, e)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#EDE5D5] hover:bg-[#596B27] text-[#102038] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn border border-[#DDD6C7]"
                  >
                    <Plus className="w-3.5 h-3.5 transition-transform group-hover/btn:rotate-90" />
                    <span>Add to Dining Order • ${dish.price}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
