import React from 'react';
import { Home, Compass, ShoppingBag, Heart, User } from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  ordersCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  ordersCount,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: ordersCount },
    { id: 'saved', label: 'Saved', icon: Heart, badge: savedCount },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <div
      id="mobile-bottom-navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF8F0]/95 backdrop-blur-md border-t border-[#DDD6C7] px-2 py-2 safe-area-bottom shadow-lg"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-btn-${item.id}`}
              onClick={() => {
                setActiveTab(item.id as ActiveTab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center w-16 py-1 transition-colors relative ${
                isActive ? 'text-[#102038]' : 'text-[#68675F] hover:text-[#102038]'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  } ${isActive && item.id === 'saved' && savedCount > 0 ? 'fill-[#C95718] text-[#C95718]' : ''}`}
                />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 bg-[#C95718] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight ${
                  isActive ? 'font-bold text-[#102038]' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-[#596B27] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
