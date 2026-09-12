import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Scissors,
  Check,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface ProductQuickViewModalProps {
  product: Product | null;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onClose: () => void;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, customStitching: boolean) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  currency,
  isWishlisted,
  onClose,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [customStitching, setCustomStitching] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'craft' | 'care'>('details');

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, customStitching);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl z-10 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Image Stage (Left 6 Cols) */}
          <div className="md:col-span-6 bg-stone-100 p-4 sm:p-6 flex flex-col justify-between">
            {/* Primary Main Image */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-white shadow-inner mb-4">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {product.isKhanMarketExclusive && (
                <div className="absolute top-3 left-3 bg-[#1c1917] text-[#dc6309] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 shadow-md border border-[#dc6309]/30">
                  Khan Market Flagship
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-16 h-20 shrink-0 border-2 overflow-hidden transition-all ${
                    selectedImageIdx === idx
                      ? 'border-[#dc6309] shadow-sm'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details (Right 6 Cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between text-left">
            <div className="space-y-4">
              {/* Collection & Category */}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#dc6309] font-bold">
                <span>{product.collection}</span>
                <span className="text-stone-400 font-normal">{product.category}</span>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl sm:text-3xl text-stone-900 font-normal leading-tight">
                {product.title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-2 border-b border-stone-200">
                <span className="text-2xl font-semibold text-stone-900">
                  {formatPrice(product.priceINR, currency)}
                </span>
                {product.originalPriceINR && (
                  <span className="text-stone-400 line-through text-base">
                    {formatPrice(product.originalPriceINR, currency)}
                  </span>
                )}
                <span className="text-xs text-[#dc6309] font-semibold bg-[#dc6309]/10 px-2 py-0.5 rounded">
                  Festive Atelier Price
                </span>
              </div>

              {/* Fabric & Embroidery Specification Chips */}
              <div className="grid grid-cols-2 gap-2 text-xs py-1">
                <div className="bg-stone-50 border border-stone-200/80 p-2">
                  <span className="text-stone-400 uppercase text-[10px] block font-medium">Fabric</span>
                  <span className="font-semibold text-stone-800">{product.fabric}</span>
                </div>
                <div className="bg-stone-50 border border-stone-200/80 p-2">
                  <span className="text-stone-400 uppercase text-[10px] block font-medium">Embroidery</span>
                  <span className="font-semibold text-stone-800">{product.embroidery}</span>
                </div>
              </div>

              {/* Size / Fit Selection */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  <span>Select Silhouette / Option</span>
                  <span className="text-[11px] text-stone-500 font-normal lowercase">
                    {product.category === 'Unstitched Suits' ? '3-piece uncut fabric' : 'standard or tailored'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-2 text-xs font-medium border transition-all ${
                        selectedSize === sz
                          ? 'border-[#dc6309] bg-[#dc6309] text-white shadow-sm'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Devasya Custom Master Tailoring Option (Flagship Specialty) */}
              <div
                onClick={() => setCustomStitching(!customStitching)}
                className={`p-3 border rounded-none cursor-pointer transition-all flex items-start gap-3 ${
                  customStitching
                    ? 'border-[#dc6309] bg-[#dc6309]/5'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={customStitching}
                  onChange={(e) => setCustomStitching(e.target.checked)}
                  className="mt-0.5 accent-[#dc6309]"
                />
                <div className="text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-stone-900">
                    <Scissors className="w-3.5 h-3.5 text-[#dc6309]" />
                    <span>Devasya Khan Market Master Tailoring Service</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Our Khan Market master tailor will connect via WhatsApp to take your custom neck, bust, waist & sleeve measurements (+ ₹2,500).
                  </p>
                </div>
              </div>

              {/* Tabbed Info (Details / Craft / Care) */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex border-b border-stone-200 text-xs font-semibold tracking-wider uppercase">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-[#dc6309] text-[#dc6309]'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('craft')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'craft'
                        ? 'border-[#dc6309] text-[#dc6309]'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Artisan Craft
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`py-2 px-3 border-b-2 transition-colors ${
                      activeTab === 'care'
                        ? 'border-[#dc6309] text-[#dc6309]'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Care & Delivery
                  </button>
                </div>

                <div className="py-3 text-xs text-stone-600 font-light leading-relaxed">
                  {activeTab === 'details' && <p>{product.description}</p>}
                  {activeTab === 'craft' && (
                    <div className="space-y-1.5">
                      <p className="font-medium text-stone-900">{product.craftDetails}</p>
                      <p className="text-[11px] text-stone-500">
                        Handcrafted at Devasya’s Shahpur Jat atelier, finished at Khan Market flagship.
                      </p>
                    </div>
                  )}
                  {activeTab === 'care' && (
                    <div className="space-y-1.5">
                      <p>{product.careInstructions}</p>
                      <div className="flex items-center gap-1.5 text-emerald-700 font-medium text-[11px]">
                        <Truck className="w-3.5 h-3.5" />
                        <span>{product.deliveryTime} with insured express courier.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#dc6309] hover:bg-[#b85207] text-white py-3.5 px-4 text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Your Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 border transition-colors ${
                    isWishlisted
                      ? 'border-[#dc6309] bg-[#dc6309]/10 text-[#dc6309]'
                      : 'border-stone-300 text-stone-700 hover:border-stone-400'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#dc6309]' : ''}`} />
                </button>
              </div>

              {/* WhatsApp Stylist Connect */}
              <a
                href={`https://wa.me/919211511126?text=Hi%20Devasya%20Khan%20Market,%20I%20am%20interested%20in%20"${encodeURIComponent(
                  product.title
                )}"%20(Price:%20₹${product.priceINR}).%20Please%20share%20more%20details%20or%20fabric%20swatches.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Inquire on WhatsApp with Khan Market Stylist</span>
              </a>

              <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                  100% Authentic Handcrafted
                </span>
                <span>Store Code: {product.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
