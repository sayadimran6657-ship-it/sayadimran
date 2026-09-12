import React from 'react';
import { X, Clock, Calendar, Share2, BookOpen, User } from 'lucide-react';
import { FoodArticle } from '../types';

interface ArticleModalProps {
  article: FoodArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div
      id="article-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="article-modal"
        className="relative w-full max-w-3xl bg-[#FBF8F0] rounded-3xl shadow-2xl border border-[#DDD6C7] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          aria-label="Close article"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#102038] flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1">
          {/* Header Image */}
          <div className="relative h-64 sm:h-80 w-full bg-[#102038]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#102038] via-[#102038]/30 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="px-3 py-1 rounded-full bg-[#C95718] text-white text-xs font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 leading-tight">
                {article.title}
              </h1>
            </div>
          </div>

          {/* Article Info Bar */}
          <div className="p-6 sm:p-8 bg-[#EDE5D5]/50 border-b border-[#DDD6C7] flex flex-wrap items-center justify-between gap-4 text-xs text-[#68675F]">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#DDD6C7]"
              />
              <div>
                <span className="font-bold text-[#102038] text-sm block">
                  {article.author.name}
                </span>
                <span className="text-[11px] text-[#68675F]">{article.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#596B27]" />
                {article.publishedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C95718]" />
                {article.readingTime}
              </span>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-10 space-y-6 text-[#18202B] leading-relaxed text-sm sm:text-base">
            <p className="font-serif text-lg sm:text-xl text-[#102038] font-medium leading-relaxed italic">
              {article.excerpt}
            </p>

            <div className="space-y-4 font-normal text-[#18202B]">
              <p>
                Every memorable meal begins long before the guest sits down. In our conversation with Michelin-honored chefs across the city, one unifying philosophy emerges: genuine gastronomy is not merely culinary technique, but an orchestration of atmosphere, acoustic balance, and sensory rhythm.
              </p>

              <div className="my-6 p-5 rounded-2xl bg-[#EDE5D5] border-l-4 border-[#596B27] space-y-1">
                <h4 className="font-serif font-bold text-base text-[#102038]">
                  The Sommelier's Golden Principle
                </h4>
                <p className="text-xs sm:text-sm text-[#68675F] italic">
                  "When matching wine with complex wood-hearth dishes, mirror the intensity of smoke rather than the weight of the meat."
                </p>
              </div>

              <p>
                Whether exploring hidden trattorias with three generations of sourdough heritage or minimalist counter omakase spots flying in fish overnight from Toyosu market, the dining landscape has entered a golden era of authenticity.
              </p>

              <p>
                DineNest diners consistently report that taking the time to discuss preferences with service leads to the most bespoke off-menu surprises. Next time you reserve, make a note for the kitchen—you may be treated to a signature preparation reserved only for the curious.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FBF8F0] border-t border-[#DDD6C7] flex items-center justify-between">
          <span className="text-xs text-[#68675F]">Published by DineNest Gastronomy Press</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#102038] text-white text-xs font-bold"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};
