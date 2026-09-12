import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  MapPin,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Phone,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DevasyaLogo } from './DevasyaLogo';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../utils/currency';

interface HeaderProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAppointment: () => void;
  onSelectCategory: (category: string) => void;
  onScrollToSection: (sectionId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAppointment,
  onSelectCategory,
  onScrollToSection,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const navItems = [
    {
      name: 'NEW IN',
      id: 'new-in',
      badge: 'Festive 2026',
      featuredTitle: 'Spring Festive Arrivals',
      featuredImg: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
      subLinks: [
        'Khan Market Spring Edit',
        'Zardozi Organza Kurtas',
        'Tissue Unstitched Sets',
        'Ready to Ship (48 Hours)',
        'Celebrity Festive Curations',
      ],
    },
    {
      name: 'KURTA SETS',
      id: 'Kurta Sets',
      badge: '',
      featuredTitle: 'Handcrafted Kurta Sets',
      featuredImg: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
      subLinks: [
        'Pure Silk Organza Sets',
        'Chanderi Straight Suits',
        'Farshi Gharara Sets',
        'Sharara & Peplum Sets',
        'Hand-dyed Bandhani Sets',
      ],
    },
    {
      name: 'UNSTITCHED SUITS',
      id: 'Unstitched Suits',
      badge: 'Heritage',
      featuredTitle: 'Devasya Signature Unstitched',
      featuredImg: 'https://images.unsplash.com/photo-1596783074418-4795477715d1?q=80&w=600&auto=format&fit=crop',
      subLinks: [
        'Varanasi Tissue 3-Piece Fabrics',
        'Chanderi with Handwoven Dupattas',
        'Georgette Zardozi Unstitched',
        'Bespoke Tailoring Services',
        'Trousseau Gift Boxes',
      ],
    },
    {
      name: 'SAREES & DRAPES',
      id: 'Sarees',
      badge: '',
      featuredTitle: 'Heirloom Sarees & Drapes',
      featuredImg: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop',
      subLinks: [
        'Organza Scented Sarees',
        'Banarasi Katan Silk Sarees',
        'Modern Pre-Draped Sarees',
        'Embroidered Cocktail Sarees',
        'Handloom Antique Zari',
      ],
    },
    {
      name: 'LEHENGAS & TROUSSEAU',
      id: 'Lehengas',
      badge: 'Bridal',
      featuredTitle: 'Bridal Lounge Curations',
      featuredImg: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=600&auto=format&fit=crop',
      subLinks: [
        'Pastel Raw Silk Lehengas',
        'Heavy Zardozi Trousseau',
        'Mehendi & Sangeet Sets',
        'Book Khan Market Consultation',
      ],
    },
    {
      name: 'KHAN MARKET FLAGSHIP',
      id: 'stores-section',
      isScroll: true,
      badge: 'Visit Us',
      featuredTitle: '28A Khan Market, New Delhi',
      featuredImg: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=600&auto=format&fit=crop',
      subLinks: [
        'Interactive Google Map & Directions',
        'Book Private Styling Session',
        'Store Timings: 9:30 AM – 6:30 PM',
        'Direct Call: +91 92115 11126',
        'Greater Kailash 1 Boutique',
        'Shahpur Jat Karigar Atelier',
      ],
    },
    {
      name: 'THE ATELIER',
      id: 'stories-section',
      isScroll: true,
      badge: '',
      featuredTitle: 'Craftsmanship & Stories',
      featuredImg: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=600&auto=format&fit=crop',
      subLinks: [
        'The Art of Delhi Zardozi',
        'Master Karigars of Shahpur Jat',
        'Custom Tailoring Process',
        'Devasya Heritage Journal',
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* 1. Top Luxury Announcement Bar (Ogaan Style) */}
      <div className="bg-[#1c1917] text-[#f5efe6] text-[11px] sm:text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-3 tracking-widest uppercase font-medium">
            <span className="flex items-center gap-1.5 text-[#dc6309]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Devasya Khan Market</span>
            </span>
            <span className="hidden md:inline text-stone-500">•</span>
            <span className="hidden md:inline text-stone-300">
              Worldwide Express Shipping on all Handcrafted Luxury Suits
            </span>
          </div>

          <div className="flex items-center gap-4 text-stone-300 tracking-wider">
            <a
              href="tel:+919211511126"
              className="flex items-center gap-1.5 hover:text-[#dc6309] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#dc6309]" />
              <span>+91 92115 11126</span>
            </a>
            <span className="text-stone-700">|</span>
            <button
              onClick={onOpenAppointment}
              className="text-[#dc6309] hover:underline font-semibold tracking-wide flex items-center gap-1"
            >
              <span>Book Khan Market Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Left Actions: Hamburger & Quick Links */}
          <div className="flex items-center gap-3 sm:gap-5 flex-1">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-stone-800 hover:text-[#dc6309] transition-colors lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-widest text-stone-600 hover:text-[#dc6309] transition-colors py-2"
            >
              <Search className="w-4 h-4 text-stone-700" />
              <span>Search</span>
            </button>

            <button
              onClick={() => onScrollToSection('stores-section')}
              className="hidden lg:flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-600 hover:text-[#dc6309] transition-colors py-2"
            >
              <MapPin className="w-3.5 h-3.5 text-[#dc6309]" />
              <span>Khan Market Store</span>
            </button>
          </div>

          {/* Center Brand Identity (Logo with Peacock Emblem) */}
          <div className="flex justify-center flex-shrink-0 py-1">
            <button
              onClick={() => onSelectCategory('All')}
              className="group flex items-center focus:outline-none"
            >
              <DevasyaLogo size="md" variant="primary" />
            </button>
          </div>

          {/* Right Utilities: Currency, WhatsApp Stylist, Wishlist, Bag */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-4 flex-1">
            {/* Currency Switcher */}
            <div className="relative group">
              <select
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="text-xs tracking-widest uppercase bg-transparent text-stone-700 font-semibold border-none rounded py-1 pl-2 pr-6 cursor-pointer focus:ring-1 focus:ring-[#dc6309] hover:text-[#dc6309] appearance-none"
              >
                {Object.keys(CURRENCIES).map((curr) => (
                  <option key={curr} value={curr} className="bg-white text-stone-800">
                    {curr} ({CURRENCIES[curr as CurrencyCode].symbol.trim()})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-stone-500 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* WhatsApp Concierge */}
            <a
              href="https://wa.me/919211511126?text=Hello%20Devasya%20Khan%20Market,%20I%20would%20like%20to%20inquire%20about%20your%20couture%20collection"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs tracking-wider text-stone-600 hover:text-emerald-700 transition-colors px-2 py-1 rounded-full border border-stone-200/80 hover:border-emerald-300"
              title="Chat with Khan Market Stylist"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xl:inline">Stylist</span>
            </a>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-stone-700 hover:text-[#dc6309] transition-colors"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#dc6309] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-stone-700 hover:text-[#dc6309] transition-colors flex items-center gap-1.5"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#1c1917]" />
              {cartCount > 0 && (
                <span className="w-5 h-5 bg-[#dc6309] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 3. Search Bar Expansion (Animated) */}
        {searchOpen && (
          <div className="py-3 px-1 border-t border-stone-200 animate-fadeIn">
            <div className="relative max-w-xl mx-auto">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search unstitched suits, organza kurtas, zardozi, sarees..."
                className="w-full bg-white pl-10 pr-10 py-2.5 text-xs sm:text-sm border border-stone-300 focus:border-[#dc6309] focus:ring-1 focus:ring-[#dc6309] outline-none rounded-none placeholder:text-stone-400"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 4. Desktop Ogaan-Style Mega Navigation */}
        <nav className="hidden lg:flex items-center justify-center space-x-7 border-t border-stone-200/60 py-2.5">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setActiveMegaMenu(item.name)}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                onClick={() => {
                  if (item.isScroll) {
                    onScrollToSection(item.id);
                  } else {
                    onSelectCategory(item.id);
                  }
                }}
                className="flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase font-semibold text-stone-700 hover:text-[#dc6309] transition-colors py-1 relative group"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[9px] tracking-normal font-bold px-1.5 py-0.5 rounded bg-[#dc6309]/10 text-[#dc6309] border border-[#dc6309]/20 uppercase">
                    {item.badge}
                  </span>
                )}
                {/* Active Indicator Line */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#dc6309] transition-all duration-300 group-hover:w-full" />
              </button>

              {/* Mega Dropdown Panel */}
              {activeMegaMenu === item.name && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[540px] z-50 animate-fadeIn">
                  <div className="bg-white border border-stone-200 shadow-xl p-6 grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#dc6309] mb-3 pb-1 border-b border-stone-100">
                        {item.featuredTitle}
                      </h4>
                      <ul className="space-y-2.5">
                        {item.subLinks.map((link) => (
                          <li key={link}>
                            <button
                              onClick={() => {
                                if (item.isScroll) {
                                  onScrollToSection(item.id);
                                } else {
                                  onSelectCategory(item.id);
                                }
                                setActiveMegaMenu(null);
                              }}
                              className="text-xs text-stone-600 hover:text-[#dc6309] transition-colors text-left flex items-center justify-between w-full group/link"
                            >
                              <span>{link}</span>
                              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[#dc6309]" />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 pt-3 border-t border-stone-100">
                        <button
                          onClick={() => {
                            if (item.isScroll) onScrollToSection(item.id);
                            else onSelectCategory(item.id);
                            setActiveMegaMenu(null);
                          }}
                          className="text-[11px] font-semibold text-[#dc6309] uppercase tracking-wider flex items-center gap-1 hover:underline"
                        >
                          <span>Explore All in {item.name}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="relative rounded overflow-hidden group/img">
                      <img
                        src={item.featuredImg}
                        alt={item.featuredTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-48 object-cover transition-transform duration-700 group-hover/img:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3.5">
                        <div className="text-white text-left">
                          <p className="text-[10px] tracking-widest uppercase text-amber-200 font-semibold">
                            Devasya Editorial
                          </p>
                          <p className="text-xs font-serif font-medium leading-snug">
                            {item.featuredTitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* 5. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative bg-[#faf8f5] w-4/5 max-w-sm h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <DevasyaLogo size="sm" variant="primary" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-stone-200 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search Devasya suits..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-none focus:outline-none focus:border-[#dc6309]"
                />
              </div>
            </div>

            {/* Navigation links */}
            <div className="flex-1 px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.isScroll) onScrollToSection(item.id);
                    else onSelectCategory(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-3 px-2 border-b border-stone-100 flex items-center justify-between text-xs tracking-wider uppercase font-semibold text-stone-800 hover:text-[#dc6309]"
                >
                  <span>{item.name}</span>
                  {item.badge ? (
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#dc6309]/10 text-[#dc6309] rounded font-bold">
                      {item.badge}
                    </span>
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Khan Market Details & Contact */}
            <div className="p-4 bg-stone-100 border-t border-stone-200 text-xs space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#dc6309] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">Devasya Khan Market</p>
                  <p className="text-stone-600 text-[11px]">28A, Khan Market, New Delhi 110003</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-stone-600 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                <span>Open 7 Days: 9:30 AM – 6:30 PM</span>
              </div>

              <div className="pt-2 flex gap-2">
                <a
                  href="https://maps.app.goo.gl/2jada8bXfkXL7M3m7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-stone-900 text-white py-2 text-center text-[11px] uppercase tracking-wider font-semibold hover:bg-[#dc6309] transition-colors"
                >
                  Get Directions
                </a>
                <a
                  href="tel:+919211511126"
                  className="px-3 bg-[#dc6309] text-white py-2 flex items-center justify-center hover:bg-[#b85207] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
