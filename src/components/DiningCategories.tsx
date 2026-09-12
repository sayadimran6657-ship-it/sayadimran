import React from 'react';
import { Sparkles, Leaf, Users, Tag, BookOpen, ArrowUpRight } from 'lucide-react';
import { ActiveTab } from '../types';

interface DiningCategoriesProps {
  onSelectCategory: (action: { type: 'tab' | 'filter'; value: string }) => void;
}

export const DiningCategories: React.FC<DiningCategoriesProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'popular-dishes',
      title: 'Popular Dishes',
      subtitle: 'Most loved by diners',
      description: 'Handcrafted pastas, dry-aged cuts, and standout dessert creations trending right now.',
      icon: Sparkles,
      iconColor: 'text-[#C95718]',
      bgAccent: 'group-hover:bg-[#C95718]/10',
      action: { type: 'filter', value: 'popular' } as const,
    },
    {
      id: 'healthy-choices',
      title: 'Healthy Choices',
      subtitle: 'Fresh meals for balanced dining',
      description: 'Ancient grains, botanical cold infusions, and certified organic harvest produce.',
      icon: Leaf,
      iconColor: 'text-[#596B27]',
      bgAccent: 'group-hover:bg-[#596B27]/10',
      action: { type: 'filter', value: 'healthy' } as const,
    },
    {
      id: 'family-dining',
      title: 'Family Dining',
      subtitle: 'Comfortable places for everyone',
      description: 'Spacious banquette seating, sharing platters, and gracious service for all ages.',
      icon: Users,
      iconColor: 'text-[#102038]',
      bgAccent: 'group-hover:bg-[#102038]/10',
      action: { type: 'filter', value: 'family' } as const,
    },
    {
      id: 'special-offers',
      title: 'Special Offers',
      subtitle: 'Deals worth discovering',
      description: 'Prix fixe tasting menus, sunset pairings, and complimentary dessert promotions.',
      icon: Tag,
      iconColor: 'text-[#C95718]',
      bgAccent: 'group-hover:bg-[#C95718]/10',
      action: { type: 'tab', value: 'offers' } as const,
    },
    {
      id: 'food-stories',
      title: 'Food Stories',
      subtitle: 'Ideas, inspiration & guides',
      description: 'Sommelier pairing notebooks, date-night guides, and neighborhood culinary secrets.',
      icon: BookOpen,
      iconColor: 'text-[#596B27]',
      bgAccent: 'group-hover:bg-[#596B27]/10',
      action: { type: 'tab', value: 'articles' } as const,
    },
  ];

  return (
    <section id="dining-categories-section" className="py-14 sm:py-20 bg-[#F7F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#596B27]">
            Tailored Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#102038] mt-1">
            Dining By Occasion
          </h2>
          <p className="text-sm text-[#68675F] mt-2">
            Whether you are planning a casual family lunch or an elevated sensory culinary tasting.
          </p>
        </div>

        {/* 5 Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                id={`cat-tile-${cat.id}`}
                onClick={() => onSelectCategory(cat.action)}
                className="group relative bg-[#FBF8F0] p-6 rounded-3xl border border-[#DDD6C7] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#EDE5D5] flex items-center justify-center transition-colors group-hover:bg-[#102038] group-hover:text-white">
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#68675F] group-hover:text-[#C95718] transition-colors" />
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#102038] group-hover:text-[#596B27] transition-colors">
                    {cat.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#C95718] mt-0.5">
                    {cat.subtitle}
                  </div>
                  <p className="text-xs text-[#68675F] mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#DDD6C7]/60 text-xs font-bold text-[#102038] group-hover:text-[#596B27] transition-colors flex items-center gap-1">
                  <span>Explore Now</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
