import React from 'react';
import { ArrowRight, Play, Star, Sparkles, Award, Clock } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onWatchStoryClick: () => void;
  onOpenReservation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onWatchStoryClick,
  onOpenReservation,
}) => {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-[#F7F1E5] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24"
    >
      {/* Subtle organic decorative background SVG patterns */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#EDE5D5]/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#596B27]/10 blur-3xl pointer-events-none" />

      {/* Decorative leaf motifs */}
      <div className="absolute left-8 top-1/3 opacity-20 pointer-events-none hidden xl:block">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <path
            d="M32 6C32 6 22 20 22 34C22 43 28 50 32 58C36 50 42 43 42 34C42 20 32 6 32 6Z"
            stroke="#596B27"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M32 14V50" stroke="#596B27" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M32 26C35 23 39 23 39 23" stroke="#596B27" strokeWidth="1.5" />
          <path d="M32 36C29 33 25 33 25 33" stroke="#596B27" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Editorial Content (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Subtle Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE5D5] border border-[#DDD6C7] text-xs font-semibold text-[#102038] tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#C95718]" />
              <span>Curated Fine Dining & Table Reservations</span>
            </div>

            {/* Main Editorial Headline with mixed typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-serif font-bold text-[#102038] leading-[1.08] tracking-tight">
              Your Next Great Meal
              <br />
              <span className="text-[#C95718] italic font-normal">Is Waiting</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-[#68675F] max-w-xl font-normal leading-relaxed">
              Discover exceptional restaurants, signature dishes, and unforgettable dining
              experiences near you. Handpicked atmospheres, table-side artistry, and effortless reservations.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-cta"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#596B27] hover:bg-[#48571f] text-[#F7F1E5] font-semibold text-sm sm:text-base tracking-wide shadow-sm hover:shadow-md transition-all group"
              >
                <span>Explore Restaurants</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-story-cta"
                onClick={onWatchStoryClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FBF8F0] hover:bg-[#EDE5D5] border border-[#DDD6C7] text-[#102038] font-semibold text-sm sm:text-base transition-all group"
              >
                <span className="w-7 h-7 rounded-full bg-[#102038] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                <span>Watch Our Story</span>
              </button>
            </div>

            {/* Editorial Badges / Social Proof */}
            <div className="pt-6 border-t border-[#DDD6C7]/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#102038]">
                  480+
                </div>
                <div className="text-xs text-[#68675F] font-medium mt-0.5">
                  Curated Kitchens
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#102038] flex items-center gap-1">
                  4.95
                  <Star className="w-4 h-4 fill-[#C95718] text-[#C95718]" />
                </div>
                <div className="text-xs text-[#68675F] font-medium mt-0.5">
                  Gastronomy Rating
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#102038]">
                  100%
                </div>
                <div className="text-xs text-[#68675F] font-medium mt-0.5">
                  Confirmed Seating
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Image & Chef Showcase (5 cols on desktop) */}
          <div className="lg:col-span-5 relative">
            {/* Background Decorative Accent Ring */}
            <div className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-linear-to-tr from-[#596B27]/20 via-[#C95718]/15 to-transparent blur-md -rotate-1" />

            {/* Main Chef Portrait Container */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DDD6C7] bg-[#FBF8F0] shadow-xl aspect-4/5 sm:aspect-3/4 max-w-md mx-auto lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=80"
                alt="Chef presenting a gourmet plated dish in a warm luxury restaurant kitchen"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                loading="eager"
              />

              {/* Gentle dark gradient at bottom for contrast */}
              <div className="absolute inset-0 bg-linear-to-t from-[#102038]/70 via-[#102038]/10 to-transparent" />

              {/* Floating Badge: Chef's Choice 5 Stars */}
              <div
                id="hero-chef-badge"
                className="absolute top-5 right-5 bg-[#FBF8F0]/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#DDD6C7] shadow-lg flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#596B27] text-white flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#102038] tracking-tight">
                    Chef's Choice
                  </div>
                  <div className="flex items-center text-[#C95718] text-[10px] font-semibold gap-0.5">
                    {'★★★★★'}
                    <span className="text-[#68675F] ml-1">4.9/5</span>
                  </div>
                </div>
              </div>

              {/* Floating Bottom Card: Featured Plate & Chef Signature */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#102038]/90 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-[#F7F1E5] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#C95718]">
                    Signature Plating
                  </div>
                  <div className="font-serif text-base font-bold text-white leading-tight mt-0.5">
                    Truffle Porcini & Aged Carnaroli
                  </div>
                  <div className="text-xs text-[#DDD6C7] mt-0.5 flex items-center gap-2">
                    <span>Chef Matteo Moretti</span>
                    <span>•</span>
                    <span>$28</span>
                  </div>
                </div>

                <button
                  onClick={onOpenReservation}
                  className="px-3.5 py-2 rounded-xl bg-[#C95718] hover:bg-[#b04a13] text-white text-xs font-bold transition-colors whitespace-nowrap shadow-xs"
                >
                  Book Table
                </button>
              </div>
            </div>

            {/* Organic botanical accent badge */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 hidden sm:flex items-center gap-3 bg-[#FBF8F0] px-4 py-3 rounded-2xl border border-[#DDD6C7] shadow-md">
              <div className="w-9 h-9 rounded-full bg-[#EDE5D5] flex items-center justify-center text-[#596B27]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#102038]">Instant Confirmation</div>
                <div className="text-[11px] text-[#68675F]">Real-time table guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
