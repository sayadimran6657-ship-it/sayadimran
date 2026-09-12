import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  Utensils,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import { Restaurant, Reservation } from '../types';

interface ReservationModalProps {
  restaurant: Restaurant | null;
  allRestaurants: Restaurant[];
  onClose: () => void;
  onConfirmReservation: (res: Reservation) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  restaurant,
  allRestaurants,
  onClose,
  onConfirmReservation,
}) => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>(
    restaurant?.id || allRestaurants[0]?.id || ''
  );
  const [date, setDate] = useState('Tomorrow, Sept 14');
  const [time, setTime] = useState('7:30 PM');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<
    'Standard' | 'Outdoor Terrace' | 'Rooftop' | 'Chef Counter' | 'Quiet Booth'
  >('Standard');
  const [specialRequests, setSpecialRequests] = useState('');
  const [name, setName] = useState('Sayad Imran');
  const [email, setEmail] = useState('sayadimran6657@gmail.com');
  const [phone, setPhone] = useState('+1 (212) 555-8392');

  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const activeRest =
    allRestaurants.find((r) => r.id === selectedRestaurantId) || restaurant || allRestaurants[0];

  const timeSlots = [
    '5:30 PM',
    '6:00 PM',
    '6:30 PM',
    '7:00 PM',
    '7:30 PM',
    '8:00 PM',
    '8:30 PM',
    '9:00 PM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes: Reservation = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      restaurantId: activeRest.id,
      restaurantName: activeRest.name,
      restaurantImage: activeRest.image,
      restaurantAddress: activeRest.address,
      date,
      time,
      guests,
      seatingArea,
      specialRequests,
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      status: 'Confirmed',
      bookingCode: `DN-${activeRest.id.substring(0, 2).toUpperCase()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`,
      createdAt: 'Just now',
    };

    setConfirmedReservation(newRes);
    onConfirmReservation(newRes);
  };

  return (
    <div
      id="reservation-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="reservation-modal"
        className="relative w-full max-w-xl bg-[#FBF8F0] rounded-3xl shadow-2xl border border-[#DDD6C7] overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-[#102038] text-white p-6 sm:p-7 flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#596B27]/25 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C95718]">
              Verified Seating
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Reserve Your Table
            </h2>
            <p className="text-xs text-[#DDD6C7]">
              Instant confirmation with exclusive DineNest table perks
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {confirmedReservation ? (
            /* Success confirmation view */
            <div className="text-center py-6 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#596B27] text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#596B27]">
                  Booking Confirmed
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#102038] mt-1">
                  We Have Saved Your Table
                </h3>
                <p className="text-xs sm:text-sm text-[#68675F] max-w-md mx-auto mt-1">
                  Your table at <strong className="text-[#102038]">{confirmedReservation.restaurantName}</strong> has been secured for {confirmedReservation.guests} guests.
                </p>
              </div>

              {/* Digital Booking Pass */}
              <div className="p-5 bg-[#EDE5D5] rounded-2xl border-2 border-dashed border-[#DDD6C7] text-left max-w-md mx-auto space-y-3">
                <div className="flex items-center justify-between border-b border-[#DDD6C7] pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#68675F]">
                      Confirmation Code
                    </span>
                    <div className="font-mono text-base font-bold text-[#102038]">
                      {confirmedReservation.bookingCode}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#596B27] text-white text-[11px] font-bold">
                    Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[#68675F] block">Date & Time</span>
                    <span className="font-bold text-[#102038]">
                      {confirmedReservation.date} • {confirmedReservation.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#68675F] block">Seating Area</span>
                    <span className="font-bold text-[#102038]">
                      {confirmedReservation.seatingArea}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#68675F] block">Guest Name</span>
                    <span className="font-bold text-[#102038]">
                      {confirmedReservation.guestName}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#68675F] block">Party Size</span>
                    <span className="font-bold text-[#102038]">
                      {confirmedReservation.guests} Guests
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#68675F] border-t border-[#DDD6C7]">
                  <MapPin className="w-3.5 h-3.5 inline mr-1 text-[#596B27]" />
                  {confirmedReservation.restaurantAddress}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-[#102038] hover:bg-[#18202B] text-white text-xs font-bold transition-colors"
                >
                  Done & Back to Discover
                </button>
              </div>
            </div>
          ) : (
            /* Reservation Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Restaurant Selector */}
              <div>
                <label className="block text-xs font-bold text-[#102038] uppercase tracking-wider mb-1.5">
                  Select Restaurant
                </label>
                <select
                  value={selectedRestaurantId}
                  onChange={(e) => setSelectedRestaurantId(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#DDD6C7] text-sm font-semibold text-[#102038] focus:ring-2 focus:ring-[#596B27]"
                >
                  {allRestaurants.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} — {r.cuisine} ({r.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold text-[#102038] uppercase tracking-wider mb-1.5">
                  Dining Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {['Tonight', 'Tomorrow, Sept 14', 'Friday, Sept 18', 'Saturday, Sept 19'].map(
                    (d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDate(d)}
                        className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                          date === d
                            ? 'bg-[#102038] text-white border-[#102038] shadow-xs'
                            : 'bg-white text-[#18202B] border-[#DDD6C7] hover:bg-[#EDE5D5]'
                        }`}
                      >
                        {d}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold text-[#102038] uppercase tracking-wider mb-1.5">
                  Preferred Seating Time
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`p-2 rounded-xl border text-center font-medium transition-all ${
                        time === t
                          ? 'bg-[#C95718] text-white border-[#C95718] shadow-xs font-bold'
                          : 'bg-white text-[#18202B] border-[#DDD6C7] hover:bg-[#EDE5D5]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Party Size & Seating Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#102038] uppercase tracking-wider mb-1.5">
                    Party Size
                  </label>
                  <div className="flex items-center bg-white border border-[#DDD6C7] rounded-xl p-1">
                    {[1, 2, 4, 6, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuests(num)}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                          guests === num
                            ? 'bg-[#596B27] text-white'
                            : 'text-[#18202B] hover:bg-[#EDE5D5]'
                        }`}
                      >
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102038] uppercase tracking-wider mb-1.5">
                    Seating Area
                  </label>
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C7] text-xs font-semibold text-[#102038] focus:ring-2 focus:ring-[#596B27]"
                  >
                    <option value="Standard">Standard Main Dining</option>
                    <option value="Outdoor Terrace">Outdoor Terrace / Patio</option>
                    <option value="Rooftop">Rooftop Skyline Seating</option>
                    <option value="Chef Counter">Chef's Tasting Counter</option>
                    <option value="Quiet Booth">Quiet Romantic Booth</option>
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-3 pt-2 border-t border-[#DDD6C7]">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#68675F]">
                  Diner Contact
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#68675F] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C7] text-xs text-[#102038]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#68675F] mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C7] text-xs text-[#102038]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[#68675F] mb-1">
                    Special Requests (Optional: Anniversary, Birthday, Allergies)
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Quiet corner table, celebrating anniversary..."
                    className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C7] text-xs text-[#102038]"
                  />
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-3 bg-[#EDE5D5]/50 rounded-xl flex items-center gap-2 text-xs text-[#68675F]">
                <ShieldCheck className="w-4 h-4 text-[#596B27] shrink-0" />
                <span>Complimentary booking with zero deposit required for regular dining.</span>
              </div>

              {/* Submit CTA */}
              <button
                id="submit-reservation-btn"
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[#596B27] hover:bg-[#48571f] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Utensils className="w-4 h-4" />
                <span>Confirm Table Reservation</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
