import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, BookOpen, Clock } from 'lucide-react';
import { EDITORIAL_STORIES } from '../data/mockData';

export const AtelierJournal: React.FC = () => {
  const [activeStory, setActiveStory] = useState<typeof EDITORIAL_STORIES[0] | null>(null);

  return (
    <section id="stories-section" className="py-16 sm:py-20 bg-white border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-bold text-[#dc6309] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Devasya Craft Journal</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-stone-900 font-normal">
            Stories from the Atelier
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light mt-2">
            An insider look into our Delhi karigars, heritage textile weaves, and life at 28A Khan Market.
          </p>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDITORIAL_STORIES.map((story) => (
            <div
              key={story.id}
              className="group cursor-pointer flex flex-col text-left"
              onClick={() => setActiveStory(story)}
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-stone-100 mb-4">
                <img
                  src={story.image}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <span className="absolute top-3 left-3 bg-white/95 text-stone-900 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 shadow-sm">
                  {story.tag}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-400 font-medium mb-1.5">
                <Clock className="w-3 h-3 text-[#dc6309]" />
                <span>{story.readTime}</span>
              </div>

              <h3 className="font-display text-xl text-stone-900 group-hover:text-[#dc6309] transition-colors leading-snug">
                {story.title}
              </h3>

              <p className="text-xs text-stone-500 font-light mt-2 line-clamp-2 leading-relaxed">
                {story.subtitle}
              </p>

              <div className="mt-4 pt-2 border-t border-stone-100 flex items-center gap-1.5 text-xs text-[#dc6309] font-semibold uppercase tracking-wider group-hover:gap-2.5 transition-all">
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Reader Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setActiveStory(null)}
          />
          <div className="relative bg-[#faf8f5] w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-stone-200 shadow-2xl z-10 text-left p-6 sm:p-8">
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest font-bold text-[#dc6309] block mb-1">
              {activeStory.tag}
            </span>

            <h3 className="font-display text-2xl sm:text-3xl text-stone-900 leading-tight mb-4">
              {activeStory.title}
            </h3>

            <div className="aspect-[16/9] w-full overflow-hidden mb-6 bg-stone-100">
              <img
                src={activeStory.image}
                alt={activeStory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-700 font-light leading-relaxed">
              <p className="font-medium text-stone-900 text-sm sm:text-base">
                {activeStory.subtitle}
              </p>
              <p>
                Nestled in New Delhi’s most revered shopping promenade, Devasya’s Khan Market flagship at 28A has established itself as an essential stop for trousseau seekers, brides, and lovers of artisanal Indian suits.
              </p>
              <p>
                Unlike fast fashion, each ensemble at Devasya begins with hand-spun threads — fine organzas woven in Varanasi, airy Chanderis from Madhya Pradesh, and raw silks dyed in custom jewel palettes. Master karigars in our Shahpur Jat atelier hand-embroider each floral vine with real silver-gilt zardozi, hand-folded gota patti, and fine sitara work.
              </p>
              <p>
                Our Khan Market boutique team takes pride in tailoring each semi-stitched or unstitched piece to individual client proportions, ensuring heirloom silhouettes that drape flawlessly.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
              <div className="text-xs text-stone-500">
                <span>Devasya Atelier • 28A Khan Market</span>
              </div>
              <a
                href="https://maps.app.goo.gl/2jada8bXfkXL7M3m7"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#dc6309] text-white text-xs uppercase tracking-wider font-semibold px-4 py-2 hover:bg-[#b85207] transition-colors"
              >
                Visit Store
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
