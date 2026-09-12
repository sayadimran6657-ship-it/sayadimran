import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="dinenest-footer" className="bg-[#102038] text-[#F7F1E5] pt-16 pb-24 md:pb-16 border-t border-[#DDD6C7]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {/* Logo icon */}
              <div className="w-10 h-10 rounded-xl bg-[#596B27] flex items-center justify-center text-white shadow-xs">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 21C6 14.5 10.5 9 16 9C21.5 9 26 14.5 26 21H6Z"
                    fill="#F7F1E5"
                    fillOpacity="0.2"
                    stroke="#F7F1E5"
                    strokeWidth="1.8"
                  />
                  <path d="M16 9V6M14 6H18" stroke="#C95718" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 23.5C9 25 23 25 28 23.5" stroke="#EDE5D5" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M16 13C16 13 18 15 16 17C14 15 16 13 16 13Z" fill="#C95718" />
                </svg>
              </div>

              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block leading-none">
                  DineNest
                </span>
                <span className="text-[10px] tracking-widest text-[#EDE5D5] font-semibold uppercase block mt-1">
                  Discover • Dine • Enjoy
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#DDD6C7] max-w-sm leading-relaxed">
              DineNest connects epicureans with handpicked dining experiences, wood-hearth heritage kitchens, and celebrated table-side hospitality worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[
                { name: 'Instagram', icon: 'IG' },
                { name: 'Twitter / X', icon: 'X' },
                { name: 'LinkedIn', icon: 'IN' },
                { name: 'Facebook', icon: 'FB' },
              ].map((s) => (
                <button
                  key={s.name}
                  aria-label={s.name}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#596B27] text-white flex items-center justify-center text-xs font-bold transition-colors border border-white/10"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Explore Col (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C95718]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#DDD6C7]">
              <li>
                <button
                  onClick={() => handleNav('restaurants')}
                  className="hover:text-white transition-colors"
                >
                  Featured Restaurants
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('explore')}
                  className="hover:text-white transition-colors"
                >
                  Cuisine Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('experiences')}
                  className="hover:text-white transition-colors"
                >
                  Curated Experiences
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('offers')}
                  className="hover:text-white transition-colors"
                >
                  Exclusive Offers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('articles')}
                  className="hover:text-white transition-colors"
                >
                  Stories From The Table
                </button>
              </li>
            </ul>
          </div>

          {/* Company Col (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#596B27]">
              Company
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#DDD6C7]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors"
                >
                  About DineNest
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Inquiries
                </button>
              </li>
              <li>
                <a href="#contact-section" className="hover:text-white transition-colors">
                  Restaurant Partnerships
                </a>
              </li>
              <li>
                <span className="text-[#DDD6C7]/60">Careers (We're Hiring)</span>
              </li>
            </ul>
          </div>

          {/* Support Col (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#EDE5D5]">
              Support & Trust
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#DDD6C7]">
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors"
                >
                  Help Center & Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('orders')}
                  className="hover:text-white transition-colors"
                >
                  Table Reservations FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('orders')}
                  className="hover:text-white transition-colors"
                >
                  Delivery Tracking Support
                </button>
              </li>
              <li>
                <span className="text-[#DDD6C7]/60">Privacy Policy • Terms of Service</span>
              </li>
            </ul>

            <div className="pt-2 text-xs text-[#DDD6C7]/70">
              Concierge Desk:{' '}
              <a href="tel:+12125550199" className="text-white hover:underline">
                +1 (212) 555-0199
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#DDD6C7]/70 gap-4">
          <div>© 2026 DineNest. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Accessibility</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Diner Code of Conduct</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Michelin Guide Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
