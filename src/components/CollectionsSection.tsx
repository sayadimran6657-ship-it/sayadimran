import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { RestaurantCollection } from '../types';
import { RESTAURANT_COLLECTIONS } from '../data/mockData';

interface CollectionsSectionProps {
  onSelectCollection: (collectionId: string) => void;
  onViewAllCollections: () => void;
}

export const CollectionsSection: React.FC<CollectionsSectionProps> = ({
  onSelectCollection,
  onViewAllCollections,
}) => {
  return (
    <section id="curated-collections-section" className="py-14 sm:py-20 bg-[#F7F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and "View All" button */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#596B27]">
              Curated Atmospheres
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102038] mt-1">
              Curated Dining Experiences
            </h2>
            <p className="text-sm sm:text-base text-[#68675F] max-w-xl mt-2">
              From open-air skyline terraces to tucked-away neighborhood candlelit cellars, discover spaces that match your mood.
            </p>
          </div>

          <button
            id="collections-view-all-btn"
            onClick={onViewAllCollections}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#596B27] hover:text-[#102038] transition-colors group"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 6 Curated Collection Cards in Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {RESTAURANT_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              id={`collection-card-${col.id}`}
              onClick={() => onSelectCollection(col.id)}
              className="group relative h-84 sm:h-96 rounded-3xl overflow-hidden cursor-pointer border border-[#DDD6C7] shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Background Image with Zoom */}
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Sophisticated Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-linear-to-t from-[#102038] via-[#102038]/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

              {/* Top Tag Badge */}
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-[#102038]/70 backdrop-blur-md text-[#F7F1E5] text-[11px] font-semibold border border-white/10">
                  {col.tag}
                </span>

                <span className="text-[11px] font-bold text-[#DDD6C7] bg-[#102038]/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {col.restaurantCount} Restaurants
                </span>
              </div>

              {/* Bottom Editorial Content */}
              <div className="absolute bottom-5 left-5 right-5 z-10 space-y-2 text-[#F7F1E5]">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#C95718]">
                  {col.subtitle}
                </div>
                <h3 className="font-serif text-2xl font-bold leading-tight group-hover:text-[#EDE5D5] transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-[#DDD6C7] line-clamp-2 leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#C95718] transition-colors">
                  <span>Explore Experience</span>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#C95718] group-hover:text-white transition-all">
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
