import React from 'react';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { FoodArticle } from '../types';
import { FOOD_ARTICLES } from '../data/mockData';

interface StoriesSectionProps {
  onSelectArticle: (article: FoodArticle) => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({ onSelectArticle }) => {
  return (
    <section id="stories-section" className="py-14 sm:py-20 bg-[#F7F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#596B27]">
              <BookOpen className="w-4 h-4" />
              <span>DineNest Editorial</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102038] mt-1">
              Stories From The Table
            </h2>
            <p className="text-sm sm:text-base text-[#68675F] max-w-xl mt-1">
              Insights, sommelier notebooks, chef techniques, and neighborhood dining guides curated for discerning palates.
            </p>
          </div>

          <span className="hidden sm:inline-flex text-xs font-semibold text-[#68675F]">
            Updated weekly by culinary writers
          </span>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FOOD_ARTICLES.map((art) => (
            <article
              key={art.id}
              id={`article-card-${art.id}`}
              onClick={() => onSelectArticle(art)}
              className="group bg-[#FBF8F0] rounded-3xl overflow-hidden border border-[#DDD6C7] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              <div>
                {/* Article Header Image */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#EDE5D5]">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#102038]/85 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10">
                    {art.category}
                  </span>

                  <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-white text-xs">
                    <Clock className="w-3.5 h-3.5 text-[#EDE5D5]" />
                    <span>{art.readingTime}</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl font-bold text-[#102038] group-hover:text-[#596B27] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#68675F] leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-[#DDD6C7]/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={art.author.avatar}
                    alt={art.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#DDD6C7]"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#102038] block leading-none">
                      {art.author.name}
                    </span>
                    <span className="text-[10px] text-[#68675F] mt-0.5 block">
                      {art.publishedDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#596B27] group-hover:text-[#C95718] transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
