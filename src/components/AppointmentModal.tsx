import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  Phone,
  Scissors
} from 'lucide-react';
import { STORE_LOCATIONS } from '../data/mockData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStoreId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  defaultStoreId = 'khan-market',
}) => {
  const [storeId, setStoreId] = useState(defaultStoreId);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:30 AM - 1:00 PM');
  const [serviceType, setServiceType] = useState('Bespoke Bridal & Trousseau');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3500);
  };

  const selectedStore =
    STORE_LOCATIONS.find((s) => s.id === storeId) || STORE_LOCATIONS[0];

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto border border-stone-200 shadow-2xl z-10 text-left p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl text-stone-900">
              Your Private Session Is Confirmed
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              We look forward to welcoming you to <strong>{selectedStore.name}</strong> ({selectedStore.address}) on <strong>{date || 'your selected date'}</strong> at <strong>{timeSlot}</strong>.
            </p>
            <div className="p-4 bg-stone-50 border border-stone-200 text-xs text-stone-700 max-w-sm mx-auto text-left space-y-1">
              <p><strong>Boutique Contact:</strong> +91 92115 11126</p>
              <p><strong>Service:</strong> {serviceType}</p>
              <p><strong>Store Timings:</strong> 9:30 AM – 6:30 PM</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] font-bold text-[#dc6309] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized Atelier Experience</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl text-stone-900 mb-2">
              Book a Khan Market Styling Session
            </h2>

            <p className="text-xs text-stone-500 font-light mb-6">
              Enjoy one-on-one time with our master couturiers to explore custom fabrics, bridal trousseau, and bespoke stitching at 28A Khan Market.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Boutique Selection */}
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Select Boutique</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {STORE_LOCATIONS.map((loc) => (
                    <button
                      type="button"
                      key={loc.id}
                      onClick={() => setStoreId(loc.id)}
                      className={`p-2.5 text-left border transition-all ${
                        storeId === loc.id
                          ? 'border-[#dc6309] bg-[#dc6309]/5 text-stone-900 font-semibold'
                          : 'border-stone-200 text-stone-600 hover:border-stone-300'
                      }`}
                    >
                      <p className="font-bold text-[11px]">{loc.area}</p>
                      <p className="text-[10px] text-stone-400 truncate">{loc.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Consultation Type */}
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Consultation Focus</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-none bg-white focus:outline-none focus:border-[#dc6309]"
                >
                  <option value="Bespoke Bridal & Trousseau">Bespoke Bridal & Trousseau Consultation</option>
                  <option value="Unstitched Suits Selection & Tailoring">Unstitched Suits Selection & Master Tailoring</option>
                  <option value="Festive Kurta Sets & Pret">Festive Kurta Sets & Ready-to-wear</option>
                  <option value="Fabric Swatches & Custom Dyeing">Fabric Swatches & Custom Dyeing</option>
                </select>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Radhika Singhania"
                    className="w-full p-2.5 border border-stone-300 rounded-none focus:outline-none focus:border-[#dc6309]"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">WhatsApp Mobile (+91)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 92115 XXXXX"
                    className="w-full p-2.5 border border-stone-300 rounded-none focus:outline-none focus:border-[#dc6309]"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-none focus:outline-none focus:border-[#dc6309]"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Preferred Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-none bg-white focus:outline-none focus:border-[#dc6309]"
                  >
                    <option>10:00 AM - 11:30 AM</option>
                    <option>11:30 AM - 1:00 PM</option>
                    <option>2:00 PM - 3:30 PM</option>
                    <option>3:30 PM - 5:00 PM</option>
                    <option>5:00 PM - 6:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Specific Design Requests / Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about the upcoming occasion (wedding, mehendi, pooja, etc.)..."
                  className="w-full p-2.5 border border-stone-300 rounded-none focus:outline-none focus:border-[#dc6309]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#dc6309] hover:bg-[#b85207] text-white py-3.5 font-semibold uppercase tracking-widest transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Khan Market Appointment</span>
                </button>
              </div>

              <div className="text-center text-[11px] text-stone-400">
                You will receive confirmation and location pinned map via WhatsApp from our Khan Market concierge.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
