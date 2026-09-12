import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials-section" className="py-16 sm:py-24 bg-[#102038] text-[#F7F1E5] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#596B27]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C95718]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C95718]">
            Genuine Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            What Diners Say
          </h2>
          <p className="text-sm sm:text-base text-[#DDD6C7] max-w-lg mx-auto">
            Honest reflections from guests who discovered unforgettable evenings through DineNest.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-[#18202B]/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 lg:p-14 border border-white/10 shadow-2xl">
          <Quote className="w-12 h-12 text-[#596B27]/40 mb-6" />

          {/* Review Text */}
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-white leading-relaxed italic min-h-28">
            “{current.quote}”
          </blockquote>

          {/* Author Details & Star Rating */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#596B27]"
              />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-base text-white">
                  <span>{current.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#596B27]" />
                </div>
                <div className="text-xs text-[#DDD6C7]">{current.role}</div>
                <div className="text-xs text-[#C95718] font-medium mt-0.5">
                  Dined at: {current.restaurant}
                </div>
              </div>
            </div>

            {/* Stars & Carousel Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-6">
              <div className="flex items-center text-[#C95718] gap-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="testimonial-prev-btn"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#596B27] text-white flex items-center justify-center transition-colors border border-white/15 focus:outline-none"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  id="testimonial-next-btn"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#596B27] text-white flex items-center justify-center transition-colors border border-white/15 focus:outline-none"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-[#C95718]' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
