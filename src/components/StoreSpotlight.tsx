import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { STORE_LOCATIONS } from '../data/mockData';

interface StoreSpotlightProps {
  onBookAppointment: (storeId?: string) => void;
}

export const StoreSpotlight: React.FC<StoreSpotlightProps> = ({ onBookAppointment }) => {
  const [selectedStoreId, setSelectedStoreId] = useState<string>('khan-market');

  const currentStore =
    STORE_LOCATIONS.find((s) => s.id === selectedStoreId) || STORE_LOCATIONS[0];

  const storeImages = [
    {
      title: 'Devasya Khan Market Flagship Entrance',
      src: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop',
      caption: '28A Khan Market boutique facade with signature brass & warm wood accents',
    },
    {
      title: 'The Unstitched Suits & Silk Salon',
      src: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=1000&auto=format&fit=crop',
      caption: 'Over 200+ exclusive pure tissue, banarasi & organza unstitched suit lengths',
    },
    {
      title: 'Private Bridal & Trousseau Lounge',
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
      caption: 'Dedicated styling suites for bridal consultations and bespoke custom stitching',
    },
  ];

  return (
    <section id="stores-section" className="py-16 sm:py-24 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#dc6309]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#dc6309]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dc6309]/20 border border-[#dc6309]/40 text-[#dc6309] text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#dc6309]" />
            <span>The Delhi Flagship Sanctuaries</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
            Visit Devasya Khan Market
          </h2>

          <p className="mt-4 text-sm sm:text-base text-stone-300 font-light leading-relaxed">
            Experience our handcrafted semi-stitched suits, bridal trousseau, and unstitched silk fabrics in person. Our Khan Market boutique provides bespoke styling, personal alterations, and bridal consultations.
          </p>
        </div>

        {/* Store Location Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {STORE_LOCATIONS.map((store) => (
            <button
              key={store.id}
              onClick={() => setSelectedStoreId(store.id)}
              className={`px-5 py-3 text-xs sm:text-sm uppercase tracking-widest font-semibold transition-all duration-200 rounded-none border ${
                selectedStoreId === store.id
                  ? 'bg-[#dc6309] border-[#dc6309] text-white shadow-lg'
                  : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-700 hover:text-white'
              }`}
            >
              {store.area} {store.isFlagship ? '• Flagship' : ''}
            </button>
          ))}
        </div>

        {/* Store Detail Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Store Info Card (Left 5 Cols) */}
          <div className="lg:col-span-5 bg-stone-800/90 border border-stone-700 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md">
            <div className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#dc6309]">
                  {currentStore.subtitle}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-white font-medium mt-1">
                  {currentStore.name}
                </h3>
              </div>

              {/* Address */}
              <div className="space-y-4 text-xs sm:text-sm text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#dc6309] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">{currentStore.address}</p>
                    <p className="text-stone-400">
                      {currentStore.area}, {currentStore.city} - {currentStore.pincode}
                    </p>
                    <p className="text-[11px] text-stone-400 mt-1">
                      Located in prime Khan Market near Rabindra Nagar
                    </p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#dc6309] shrink-0" />
                  <div>
                    <span className="text-stone-400">Timings: </span>
                    <span className="text-white font-medium">{currentStore.timing}</span>
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#dc6309] shrink-0" />
                  <div>
                    <span className="text-stone-400">Direct Line: </span>
                    <a
                      href={`tel:${currentStore.phone}`}
                      className="text-white hover:text-[#dc6309] font-medium transition-colors"
                    >
                      {currentStore.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Store Highlights */}
              <div className="pt-4 border-t border-stone-700/80">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-200 mb-3">
                  Boutique Amenities & Services
                </h4>
                <ul className="space-y-2">
                  {currentStore.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#dc6309] shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions for Store */}
            <div className="mt-8 pt-6 border-t border-stone-700 space-y-3">
              {/* Direct Google Maps Link strictly pointing to user's provided link */}
              <a
                href={currentStore.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#dc6309] hover:bg-[#b85207] text-white py-3.5 px-4 text-xs sm:text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md group"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => onBookAppointment(currentStore.id)}
                  className="bg-white/10 hover:bg-white text-white hover:text-stone-900 border border-white/20 hover:border-white py-3 px-3 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </button>

                <a
                  href={`https://wa.me/919211511126?text=Hi%20Devasya%20${encodeURIComponent(
                    currentStore.name
                  )},%20I%20would%20like%20to%20visit%20your%20boutique`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-800/60 hover:bg-emerald-700 border border-emerald-600/50 text-emerald-100 py-3 px-3 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Store Gallery Visuals & Photos (Right 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Primary Featured Store Photo */}
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-stone-700 bg-stone-950 group">
              <img
                src={storeImages[0].src}
                alt={storeImages[0].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="bg-[#dc6309] text-white text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 inline-block mb-1">
                  Khan Market Flagship Interior
                </span>
                <p className="text-white text-sm sm:text-base font-serif font-medium">
                  {storeImages[0].caption}
                </p>
              </div>
            </div>

            {/* Two Secondary Store Photo Columns */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              {storeImages.slice(1).map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] w-full overflow-hidden border border-stone-700 bg-stone-950 group"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <p className="text-stone-200 text-xs font-serif line-clamp-2">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Google Rating Verification Ribbon */}
            <div className="bg-stone-800/80 border border-stone-700/80 p-3.5 flex items-center justify-between text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#dc6309]" />
                <span className="font-medium text-white">Google Maps Verified Flagship</span>
                <span className="text-amber-400 font-bold">★ 5.0 Rating</span>
              </div>
              <a
                href={currentStore.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#dc6309] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>View Google Reviews</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
