import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  X,
  Sparkles,
  Check,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  currency: CurrencyCode;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCartDirect: (product: Product) => void;
  searchQuery: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  currency,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCartDirect,
  searchQuery,
}) => {
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedEmbroidery, setSelectedEmbroidery] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [onlyKhanMarket, setOnlyKhanMarket] = useState(false);
  const [onlyReadyToShip, setOnlyReadyToShip] = useState(false);

  // Available options
  const categories = [
    'All',
    'Unstitched Suits',
    'Kurta Sets',
    'Sarees',
    'Lehengas',
    'Anarkalis',
  ];

  const fabrics = ['All', 'Organza Silk', 'Chanderi', 'Raw Silk', 'Tissue', 'Velvet'];
  const occasions = ['All', 'Festive', 'Wedding', 'Cocktail', 'Pooja & Rituals', 'Evening Trousseau'];
  const embroideries = ['All', 'Zardozi', 'Gota Patti', 'Kashmiri Tilla', 'Aari Work', 'Threadwork & Sequins', 'Handloom Weave'];

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'All' && selectedCategory !== 'new-in') {
        if (p.category !== selectedCategory) return false;
      }
      if (selectedCategory === 'new-in' && !p.isNew) {
        return false;
      }

      // Fabric match
      if (selectedFabric !== 'All' && p.fabric !== selectedFabric) {
        return false;
      }

      // Occasion match
      if (selectedOccasion !== 'All' && p.occasion !== selectedOccasion) {
        return false;
      }

      // Embroidery match
      if (selectedEmbroidery !== 'All' && p.embroidery !== selectedEmbroidery) {
        return false;
      }

      // Khan Market Exclusives toggle
      if (onlyKhanMarket && !p.isKhanMarketExclusive) {
        return false;
      }

      // Ready to ship toggle
      if (onlyReadyToShip && !p.isReadyToShip) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchCraft = p.craftDetails.toLowerCase().includes(q);
        const matchFabric = p.fabric.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCraft && !matchFabric && !matchCat) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
      if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [
    products,
    selectedCategory,
    selectedFabric,
    selectedOccasion,
    selectedEmbroidery,
    onlyKhanMarket,
    onlyReadyToShip,
    searchQuery,
    sortBy,
  ]);

  const activeFilterCount =
    (selectedFabric !== 'All' ? 1 : 0) +
    (selectedOccasion !== 'All' ? 1 : 0) +
    (selectedEmbroidery !== 'All' ? 1 : 0) +
    (onlyKhanMarket ? 1 : 0) +
    (onlyReadyToShip ? 1 : 0);

  const resetFilters = () => {
    setSelectedFabric('All');
    setSelectedOccasion('All');
    setSelectedEmbroidery('All');
    setOnlyKhanMarket(false);
    setOnlyReadyToShip(false);
  };

  return (
    <section id="catalog-section" className="py-12 sm:py-16 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Catalog Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-bold text-[#dc6309] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Devasya Couture Archive</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-stone-900 font-normal">
              {selectedCategory === 'All'
                ? 'All Ensembles & Unstitched Suits'
                : selectedCategory === 'new-in'
                ? 'Spring Festive 2026 • New Arrivals'
                : selectedCategory}
            </h2>
            <p className="text-xs text-stone-500 font-light mt-1">
              Showing {filteredProducts.length} handcrafted heirloom designs
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {/* Quick Category Tabs (Ogaan Style) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`text-xs uppercase tracking-wider px-3.5 py-2 whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#dc6309] border-[#dc6309] text-white font-semibold shadow-sm'
                    : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-stone-200/80 p-3 sm:p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Filter Toggle Button */}
            <button
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
              className={`flex items-center gap-2 text-xs uppercase tracking-wider font-semibold px-3.5 py-2 border transition-colors ${
                activeFilterCount > 0 || filterPanelOpen
                  ? 'border-[#dc6309] bg-[#dc6309]/10 text-[#dc6309]'
                  : 'border-stone-300 text-stone-700 hover:border-stone-400'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Quick Toggle: Khan Market Exclusives */}
            <button
              onClick={() => setOnlyKhanMarket(!onlyKhanMarket)}
              className={`hidden sm:flex items-center gap-1.5 text-xs px-3 py-2 border transition-all ${
                onlyKhanMarket
                  ? 'border-[#dc6309] bg-[#dc6309] text-white font-semibold'
                  : 'border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              <span>Khan Market Only</span>
            </button>

            {/* Quick Toggle: Ready to Ship */}
            <button
              onClick={() => setOnlyReadyToShip(!onlyReadyToShip)}
              className={`hidden sm:flex items-center gap-1.5 text-xs px-3 py-2 border transition-all ${
                onlyReadyToShip
                  ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                  : 'border-stone-200 text-stone-600 hover:border-stone-300'
              }`}
            >
              <span>Ships in 24-48H</span>
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#dc6309] hover:underline uppercase tracking-wider font-semibold"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 uppercase tracking-wider text-[11px]">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs tracking-wider bg-stone-50 border border-stone-300 py-1.5 pl-3 pr-8 rounded-none cursor-pointer focus:outline-none focus:border-[#dc6309] font-medium text-stone-800 appearance-none"
              >
                <option value="featured">Bestsellers & Featured</option>
                <option value="newest">New Arrivals First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {filterPanelOpen && (
          <div className="bg-white border border-stone-200 p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn text-left text-xs">
            {/* Fabric Filter */}
            <div>
              <h4 className="font-semibold uppercase tracking-wider text-stone-900 mb-3 pb-1 border-b border-stone-100">
                Fabric Material
              </h4>
              <div className="space-y-1.5">
                {fabrics.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFabric(f)}
                    className={`w-full text-left py-1 px-1.5 flex items-center justify-between rounded ${
                      selectedFabric === f
                        ? 'text-[#dc6309] font-semibold bg-[#dc6309]/5'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>{f}</span>
                    {selectedFabric === f && <Check className="w-3.5 h-3.5 text-[#dc6309]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div>
              <h4 className="font-semibold uppercase tracking-wider text-stone-900 mb-3 pb-1 border-b border-stone-100">
                Occasion & Celebration
              </h4>
              <div className="space-y-1.5">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`w-full text-left py-1 px-1.5 flex items-center justify-between rounded ${
                      selectedOccasion === occ
                        ? 'text-[#dc6309] font-semibold bg-[#dc6309]/5'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>{occ}</span>
                    {selectedOccasion === occ && <Check className="w-3.5 h-3.5 text-[#dc6309]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Embroidery Craft Filter */}
            <div>
              <h4 className="font-semibold uppercase tracking-wider text-stone-900 mb-3 pb-1 border-b border-stone-100">
                Embroidery & Craft
              </h4>
              <div className="space-y-1.5">
                {embroideries.map((emb) => (
                  <button
                    key={emb}
                    onClick={() => setSelectedEmbroidery(emb)}
                    className={`w-full text-left py-1 px-1.5 flex items-center justify-between rounded ${
                      selectedEmbroidery === emb
                        ? 'text-[#dc6309] font-semibold bg-[#dc6309]/5'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <span>{emb}</span>
                    {selectedEmbroidery === emb && <Check className="w-3.5 h-3.5 text-[#dc6309]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles & Boutique Options */}
            <div>
              <h4 className="font-semibold uppercase tracking-wider text-stone-900 mb-3 pb-1 border-b border-stone-100">
                Boutique Availability
              </h4>
              <div className="space-y-3 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyKhanMarket}
                    onChange={(e) => setOnlyKhanMarket(e.target.checked)}
                    className="accent-[#dc6309]"
                  />
                  <span>Khan Market Exclusives Only</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyReadyToShip}
                    onChange={(e) => setOnlyReadyToShip(e.target.checked)}
                    className="accent-[#dc6309]"
                  />
                  <span>Ready to Ship in 24-48 Hours</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white border border-stone-200 p-8 space-y-4">
            <h3 className="font-display text-2xl text-stone-800">No matching garments found</h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Try resetting your filters or search keywords to discover our broader Khan Market unstitched suits and couture catalog.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#dc6309] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 transition-colors hover:bg-[#b85207]"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCartDirect={onAddToCartDirect}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
