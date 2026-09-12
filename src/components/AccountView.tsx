import React, { useState } from 'react';
import {
  User,
  Heart,
  Calendar,
  Package,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Phone,
  Mail,
  Edit2,
} from 'lucide-react';
import { ActiveTab } from '../types';

interface AccountViewProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onShowToast: (msg: string) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [userName, setUserName] = useState('Sayad Imran');
  const [userEmail, setUserEmail] = useState('sayadimran6657@gmail.com');
  const [userPhone, setUserPhone] = useState('+1 (212) 555-8392');

  const [dietaryPrefs, setDietaryPrefs] = useState({
    vegetarian: false,
    glutenFree: true,
    nutAllergy: false,
    organicOnly: true,
    seafoodLover: true,
  });

  const [notifications, setNotifications] = useState({
    tableSms: true,
    weeklyGazette: true,
    chefPrivileges: true,
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Profile & dining preferences updated successfully.');
  };

  return (
    <div id="account-view" className="py-8 sm:py-12 bg-[#F7F1E5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Card Banner */}
        <div className="bg-[#102038] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#596B27]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt={userName}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#EDE5D5] shadow-lg"
              />
              <span className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#596B27] flex items-center justify-center text-white border-2 border-[#102038]">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="flex-1 space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#596B27] text-white text-[11px] font-bold uppercase tracking-wider">
                <span>DineNest Connoisseur Member</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {userName}
              </h1>
              <p className="text-xs text-[#DDD6C7] flex items-center justify-center sm:justify-start gap-4 pt-1">
                <span>{userEmail}</span>
                <span>•</span>
                <span>{userPhone}</span>
              </p>
            </div>

            <button
              onClick={() => onShowToast('Membership tier: Connoisseur (400 points to Master)')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-colors"
            >
              Tier Benefits
            </button>
          </div>
        </div>

        {/* Quick Nav Shortcuts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Reservations', icon: Calendar, tab: 'orders' as ActiveTab, count: '1 Active' },
            { label: 'Saved Places', icon: Heart, tab: 'saved' as ActiveTab, count: '6 Saved' },
            { label: 'Food Orders', icon: Package, tab: 'orders' as ActiveTab, count: '2 Orders' },
            { label: 'Concierge Help', icon: Phone, tab: 'contact' as ActiveTab, count: '24/7 Live' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => onNavigateTab(item.tab)}
                className="bg-[#FBF8F0] p-4 rounded-2xl border border-[#DDD6C7] hover:border-[#596B27] transition-all text-left group shadow-xs hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EDE5D5] flex items-center justify-center text-[#596B27] mb-2 group-hover:bg-[#596B27] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-[#102038]">{item.label}</div>
                <div className="text-[11px] text-[#68675F]">{item.count}</div>
              </button>
            );
          })}
        </div>

        {/* Profile Settings & Preferences */}
        <div className="bg-[#FBF8F0] rounded-3xl border border-[#DDD6C7] p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-[#DDD6C7]">
            <h2 className="font-serif text-xl font-bold text-[#102038]">
              Personal Dining Preferences
            </h2>
            <p className="text-xs text-[#68675F]">
              Your preferences are discreetly shared with participating chefs for tailored service.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Dietary Checkboxes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102038] mb-3">
                Dietary & Allergen Notes
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {[
                  { key: 'vegetarian', label: 'Vegetarian Friendly' },
                  { key: 'glutenFree', label: 'Gluten-Free Priority' },
                  { key: 'nutAllergy', label: 'Severe Nut Allergy' },
                  { key: 'organicOnly', label: 'Organic / Farm Sourced' },
                  { key: 'seafoodLover', label: 'Seafood & Raw Bar Affinity' },
                ].map((diet) => (
                  <label
                    key={diet.key}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#DDD6C7] cursor-pointer hover:border-[#596B27] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={(dietaryPrefs as any)[diet.key]}
                      onChange={(e) =>
                        setDietaryPrefs({ ...dietaryPrefs, [diet.key]: e.target.checked })
                      }
                      className="w-4 h-4 text-[#596B27] rounded-sm focus:ring-[#596B27]"
                    />
                    <span className="font-medium text-[#102038]">{diet.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="pt-4 border-t border-[#DDD6C7]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#102038] mb-3">
                Concierge Notification Channels
              </label>
              <div className="space-y-3 text-xs">
                {[
                  {
                    key: 'tableSms',
                    title: 'Table SMS Confirmation',
                    desc: 'Real-time text alerts for seating guarantees and arrival reminders',
                  },
                  {
                    key: 'chefPrivileges',
                    title: 'Private Chef Invitations',
                    desc: 'Early access to guest chef pop-ups, tasting menus, and secret room bookings',
                  },
                  {
                    key: 'weeklyGazette',
                    title: 'Stories From The Table Newsletter',
                    desc: 'Weekly sommelier reviews and neighborhood guides',
                  },
                ].map((notif) => (
                  <label
                    key={notif.key}
                    className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#DDD6C7] cursor-pointer hover:border-[#596B27] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={(notifications as any)[notif.key]}
                      onChange={(e) =>
                        setNotifications({ ...notifications, [notif.key]: e.target.checked })
                      }
                      className="w-4 h-4 text-[#596B27] rounded-sm mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-[#102038]">{notif.title}</div>
                      <div className="text-[11px] text-[#68675F]">{notif.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between pt-4 border-t border-[#DDD6C7]">
              <button
                type="button"
                onClick={() => onShowToast('Signed out of DineNest session')}
                className="text-xs font-bold text-rose-700 hover:underline flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#596B27] hover:bg-[#48571f] text-white text-xs font-bold transition-all shadow-xs"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
