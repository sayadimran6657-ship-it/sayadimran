import React, { useState } from 'react';
import {
  Package,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Bike,
  RotateCcw,
  Receipt,
  Phone,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { Order, Reservation } from '../types';

interface OrdersViewProps {
  orders: Order[];
  reservations: Reservation[];
  onReorder: (order: Order) => void;
  onCancelReservation: (resId: string) => void;
  onExploreClick: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  reservations,
  onReorder,
  onCancelReservation,
  onExploreClick,
}) => {
  const [tab, setTab] = useState<'orders' | 'reservations'>('orders');

  return (
    <div id="orders-view" className="py-8 sm:py-12 bg-[#F7F1E5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#596B27]">
              Guest Activity
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#102038]">
              Your Orders & Bookings
            </h1>
            <p className="text-sm text-[#68675F]">
              Review live culinary deliveries, active table reservations, and past dining receipts.
            </p>
          </div>

          {/* Subtabs Switcher */}
          <div className="flex items-center p-1 bg-[#EDE5D5] rounded-2xl border border-[#DDD6C7] self-start sm:self-auto">
            <button
              onClick={() => setTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                tab === 'orders'
                  ? 'bg-[#102038] text-white shadow-xs'
                  : 'text-[#18202B] hover:text-[#102038]'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Food Deliveries ({orders.length})</span>
            </button>
            <button
              onClick={() => setTab('reservations')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                tab === 'reservations'
                  ? 'bg-[#102038] text-white shadow-xs'
                  : 'text-[#18202B] hover:text-[#102038]'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Table Bookings ({reservations.length})</span>
            </button>
          </div>
        </div>

        {tab === 'orders' ? (
          /* Deliveries Tab */
          <div className="space-y-6">
            {orders.map((order) => {
              const isActive = order.status === 'On the Way' || order.status === 'Preparing';

              return (
                <div
                  key={order.id}
                  className="bg-[#FBF8F0] rounded-3xl border border-[#DDD6C7] shadow-sm p-6 sm:p-8 space-y-6"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DDD6C7] gap-3">
                    <div className="flex items-center gap-4">
                      <img
                        src={order.restaurantImage}
                        alt={order.restaurantName}
                        className="w-14 h-14 rounded-2xl object-cover border border-[#DDD6C7]"
                      />
                      <div>
                        <span className="text-[11px] font-bold text-[#68675F] uppercase tracking-wider block">
                          Order #{order.id} • {order.createdAt}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-[#102038]">
                          {order.restaurantName}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isActive
                            ? 'bg-[#C95718]/15 text-[#C95718] animate-pulse'
                            : 'bg-[#596B27]/15 text-[#596B27]'
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="font-serif font-bold text-lg text-[#102038]">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Active Order Progress Stepper */}
                  {isActive && (
                    <div className="p-4 bg-[#EDE5D5]/50 rounded-2xl border border-[#DDD6C7] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#596B27] flex items-center gap-1">
                          <Bike className="w-4 h-4" />
                          Courier En Route • ETA {order.estimatedArrival}
                        </span>
                        <span className="text-[#68675F]">{order.deliveryAddress}</span>
                      </div>

                      {/* 4 stage bar */}
                      <div className="grid grid-cols-4 gap-2 pt-1">
                        {['Confirmed', 'Preparing', 'On the Way', 'Delivered'].map(
                          (stg, idx) => (
                            <div key={stg} className="space-y-1">
                              <div
                                className={`h-1.5 rounded-full ${
                                  idx <= (order.stepIndex || 2)
                                    ? 'bg-[#596B27]'
                                    : 'bg-[#DDD6C7]'
                                }`}
                              />
                              <span
                                className={`text-[10px] block truncate font-medium ${
                                  idx === (order.stepIndex || 2)
                                    ? 'text-[#C95718] font-bold'
                                    : 'text-[#68675F]'
                                }`}
                              >
                                {stg}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Items Ordered List */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#68675F] uppercase tracking-wider block">
                      Courses & Items ({order.items.length})
                    </span>
                    <div className="divide-y divide-[#DDD6C7]/50">
                      {order.items.map((item, idx) => (
                        <div
                          key={item.dishId || idx}
                          className="py-2.5 flex items-center justify-between text-xs sm:text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-[#EDE5D5] flex items-center justify-center font-bold text-xs text-[#102038]">
                              {item.quantity}x
                            </span>
                            <span className="font-medium text-[#18202B]">{item.name}</span>
                          </div>
                          <span className="font-bold text-[#102038]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-4 border-t border-[#DDD6C7] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-[#68675F]">
                      <Receipt className="w-4 h-4 text-[#596B27]" />
                      <span>Digital tax invoice sent to registered email</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Showing receipt for ${order.id}`)}
                        className="px-4 py-2 rounded-xl bg-white border border-[#DDD6C7] text-xs font-semibold text-[#102038] hover:bg-[#EDE5D5]"
                      >
                        View Receipt
                      </button>
                      <button
                        onClick={() => onReorder(order)}
                        className="px-4 py-2 rounded-xl bg-[#596B27] hover:bg-[#48571f] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Order Again</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table Reservations Tab */
          <div className="space-y-6">
            {reservations.length === 0 ? (
              <div className="text-center py-16 bg-[#FBF8F0] rounded-3xl border border-[#DDD6C7] p-8 space-y-4">
                <Calendar className="w-12 h-12 text-[#68675F] mx-auto" />
                <h3 className="font-serif text-2xl font-bold text-[#102038]">
                  No Upcoming Table Reservations
                </h3>
                <p className="text-xs sm:text-sm text-[#68675F] max-w-sm mx-auto">
                  Browse our curated restaurant collection to secure a table for tonight or upcoming weekends.
                </p>
                <button
                  onClick={onExploreClick}
                  className="px-6 py-3 rounded-xl bg-[#596B27] text-white font-bold text-xs"
                >
                  Explore Restaurants
                </button>
              </div>
            ) : (
              reservations.map((res) => (
                <div
                  key={res.id}
                  className="bg-[#FBF8F0] rounded-3xl border border-[#DDD6C7] shadow-sm p-6 sm:p-8 space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#DDD6C7] gap-3">
                    <div className="flex items-center gap-4">
                      <img
                        src={res.restaurantImage}
                        alt={res.restaurantName}
                        className="w-14 h-14 rounded-2xl object-cover border border-[#DDD6C7]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-[#596B27] uppercase tracking-wider">
                            Pass #{res.bookingCode}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-[#596B27]/15 text-[#596B27] text-[10px] font-bold">
                            {res.status}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-[#102038]">
                          {res.restaurantName}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm text-[#102038] block">{res.date}</span>
                      <span className="text-xs text-[#C95718] font-bold block">{res.time}</span>
                    </div>
                  </div>

                  {/* Seating Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#EDE5D5]/50 p-4 rounded-2xl border border-[#DDD6C7]">
                    <div>
                      <span className="text-[#68675F] block text-[10px] uppercase font-bold">Party Size</span>
                      <span className="font-bold text-[#102038]">{res.guests} Guests</span>
                    </div>
                    <div>
                      <span className="text-[#68675F] block text-[10px] uppercase font-bold">Area</span>
                      <span className="font-bold text-[#102038]">{res.seatingArea}</span>
                    </div>
                    <div>
                      <span className="text-[#68675F] block text-[10px] uppercase font-bold">Guest</span>
                      <span className="font-bold text-[#102038]">{res.guestName}</span>
                    </div>
                    <div>
                      <span className="text-[#68675F] block text-[10px] uppercase font-bold">Phone</span>
                      <span className="font-bold text-[#102038]">{res.guestPhone}</span>
                    </div>
                  </div>

                  {res.specialRequests && (
                    <div className="text-xs text-[#68675F] bg-white/70 p-3 rounded-xl border border-[#DDD6C7]">
                      <strong className="text-[#102038]">Special Note:</strong> {res.specialRequests}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#68675F]">
                      <MapPin className="w-4 h-4 text-[#596B27]" />
                      <span>{res.restaurantAddress}</span>
                    </div>

                    <button
                      onClick={() => onCancelReservation(res.id)}
                      className="text-xs font-semibold text-rose-700 hover:underline"
                    >
                      Cancel Reservation
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
