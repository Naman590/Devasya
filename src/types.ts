export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'EUR' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to INR
}

export interface Product {
  id: string;
  title: string;
  collection: string;
  category: 'Kurta Sets' | 'Unstitched Suits' | 'Sarees' | 'Lehengas' | 'Anarkalis' | 'Trousseau';
  fabric: 'Organza Silk' | 'Chanderi' | 'Raw Silk' | 'Georgette' | 'Tissue' | 'Banarasi Silk' | 'Velvet';
  embroidery: 'Zardozi' | 'Gota Patti' | 'Kashmiri Tilla' | 'Aari Work' | 'Threadwork & Sequins' | 'Handloom Weave';
  occasion: 'Festive' | 'Wedding' | 'Cocktail' | 'Pooja & Rituals' | 'Evening Trousseau';
  priceINR: number;
  originalPriceINR?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isReadyToShip?: boolean;
  isKhanMarketExclusive?: boolean;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
  craftDetails: string;
  careInstructions: string;
  deliveryTime: string;
  inStock: boolean;
}

export interface StoreLocation {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  phone: string;
  email: string;
  timing: string;
  mapUrl: string;
  isFlagship?: boolean;
  image: string;
  highlights: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  customStitching: boolean;
  quantity: number;
}

export interface AppointmentData {
  fullName: string;
  phone: string;
  email: string;
  storeId: string;
  date: string;
  timeSlot: string;
  occasionType: string;
  guestCount: number;
  notes?: string;
}
