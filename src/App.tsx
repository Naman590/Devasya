import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoriesGrid } from './components/CategoriesGrid';
import { StoreSpotlight } from './components/StoreSpotlight';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { AtelierJournal } from './components/AtelierJournal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { AppointmentModal } from './components/AppointmentModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/mockData';
import { Product, CurrencyCode, CartItem } from './types';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedSize: 'Unstitched (Fabric Only)',
      customStitching: true,
      quantity: 1,
    },
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[1]]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [appointmentStoreId, setAppointmentStoreId] = useState('khan-market');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart operations
  const handleAddToCart = (product: Product, size?: string, customStitching: boolean = false) => {
    const chosenSize = size || product.sizes[0] || 'Standard';
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === chosenSize && item.customStitching === customStitching
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          product,
          selectedSize: chosenSize,
          customStitching,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Scroll to section helper
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    handleScrollToSection('catalog-section');
  };

  const handleOpenAppointment = (storeId: string = 'khan-market') => {
    setAppointmentStoreId(storeId);
    setAppointmentOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c1917] font-sans selection:bg-[#dc6309] selection:text-white">
      {/* 1. Header with Ogaan-style navigation & Devasya Peacock Logo */}
      <Header
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenAppointment={() => handleOpenAppointment('khan-market')}
        onSelectCategory={handleSelectCategory}
        onScrollToSection={handleScrollToSection}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Main Hero Banner Carousel */}
      <HeroBanner
        onShopCollection={(cat) => handleSelectCategory(cat)}
        onExploreStore={() => handleScrollToSection('stores-section')}
        onBookAppointment={() => handleOpenAppointment('khan-market')}
      />

      {/* 3. Curated Silhouette Categories Grid */}
      <CategoriesGrid onSelectCategory={handleSelectCategory} />

      {/* 4. Product Catalog with Filters, Sort, Search, and Cards */}
      <ProductCatalog
        products={PRODUCTS}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        currency={currency}
        wishlistIds={wishlist.map((p) => p.id)}
        onToggleWishlist={handleToggleWishlist}
        onQuickView={(p) => setQuickViewProduct(p)}
        onAddToCartDirect={(p) => handleAddToCart(p)}
        searchQuery={searchQuery}
      />

      {/* 5. Khan Market Flagship Showcase (28A Khan Market, Google Maps link, phone, photos) */}
      <StoreSpotlight
        onBookAppointment={(storeId) => handleOpenAppointment(storeId || 'khan-market')}
      />

      {/* 6. Editorial Stories from Devasya Atelier */}
      <AtelierJournal />

      {/* 7. Comprehensive Luxury Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onBookAppointment={() => handleOpenAppointment('khan-market')}
      />

      {/* Modals & Slide-over Drawers */}
      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        currency={currency}
        isWishlisted={quickViewProduct ? wishlist.some((p) => p.id === quickViewProduct.id) : false}
        onClose={() => setQuickViewProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(product, size, customStitching) => {
          handleAddToCart(product, size, customStitching);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        currency={currency}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* Private Styling Appointment Modal */}
      <AppointmentModal
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        defaultStoreId={appointmentStoreId}
      />
    </div>
  );
}
