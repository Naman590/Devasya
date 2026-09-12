import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onShopCollection: (category: string) => void;
  onExploreStore: () => void;
  onBookAppointment: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onShopCollection,
  onExploreStore,
  onBookAppointment,
}) => {
  const slides = [
    {
      id: 1,
      tag: 'SPRING FESTIVE COUTURE 2026',
      title: 'The Khan Market Edit',
      subtitle: 'Handcrafted zardozi organza kurtas, gossamer tissue dupattas, and heirloom unstitched suits from our flagship atelier.',
      primaryBtnText: 'Shop New Arrivals',
      primaryCategory: 'new-in',
      secondaryBtnText: 'Visit Khan Market Store',
      action: 'store',
      bgImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1800&auto=format&fit=crop',
      accent: 'Exclusive Flagship Release',
    },
    {
      id: 2,
      tag: 'SIGNATURE CRAFTSMANSHIP',
      title: 'Heirloom Unstitched Suits',
      subtitle: 'Pure Banarasi metallic tissue, handloom Chanderi resham jaals, and bespoke semi-stitched suits tailored to perfection.',
      primaryBtnText: 'Explore Unstitched Collection',
      primaryCategory: 'Unstitched Suits',
      secondaryBtnText: 'Book Tailoring Consultation',
      action: 'appointment',
      bgImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1800&auto=format&fit=crop',
      accent: '3-Piece Sets with Handloom Dupattas',
    },
    {
      id: 3,
      tag: 'OCCASION & EVENING ENSEMBLES',
      title: 'The Trousseau Gallery',
      subtitle: 'Curated bridal anarkalis, raw silk farshi ghararas, and hand-embroidered royal silhouettes crafted for intimate celebrations.',
      primaryBtnText: 'View Bridal Trousseau',
      primaryCategory: 'Lehengas',
      secondaryBtnText: 'Khan Market Flagship',
      action: 'store',
      bgImage: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1800&auto=format&fit=crop',
      accent: 'Bespoke Fittings at 28A Khan Market',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[680px] bg-stone-900 overflow-hidden select-none">
      {/* Background Images with smooth fade */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } transition-transform duration-10000`}
        >
          <img
            src={s.bgImage}
            alt={s.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle Editorial Vignette & Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </div>
      ))}

      {/* Slide Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20">
        <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
          {/* Accent Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#dc6309] text-white text-[10px] sm:text-xs tracking-[0.25em] font-semibold uppercase shadow-md">
            <Sparkles className="w-3 h-3 text-amber-200" />
            <span>{slide.tag}</span>
          </div>

          {/* Editorial Title */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.05] tracking-tight">
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-stone-200 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl">
            {slide.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => onShopCollection(slide.primaryCategory)}
              className="bg-[#dc6309] hover:bg-[#b85207] text-white text-xs sm:text-sm font-semibold tracking-widest uppercase px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group"
            >
              <span>{slide.primaryBtnText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {slide.action === 'store' ? (
              <button
                onClick={onExploreStore}
                className="bg-white/10 hover:bg-white text-white hover:text-stone-900 border border-white/40 hover:border-white text-xs sm:text-sm font-medium tracking-widest uppercase px-5 sm:px-7 py-3.5 sm:py-4 transition-all duration-200 backdrop-blur-sm flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#dc6309]" />
                <span>{slide.secondaryBtnText}</span>
              </button>
            ) : (
              <button
                onClick={onBookAppointment}
                className="bg-white/10 hover:bg-white text-white hover:text-stone-900 border border-white/40 hover:border-white text-xs sm:text-sm font-medium tracking-widest uppercase px-5 sm:px-7 py-3.5 sm:py-4 transition-all duration-200 backdrop-blur-sm"
              >
                <span>{slide.secondaryBtnText}</span>
              </button>
            )}
          </div>
        </div>

        {/* Carousel Navigation Bottom Controls */}
        <div className="mt-8 pt-4 border-t border-white/20 flex items-center justify-between">
          {/* Slide Dots */}
          <div className="flex items-center gap-2.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentSlide ? 'w-8 bg-[#dc6309]' : 'w-2 bg-white/50 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-2 text-white/70 hover:text-white bg-black/30 hover:bg-black/60 rounded-full transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2 text-white/70 hover:text-white bg-black/30 hover:bg-black/60 rounded-full transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
