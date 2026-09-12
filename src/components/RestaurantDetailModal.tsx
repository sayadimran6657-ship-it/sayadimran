import React, { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  Clock,
  Heart,
  Phone,
  Share2,
  Calendar,
  Users,
  ChevronRight,
  Plus,
  CheckCircle2,
  ChefHat,
  Sparkles,
  Info,
} from 'lucide-react';
import { Restaurant, MenuItem } from '../types';

interface RestaurantDetailModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onAddToCart: (item: MenuItem, e: React.MouseEvent) => void;
  onBookReservation: (restaurant: Restaurant) => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  onClose,
  isSaved,
  onToggleSave,
  onAddToCart,
  onBookReservation,
}) => {
  if (!restaurant) return null;

  const [activeMenuTab, setActiveMenuTab] = useState<
    'All' | 'Starters' | 'Main Courses' | 'Grills' | 'Vegetarian' | 'Desserts' | 'Drinks'
  >('All');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const allImages = [restaurant.image, ...(restaurant.gallery || [])];

  const filteredMenuItems =
    activeMenuTab === 'All'
      ? restaurant.menu
      : restaurant.menu.filter((m) => m.category === activeMenuTab);

  return (
    <div
      id="restaurant-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
    >
      <div
        id="restaurant-detail-modal"
        className="relative w-full max-w-5xl bg-[#F7F1E5] rounded-3xl shadow-2xl border border-[#DDD6C7] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          aria-label="Close restaurant details"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#102038] flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Banner with Photo Gallery */}
          <div className="relative h-72 sm:h-96 w-full bg-[#102038]">
            <img
              src={allImages[activeImageIndex]}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#102038] via-[#102038]/40 to-transparent" />

            {/* Thumbnail switcher overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
              <div className="flex gap-2">
                {allImages.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#C95718] scale-105 shadow-md'
                        : 'border-white/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Action buttons on image */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => onToggleSave(restaurant.id, e)}
                  aria-label="Save to favorites"
                  className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-[#102038] font-semibold text-xs flex items-center gap-1.5 shadow-md transition-transform hover:scale-105"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isSaved ? 'fill-[#C95718] text-[#C95718]' : 'text-[#102038]'
                    }`}
                  />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={() => alert('Link copied to clipboard!')}
                  aria-label="Share restaurant"
                  className="p-2 rounded-xl bg-white/90 hover:bg-white text-[#102038] shadow-md transition-transform hover:scale-105"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Restaurant Header Information */}
          <div className="p-6 sm:p-8 bg-[#FBF8F0] border-b border-[#DDD6C7]">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#102038] text-white text-xs font-bold uppercase tracking-wider">
                    {restaurant.cuisine}
                  </span>
                  <span className="text-xs font-bold text-[#596B27]">
                    {restaurant.priceLevel} ({restaurant.priceRangeStr})
                  </span>
                  <span className="text-xs text-[#68675F]">•</span>
                  <div className="flex items-center gap-1 text-[#C95718] font-bold text-xs">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{restaurant.rating.toFixed(1)}</span>
                    <span className="text-[#68675F]">({restaurant.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#102038] leading-tight">
                  {restaurant.name}
                </h1>
                <p className="text-xs sm:text-sm font-medium text-[#596B27]">
                  {restaurant.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#68675F] pt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#596B27]" />
                    {restaurant.address}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C95718]" />
                    {restaurant.openingHours} ({restaurant.isOpen ? 'Open Now' : 'Closed'})
                  </span>
                </div>
              </div>

              {/* Fast Booking CTA Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  id="modal-reserve-btn"
                  onClick={() => onBookReservation(restaurant)}
                  className="px-6 py-3.5 rounded-xl bg-[#596B27] hover:bg-[#48571f] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table</span>
                </button>
              </div>
            </div>

            {/* Description & Chef Spotlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-[#DDD6C7]/60">
              <div className="md:col-span-2 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#68675F]">
                  About The Kitchen & Atmosphere
                </h3>
                <p className="text-xs sm:text-sm text-[#18202B] leading-relaxed">
                  {restaurant.description}
                </p>

                {/* Features chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {restaurant.features.map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 rounded-lg bg-[#EDE5D5] text-[#102038] text-xs font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#EDE5D5]/60 border border-[#DDD6C7] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#596B27]">
                  <ChefHat className="w-4 h-4" />
                  <span>Executive Direction</span>
                </div>
                <div className="font-serif font-bold text-base text-[#102038]">
                  {restaurant.chefName}
                </div>
                <div className="text-[11px] text-[#68675F] font-semibold">{restaurant.chefTitle}</div>
                <p className="text-xs text-[#18202B] leading-relaxed italic">
                  "{restaurant.chefBio}"
                </p>
              </div>
            </div>
          </div>

          {/* Section: Interactive Menu */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#596B27]">
                  Artisanal Preparations
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#102038]">
                  Curated Menu
                </h2>
              </div>

              {/* Menu Categories Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 max-w-full">
                {(
                  ['All', 'Starters', 'Main Courses', 'Grills', 'Vegetarian', 'Desserts', 'Drinks'] as const
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveMenuTab(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      activeMenuTab === cat
                        ? 'bg-[#102038] text-white shadow-xs'
                        : 'bg-[#EDE5D5] text-[#18202B] hover:bg-[#DDD6C7]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FBF8F0] p-4 rounded-2xl border border-[#DDD6C7] hover:border-[#596B27] transition-all flex gap-4 group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#DDD6C7]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#102038] leading-tight group-hover:text-[#596B27] transition-colors">
                          {item.name}
                        </h4>
                        <span className="font-serif font-bold text-sm sm:text-base text-[#102038]">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-xs text-[#68675F] mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#DDD6C7]/50">
                      <div className="flex gap-1">
                        {item.dietary?.map((d) => (
                          <span
                            key={d}
                            className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#EDE5D5] text-[#18202B] font-medium"
                          >
                            {d}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={(e) => onAddToCart(item, e)}
                        className="px-2.5 py-1 rounded-lg bg-[#596B27] hover:bg-[#48571f] text-white text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Diner Reviews */}
          <div className="p-6 sm:p-8 bg-[#EDE5D5]/40 border-t border-[#DDD6C7] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#596B27]">
                  Verified Guests
                </span>
                <h3 className="font-serif text-xl font-bold text-[#102038]">
                  Guest Reviews ({restaurant.reviews.length})
                </h3>
              </div>
              <div className="text-right">
                <div className="font-serif text-2xl font-bold text-[#102038]">
                  {restaurant.rating.toFixed(1)} / 5.0
                </div>
                <div className="text-[10px] text-[#68675F]">Based on 400+ bookings</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restaurant.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 bg-[#FBF8F0] rounded-2xl border border-[#DDD6C7] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.userAvatar}
                        alt={rev.userName}
                        className="w-8 h-8 rounded-full object-cover border border-[#DDD6C7]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#102038] flex items-center gap-1">
                          <span>{rev.userName}</span>
                          {rev.verifiedDiner && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#596B27]" />
                          )}
                        </div>
                        <div className="text-[10px] text-[#68675F]">{rev.date}</div>
                      </div>
                    </div>

                    <div className="flex text-[#C95718]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#18202B] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="p-4 sm:p-5 bg-[#FBF8F0] border-t border-[#DDD6C7] flex items-center justify-between">
          <div className="hidden sm:block">
            <span className="text-xs text-[#68675F]">Instant confirmation with DineNest concierge</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#DDD6C7] text-xs font-semibold text-[#18202B] hover:bg-[#EDE5D5]"
            >
              Close
            </button>
            <button
              onClick={() => onBookReservation(restaurant)}
              className="px-6 py-2.5 rounded-xl bg-[#C95718] hover:bg-[#b04a13] text-white text-xs font-bold tracking-wide transition-all shadow-sm"
            >
              Reserve Table at {restaurant.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
