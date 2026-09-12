import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  Send,
  MessageCircle,
  Heart,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { DevasyaLogo } from './DevasyaLogo';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onBookAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onBookAppointment }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#1c1917] text-stone-300 pt-16 pb-12 border-t border-stone-800 text-left text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter & Brand Promise */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-stone-800 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[#dc6309] font-bold text-xs uppercase tracking-[0.25em]">
                Devasya Privilege Club
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-white font-normal">
              Stay in touch with our Khan Market Flagship
            </h3>
            <p className="text-stone-400 font-light text-xs sm:text-sm max-w-md">
              Receive private invitations to our seasonal trunk shows, unstitched suit archive launches, and bridal styling previews.
            </p>
          </div>

          <div className="lg:col-span-6">
            {subscribed ? (
              <div className="p-4 bg-stone-900 border border-[#dc6309]/50 text-[#dc6309] flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dc6309]" />
                <span>Thank you for subscribing to Devasya Khan Market dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 bg-stone-900 border border-stone-700 p-3 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-[#dc6309]"
                />
                <button
                  type="submit"
                  className="bg-[#dc6309] hover:bg-[#b85207] text-white px-6 font-semibold uppercase tracking-widest text-xs transition-colors flex items-center gap-2 shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main 4-Column Navigation & Store Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <DevasyaLogo size="md" variant="light" />
            <p className="text-stone-400 font-light leading-relaxed text-xs">
              Handmade luxury occasion wear, unstitched suit fabrics, and trousseau silhouettes curated for modern Indian celebrations.
            </p>
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#dc6309] font-bold block mb-1">
                Khan Market Flagship
              </span>
              <p className="text-stone-300">28A, Khan Market, New Delhi 110003</p>
              <p className="text-stone-400 text-[11px]">Near Rabindra Nagar</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://maps.app.goo.gl/2jada8bXfkXL7M3m7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#dc6309] hover:underline font-semibold"
              >
                <span>Google Maps Location</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Delhi Flagship Stores */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white pb-1 border-b border-stone-800">
              Our Delhi Boutiques
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium">Khan Market (Flagship)</p>
                <p className="text-stone-400 text-[11px]">28A, Khan Market, New Delhi</p>
                <p className="text-[#dc6309] text-[11px]">Open 7 Days • 9:30 AM – 6:30 PM</p>
              </div>

              <div>
                <p className="text-white font-medium">Greater Kailash 1</p>
                <p className="text-stone-400 text-[11px]">M-12, M Block Market, GK-1, New Delhi</p>
                <p className="text-stone-400 text-[11px]">10:00 AM – 7:30 PM</p>
              </div>

              <div>
                <p className="text-white font-medium">Shahpur Jat (Atelier)</p>
                <p className="text-stone-400 text-[11px]">5K, Dada Jungi Lane, Shahpur Jat</p>
                <p className="text-stone-400 text-[11px]">10:30 AM – 6:30 PM</p>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Collections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white pb-1 border-b border-stone-800">
              Signature Collections
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('Unstitched Suits')}
                  className="hover:text-[#dc6309] transition-colors"
                >
                  Unstitched Suits & 3-Piece Fabrics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Kurta Sets')}
                  className="hover:text-[#dc6309] transition-colors"
                >
                  Zardozi Silk Organza Kurtas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Sarees')}
                  className="hover:text-[#dc6309] transition-colors"
                >
                  Banarasi Tissue & Draped Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Lehengas')}
                  className="hover:text-[#dc6309] transition-colors"
                >
                  Bridal & Trousseau Lehengas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Anarkalis')}
                  className="hover:text-[#dc6309] transition-colors"
                >
                  24-Kali Regal Anarkalis
                </button>
              </li>
              <li>
                <button
                  onClick={onBookAppointment}
                  className="text-[#dc6309] font-medium hover:underline pt-1 block"
                >
                  Book Private Khan Market Fitting
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white pb-1 border-b border-stone-800">
              Customer Concierge
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#dc6309] shrink-0" />
                <a href="tel:+919211511126" className="hover:text-white transition-colors">
                  +91 92115 11126
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href="https://wa.me/919211511126"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Khan Market Stylist
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#dc6309] shrink-0" />
                <span>Mon-Sun: 9:30 AM – 6:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#dc6309] shrink-0" />
                <span>100% Certified Handloom Silks</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-stone-500">
                Worldwide insured courier dispatch via DHL / FedEx. Free shipping on orders over ₹35,000.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Authenticity */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} DEVASYA COUTURE • 28A KHAN MARKET, NEW DELHI. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Primary Brand Hue: #dc6309</span>
            <span>•</span>
            <a
              href="https://maps.app.goo.gl/2jada8bXfkXL7M3m7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dc6309] hover:underline"
            >
              Google Maps
            </a>
            <span>•</span>
            <span>Terms & Conditions</span>
            <span>•</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
