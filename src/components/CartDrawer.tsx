import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { MenuItem, Order } from '../types';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  onCheckout: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const [deliveryNote, setDeliveryNote] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 50 ? 0 : 4.5;
  const taxes = subtotal * 0.08875;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee + taxes);

  const handleApplyPromo = () => {
    if (promoInput.trim().toUpperCase() === 'WEEKEND20' || promoInput.trim().toUpperCase() === 'DINENEST15') {
      const disc = subtotal * 0.15;
      setDiscountAmount(disc);
    } else {
      alert('Invalid promo code. Try "WEEKEND20" or "DINENEST15"');
    }
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      restaurantId: cartItems[0].restaurantId || 'ember-and-olive',
      restaurantName: cartItems[0].restaurantName || 'Ember & Olive',
      restaurantImage: cartItems[0].image,
      items: cartItems.map((i) => ({
        dishId: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
      })),
      subtotal,
      deliveryFee,
      tax: taxes,
      total,
      status: 'Preparing',
      stepIndex: 1,
      estimatedArrival: '28-35 mins',
      deliveryAddress: '424 West Broadway, Apt 4B, SoHo, NY',
      createdAt: 'Just now',
      driverName: 'Matteo Bellini (Electric Scooter #14)',
    };

    onCheckout(newOrder);
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div
        id="cart-drawer"
        className="w-full max-w-md bg-[#FBF8F0] h-full shadow-2xl flex flex-col justify-between border-l border-[#DDD6C7] animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-6 bg-[#102038] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C95718]" />
            <div>
              <h2 className="font-serif font-bold text-lg">Your Dining Bag</h2>
              <span className="text-[11px] text-[#DDD6C7]">
                {cartItems.length} courses selected
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#68675F] mx-auto opacity-50" />
              <h3 className="font-serif text-lg font-bold text-[#102038]">
                Your Bag Is Currently Empty
              </h3>
              <p className="text-xs text-[#68675F] max-w-xs mx-auto">
                Explore signature dishes or open restaurant menus to add courses for delivery.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-white rounded-2xl border border-[#DDD6C7] flex items-center gap-3 shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#DDD6C7]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#102038] truncate">
                      {item.name}
                    </h4>
                    <span className="text-xs font-bold text-[#C95718] block mt-0.5">
                      ${item.price} each
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-[#EDE5D5] rounded-xl p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-white text-[#102038] flex items-center justify-center hover:bg-[#DDD6C7] transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-[#102038] px-1.5">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-white text-[#102038] flex items-center justify-center hover:bg-[#DDD6C7] transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Promo code input */}
              <div className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter Promo (e.g. WEEKEND20)"
                    className="flex-1 p-2.5 rounded-xl bg-white border border-[#DDD6C7] text-xs uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3.5 py-2.5 rounded-xl bg-[#596B27] text-white text-xs font-bold hover:bg-[#48571f]"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Special dietary instructions */}
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-[#68675F] uppercase mb-1">
                  Kitchen Notes / Delivery Instructions
                </label>
                <textarea
                  rows={2}
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="e.g. Extra napkins, gate code #4412..."
                  className="w-full p-2.5 rounded-xl bg-white border border-[#DDD6C7] text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Place Order */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t border-[#DDD6C7] space-y-4">
            <div className="space-y-1.5 text-xs text-[#68675F]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#102038]">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#596B27] font-semibold">
                  <span>Promo Discount (15%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Thermal Delivery</span>
                <span>{deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes (NYC)</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#DDD6C7] flex justify-between font-serif text-base sm:text-lg font-bold text-[#102038]">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#68675F]">
              <ShieldCheck className="w-4 h-4 text-[#596B27] shrink-0" />
              <span>Insulated temperature guarantee • Direct courier dispatch</span>
            </div>

            <button
              id="cart-checkout-btn"
              onClick={handlePlaceOrder}
              className="w-full py-3.5 px-4 rounded-xl bg-[#C95718] hover:bg-[#b04a13] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Place Order • ${total.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
