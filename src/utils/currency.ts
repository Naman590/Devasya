import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', rate: 1 },
  USD: { code: 'USD', symbol: '$', rate: 0.012 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.0094 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011 },
  AED: { code: 'AED', symbol: 'AED ', rate: 0.044 },
};

export function formatPrice(amountINR: number, currency: CurrencyCode = 'INR'): string {
  const config = CURRENCIES[currency] || CURRENCIES.INR;
  const converted = Math.round(amountINR * config.rate);
  
  if (currency === 'INR') {
    return `${config.symbol}${converted.toLocaleString('en-IN')}`;
  }
  return `${config.symbol}${converted.toLocaleString('en-US')}`;
}
