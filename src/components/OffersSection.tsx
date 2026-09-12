import React, { useState } from 'react';
import { Tag, Clock, Check, Copy, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';
import { DiningOffer, Restaurant } from '../types';
import { DINING_OFFERS } from '../data/mockData';

interface OffersSectionProps {
  onSelectRestaurantById: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({
  onSelectRestaurantById,
  onShowToast,
}) => {
  const [claimedCodes, setClaimedCodes] = useState<{ [id: string]: boolean }>({});

  const handleClaim = (offer: DiningOffer) => {
    navigator.clipboard.writeText(offer.promoCode);
    setClaimedCodes((prev) => ({ ...prev, [offer.id]: true }));
    onShowToast(`Promo code "${offer.promoCode}" copied! Use when reserving or ordering.`);
  };

  return (
    <section id="offers-page-section" className="py-14 sm:py-20 bg-[#F7F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C95718]/15 border border-[#C95718]/30 text-[#C95718] text-xs font-semibold tracking-wide mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Exclusive DineNest Privileges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102038]">
            Curated Dining Privileges
          </h2>
          <p className="text-sm sm:text-base text-[#68675F] mt-2">
            Complimentary courses, tasting flight savings, and exclusive chef table perks negotiated exclusively for DineNest members.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {DINING_OFFERS.map((offer) => {
            const isClaimed = !!claimedCodes[offer.id];

            return (
              <div
                key={offer.id}
                id={`offer-card-${offer.id}`}
                className="bg-[#FBF8F0] rounded-3xl overflow-hidden border border-[#DDD6C7] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group"
              >
                {/* Visual Image */}
                <div className="relative sm:w-2/5 h-48 sm:h-auto overflow-hidden bg-[#EDE5D5]">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#C95718] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {offer.badge}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-xl font-serif font-bold tracking-tight block drop-shadow-xs">
                      {offer.discount}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                  <div>
                    <button
                      onClick={() => onSelectRestaurantById(offer.restaurantId)}
                      className="text-xs font-bold text-[#596B27] hover:underline uppercase tracking-wider block text-left"
                    >
                      {offer.restaurantName} →
                    </button>

                    <h3 className="font-serif text-xl font-bold text-[#102038] mt-1 leading-snug">
                      {offer.title}
                    </h3>

                    <p className="text-xs text-[#68675F] mt-2 leading-relaxed">
                      {offer.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-[#DDD6C7]/60 space-y-1 text-[11px] text-[#68675F]">
                      <div className="flex items-center gap-1.5 font-medium text-[#102038]">
                        <Clock className="w-3.5 h-3.5 text-[#C95718]" />
                        <span>{offer.expires}</span>
                      </div>
                      <div className="text-[10px] italic">{offer.terms}</div>
                    </div>
                  </div>

                  {/* Claim Button and Promo code */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      id={`claim-offer-${offer.id}`}
                      onClick={() => handleClaim(offer)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
                        isClaimed
                          ? 'bg-[#596B27] text-white'
                          : 'bg-[#C95718] hover:bg-[#b04a13] text-white'
                      }`}
                    >
                      {isClaimed ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Code Copied: {offer.promoCode}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Claim Offer ({offer.promoCode})</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onSelectRestaurantById(offer.restaurantId)}
                      className="p-2.5 rounded-xl bg-[#EDE5D5] hover:bg-[#DDD6C7] text-[#102038] transition-colors"
                      title="View Restaurant"
                    >
                      <ArrowRight className="w-4 h-4" />
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
