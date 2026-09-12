import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Gift,
  Tag,
  Truck,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { CartItem, CurrencyCode } from '../types';
import { formatPrice } from '../utils/currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: CurrencyCode;
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  // Pricing calculations
  const subtotalINR = cartItems.reduce((acc, item) => {
    const itemBasePrice = item.product.priceINR + (item.customStitching ? 2500 : 0);
    return acc + itemBasePrice * item.quantity;
  }, 0);

  const discountINR = discountApplied ? Math.round(subtotalINR * 0.1) : 0;
  const giftWrapINR = giftWrap ? 500 : 0;
  const finalTotalINR = Math.max(0, subtotalINR - discountINR + giftWrapINR);

  // Free shipping threshold (e.g. ₹35,000)
  const freeShippingThreshold = 35000;
  const freeShippingProgress = Math.min(100, (subtotalINR / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'DEVASYA10' || promoCode.trim().toUpperCase() === 'KHANMARKET') {
      setDiscountApplied(true);
    } else {
      alert('Invalid promo code. Use code "DEVASYA10" for 10% off!');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
      setOrderComplete(false);
      setCheckoutModalOpen(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative bg-[#faf8f5] w-full max-w-md h-full shadow-2xl flex flex-col z-10 text-stone-900 border-l border-stone-200 animate-slideLeft">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#dc6309]" />
            <h2 className="font-display text-xl font-medium tracking-tight">
              Shopping Bag ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-stone-100 px-4 py-2.5 border-b border-stone-200 text-xs">
          <div className="flex items-center justify-between text-stone-600 mb-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#dc6309]" />
              {subtotalINR >= freeShippingThreshold ? (
                <span className="text-emerald-700 font-semibold">You unlocked Free Worldwide Express Shipping!</span>
              ) : (
                <span>
                  Add {formatPrice(freeShippingThreshold - subtotalINR, currency)} more for Free Express Shipping
                </span>
              )}
            </span>
          </div>
          <div className="w-full bg-stone-300 h-1 rounded-full overflow-hidden">
            <div
              className="bg-[#dc6309] h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-200/70 flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display text-xl text-stone-800">Your bag is currently empty</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs">
                  Explore our Khan Market collection of handcrafted unstitched suits, festive kurta sets, and bridal trousseau.
                </p>
              </div>
              <button
                onClick={onClose}
                className="bg-[#dc6309] hover:bg-[#b85207] text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 transition-colors shadow-sm"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white p-3 border border-stone-200 flex gap-3 relative shadow-xs"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-28 bg-stone-100 shrink-0 overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between text-left text-xs">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#dc6309]">
                        {item.product.collection}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 className="font-display text-sm font-medium text-stone-900 leading-snug line-clamp-2 mt-0.5">
                      {item.product.title}
                    </h4>

                    <div className="mt-1 space-y-0.5 text-[11px] text-stone-500">
                      <p>
                        Option: <span className="font-medium text-stone-700">{item.selectedSize}</span>
                      </p>
                      {item.customStitching && (
                        <p className="text-[#dc6309] font-medium">
                          + Khan Market Custom Tailoring
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <div className="flex items-center border border-stone-300 bg-stone-50">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-stone-200 text-stone-700 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 font-semibold text-stone-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-stone-200 text-stone-700 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-semibold text-stone-900 text-sm">
                      {formatPrice(
                        (item.product.priceINR + (item.customStitching ? 2500 : 0)) * item.quantity,
                        currency
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="bg-white p-4 border-t border-stone-200 space-y-3">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo (try: DEVASYA10)"
                  className="w-full pl-8 pr-2 py-1.5 text-xs border border-stone-300 rounded-none focus:outline-none focus:border-[#dc6309] uppercase"
                />
              </div>
              <button
                type="submit"
                className="bg-stone-800 hover:bg-stone-900 text-white text-xs px-3 py-1.5 font-semibold uppercase tracking-wider transition-colors"
              >
                Apply
              </button>
            </form>

            {discountApplied && (
              <div className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200 flex items-center justify-between">
                <span>DEVASYA10 voucher applied (10% Off)</span>
                <span className="font-semibold">-{formatPrice(discountINR, currency)}</span>
              </div>
            )}

            {/* Gift Box Toggle */}
            <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="accent-[#dc6309]"
              />
              <Gift className="w-3.5 h-3.5 text-[#dc6309]" />
              <span>Devasya Heritage Trousseau Gift Packaging (+ {formatPrice(500, currency)})</span>
            </label>

            {/* Totals Breakdown */}
            <div className="pt-2 border-t border-stone-100 space-y-1 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotalINR, currency)}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-700">
                  <span>Festive Privilege Discount</span>
                  <span>-{formatPrice(discountINR, currency)}</span>
                </div>
              )}
              {giftWrap && (
                <div className="flex justify-between text-stone-600">
                  <span>Trousseau Box</span>
                  <span>{formatPrice(giftWrapINR, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Express Insured Shipping</span>
                <span className="text-emerald-700 font-medium">
                  {subtotalINR >= freeShippingThreshold ? 'FREE' : formatPrice(1200, currency)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-stone-900 pt-1.5 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-base text-[#dc6309] font-bold">
                  {formatPrice(finalTotalINR, currency)}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => setCheckoutModalOpen(true)}
              className="w-full bg-[#dc6309] hover:bg-[#b85207] text-white py-3.5 text-xs uppercase font-semibold tracking-widest flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Khan Market Concierge Support */}
            <div className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-2">
              <Phone className="w-3 h-3 text-[#dc6309]" />
              <span>Khan Market Store Assistance: </span>
              <a href="tel:+919211511126" className="text-stone-900 font-semibold hover:underline">
                +91 92115 11126
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal Simulation */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setCheckoutModalOpen(false)}
          />
          <div className="relative bg-white w-full max-w-lg p-6 sm:p-8 border border-stone-200 shadow-2xl z-10 text-left">
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display text-2xl text-stone-900">Thank You For Your Order!</h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto">
                  Your order has been routed directly to our <strong>Devasya Khan Market Flagship Atelier</strong>. Our stylist team will reach out via WhatsApp with tracking & dispatch details.
                </p>
                <div className="p-3 bg-stone-50 border border-stone-200 text-xs text-stone-600 text-left">
                  <p className="font-semibold text-stone-800">Order ID: #DEV-2026-{Math.floor(1000 + Math.random() * 9000)}</p>
                  <p>Store: 28A Khan Market, New Delhi</p>
                  <p>Support: +91 92115 11126</p>
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#dc6309] font-bold block mb-1">
                  Devasya Atelier Checkout
                </span>
                <h3 className="font-display text-2xl text-stone-900 mb-4">
                  Complete Your Order ({formatPrice(finalTotalINR, currency)})
                </h3>

                <form onSubmit={handlePlaceOrder} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Aditi Sharma"
                        className="w-full p-2 border border-stone-300 rounded-none focus:outline-none focus:border-[#dc6309]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1">WhatsApp Phone (+91)</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98110 XXXXX"
                        className="w-full p-2 border border-stone-300 rounded-none focus:outline-none focus:border-[#dc6309]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="aditi@example.com"
                      className="w-full p-2 border border-stone-300 rounded-none focus:outline-none focus:border-[#dc6309]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1">Delivery Address</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="House/Apartment, Street, City, Pincode"
                      className="w-full p-2 border border-stone-300 rounded-none focus:outline-none focus:border-[#dc6309]"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="block text-stone-600 mb-1">Payment Method</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className="flex items-center gap-2 p-2.5 border border-[#dc6309] bg-[#dc6309]/5 cursor-pointer">
                        <input type="radio" name="payMethod" defaultChecked className="accent-[#dc6309]" />
                        <span className="font-medium">UPI / Net Banking / Card</span>
                      </label>
                      <label className="flex items-center gap-2 p-2.5 border border-stone-200 cursor-pointer">
                        <input type="radio" name="payMethod" className="accent-[#dc6309]" />
                        <span className="font-medium">Pay on Delivery / Pickup at Khan Market</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full bg-[#dc6309] hover:bg-[#b85207] text-white py-3 font-semibold uppercase tracking-widest transition-colors shadow-md"
                    >
                      Confirm Order • {formatPrice(finalTotalINR, currency)}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
