import React from 'react';
import { Calendar, Users, Clock, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface ReservationCtaProps {
  onOpenReservation: () => void;
}

export const ReservationCta: React.FC<ReservationCtaProps> = ({ onOpenReservation }) => {
  return (
    <section id="reservation-cta-section" className="py-6 sm:py-8 bg-[#F7F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#102038] text-[#F7F1E5] border border-[#DDD6C7]/20 shadow-xl">
          {/* Subtle background ambient glow and decorative curves */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C95718]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#596B27]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Grid Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#596B27]/30 border border-[#596B27]/50 text-[#EDE5D5] text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-[#C95718]" />
                <span>Prime Dining Slots Available</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
                Make Tonight Special
              </h2>

              <p className="text-sm sm:text-base text-[#DDD6C7] max-w-xl font-normal leading-relaxed">
                Reserve your table at one of the city's most loved restaurants. Whether it's an intimate date night, milestone celebration, or spontaneous culinary escape, secure verified seating in seconds.
              </p>

              {/* Conversion Trust Points */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-[#DDD6C7]">
                  <ShieldCheck className="w-4 h-4 text-[#596B27]" />
                  <span>No Booking Fees</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#DDD6C7]">
                  <Clock className="w-4 h-4 text-[#C95718]" />
                  <span>Instant SMS Voucher</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#DDD6C7]">
                  <Users className="w-4 h-4 text-[#EDE5D5]" />
                  <span>Personal Seating Notes</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Booking Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#FBF8F0] text-[#18202B] p-5 sm:p-6 rounded-2xl border border-[#DDD6C7] shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#DDD6C7]">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#596B27]">
                    Fast Table Booking
                  </div>
                  <div className="font-serif text-lg font-bold text-[#102038]">
                    Tonight or This Weekend
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#EDE5D5] flex items-center justify-center text-[#C95718]">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>

              {/* Quick Preset Selector Preview */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#EDE5D5]/50 rounded-xl border border-[#DDD6C7]">
                  <span className="block text-[10px] text-[#68675F] uppercase font-bold">Preferred Time</span>
                  <span className="font-semibold text-[#102038] mt-0.5 block">7:30 PM (Dinner)</span>
                </div>
                <div className="p-2.5 bg-[#EDE5D5]/50 rounded-xl border border-[#DDD6C7]">
                  <span className="block text-[10px] text-[#68675F] uppercase font-bold">Party Size</span>
                  <span className="font-semibold text-[#102038] mt-0.5 block">2 Guests (Table for 2)</span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                id="cta-reserve-table-btn"
                onClick={onOpenReservation}
                className="w-full py-3.5 px-5 rounded-xl bg-[#C95718] hover:bg-[#b04a13] text-white text-sm font-bold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Reserve a Table</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="text-center">
                <span className="text-[11px] text-[#68675F]">
                  Free cancellation up to 2 hours before dining time.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
