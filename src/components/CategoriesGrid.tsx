import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CategoriesGridProps {
  onSelectCategory: (category: string) => void;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'Unstitched Suits',
      title: 'Unstitched Suits',
      subtitle: 'Pure Tissue & Handwoven Chanderi',
      image: 'https://images.unsplash.com/photo-1596783074418-4795477715d1?q=80&w=800&auto=format&fit=crop',
      count: '42+ Ensembles',
      isFlagshipSpecial: true,
    },
    {
      id: 'Kurta Sets',
      title: 'Silk Kurta Sets',
      subtitle: 'Zardozi, Marodi & Farshi Ghararas',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop',
      count: '65+ Designs',
    },
    {
      id: 'Sarees',
      title: 'Heirloom Sarees',
      subtitle: 'Organza Drapes & Banarasi Silks',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop',
      count: '38+ Weaves',
    },
    {
      id: 'Lehengas',
      title: 'Bridal & Trousseau',
      subtitle: 'Bespoke Handcrafted Lehengas',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=800&auto=format&fit=crop',
      count: '24+ Curations',
    },
    {
      id: 'Anarkalis',
      title: 'Regal Anarkalis',
      subtitle: '24-Kali Flared Evening Wear',
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=800&auto=format&fit=crop',
      count: '19+ Silhouettes',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#faf8f5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#dc6309] block mb-1">
              Curated by Devasya Atelier
            </span>
            <h2 className="font-display text-2xl sm:text-4xl text-stone-900 font-normal">
              Shop by Silhouette & Craft
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 sm:mt-0 font-light max-w-md text-left sm:text-right">
            Every piece is cut from pure unadulterated natural silks and hand-embroidered by legacy karigars.
          </p>
        </div>

        {/* 5-Column Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative flex flex-col text-left overflow-hidden bg-white border border-stone-200/80 hover:border-[#dc6309]/50 transition-all duration-300 hover:shadow-lg focus:outline-none"
            >
              {/* Category Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {cat.isFlagshipSpecial && (
                  <div className="absolute top-2.5 left-2.5 bg-[#dc6309] text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 shadow-sm">
                    Khan Market Core
                  </div>
                )}

                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <ArrowUpRight className="w-4 h-4 text-stone-800 group-hover:text-[#dc6309]" />
                </div>
              </div>

              {/* Text Card Footer */}
              <div className="p-3 sm:p-4 bg-white flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-medium text-stone-900 group-hover:text-[#dc6309] transition-colors leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-light mt-0.5 line-clamp-1">
                    {cat.subtitle}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-medium">
                  <span>{cat.count}</span>
                  <span className="text-[#dc6309] uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
