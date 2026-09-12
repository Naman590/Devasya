import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  currency: CurrencyCode;
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  currency,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#faf8f5] w-full max-w-md h-full shadow-2xl flex flex-col z-10 text-stone-900 border-l border-stone-200 animate-slideLeft">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#dc6309] fill-[#dc6309]" />
            <h2 className="font-display text-xl font-medium tracking-tight">
              Saved Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-200/70 flex items-center justify-center text-stone-400">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display text-xl text-stone-800">Your wishlist is empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Tap the heart icon on any suit or trousseau piece to save it for your Khan Market visit or order later.
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-[#dc6309] hover:bg-[#b85207] text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 transition-colors shadow-sm"
              >
                Discover Ensembles
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 border border-stone-200 flex gap-3 shadow-xs text-left text-xs"
              >
                <div className="w-20 h-28 bg-stone-100 shrink-0 overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#dc6309]">
                        {item.collection}
                      </span>
                      <button
                        onClick={() => onRemoveWishlist(item)}
                        className="text-stone-400 hover:text-red-500 p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h4 className="font-display text-sm font-medium text-stone-900 mt-0.5 leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-1">{item.fabric} • {item.embroidery}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <span className="font-semibold text-stone-900 text-sm">
                      {formatPrice(item.priceINR, currency)}
                    </span>
                    <button
                      onClick={() => {
                        onAddToCart(item);
                        onRemoveWishlist(item);
                      }}
                      className="bg-[#dc6309] hover:bg-[#b85207] text-white py-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
