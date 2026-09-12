import React, { useState } from 'react';
import { Heart, Eye, Sparkles, Clock, Check } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCartDirect,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedDirectly, setAddedDirectly] = useState(false);

  const mainImage = product.images[0];
  const hoverImage = product.images[1] || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCartDirect(product);
    setAddedDirectly(true);
    setTimeout(() => setAddedDirectly(false), 2000);
  };

  return (
    <div
      className="group relative flex flex-col bg-white border border-stone-200/70 hover:border-stone-300 transition-all duration-300 select-none text-left"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 cursor-pointer">
        {/* Main Image */}
        <img
          src={mainImage}
          alt={product.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered && hoverImage !== mainImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          onClick={() => onQuickView(product)}
        />

        {/* Hover Alternate Image */}
        {hoverImage !== mainImage && (
          <img
            src={hoverImage}
            alt={`${product.title} detail`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            onClick={() => onQuickView(product)}
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start pointer-events-none">
          {product.isKhanMarketExclusive && (
            <span className="bg-[#1c1917] text-[#dc6309] text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-sm border border-[#dc6309]/30">
              Khan Market Exclusive
            </span>
          )}

          {product.isNew && (
            <span className="bg-[#dc6309] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 shadow-sm">
              New In
            </span>
          )}

          {product.isReadyToShip && !product.isNew && (
            <span className="bg-stone-800 text-amber-200 text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 shadow-sm flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              <span>Ships 24-48H</span>
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 z-10"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#dc6309] text-[#dc6309]' : 'text-stone-700 hover:text-[#dc6309]'
            }`}
          />
        </button>

        {/* Quick View & Quick Add Action Bar (Hover Overlay) */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 bg-white hover:bg-stone-100 text-stone-900 py-2 px-3 text-[11px] font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#dc6309]" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            className="bg-[#dc6309] hover:bg-[#b85207] text-white py-2 px-3 text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 shadow-md transition-colors"
            title="Quick Add to Bag"
          >
            {addedDirectly ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <span>+ Bag</span>
            )}
          </button>
        </div>
      </div>

      {/* Product Info Block */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Collection & Category */}
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-stone-400 font-semibold mb-1">
            <span>{product.collection}</span>
            <span className="text-[#dc6309] font-medium">{product.fabric}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-display text-sm sm:text-base font-normal text-stone-900 hover:text-[#dc6309] transition-colors leading-snug cursor-pointer line-clamp-2"
          >
            {product.title}
          </h3>

          {/* Craft detail */}
          <p className="text-[11px] text-stone-500 font-light mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#dc6309]" />
            <span className="truncate">{product.embroidery} Hand-embroidery</span>
          </p>
        </div>

        {/* Pricing & Sizes */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-stone-900 text-sm sm:text-base">
                {formatPrice(product.priceINR, currency)}
              </span>
              {product.originalPriceINR && (
                <span className="text-stone-400 line-through text-xs">
                  {formatPrice(product.originalPriceINR, currency)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-stone-400 font-normal">Inclusive of all taxes</p>
          </div>

          {/* Size or Unstitched flag */}
          <span className="text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded font-medium">
            {product.category === 'Unstitched Suits' ? 'Unstitched Set' : 'Semi-Stitched'}
          </span>
        </div>
      </div>
    </div>
  );
};
