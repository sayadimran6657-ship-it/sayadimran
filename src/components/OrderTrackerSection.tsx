import React, { useState } from 'react';
import {
  CheckCircle2,
  ChefHat,
  Bike,
  Home,
  Clock,
  MapPin,
  ArrowRight,
  Phone,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { Order } from '../types';

interface OrderTrackerSectionProps {
  currentOrder: Order;
  onViewAllOrders: () => void;
  onContactDriver?: () => void;
}

export const OrderTrackerSection: React.FC<OrderTrackerSectionProps> = ({
  currentOrder,
  onViewAllOrders,
  onContactDriver,
}) => {
  // Stage simulation for demo
  const [activeStep, setActiveStep] = useState<number>(currentOrder.stepIndex || 2);

  const stages = [
    { label: 'Confirmed', icon: CheckCircle2, desc: 'Kitchen received order' },
    { label: 'Preparing', icon: ChefHat, desc: 'Cooking by master chef' },
    { label: 'On the Way', icon: Bike, desc: 'Courier on electric scooter' },
    { label: 'Delivered', icon: Home, desc: 'Enjoy your meal' },
  ];

  return (
    <section id="order-tracking-section" className="py-14 sm:py-20 bg-[#EDE5D5]/60 border-t border-[#DDD6C7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#596B27]">
              <Bike className="w-4 h-4" />
              <span>Real-Time Gastronomy Courier</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102038] mt-1">
              Your Order Is On The Way
            </h2>
            <p className="text-sm sm:text-base text-[#68675F] max-w-xl mt-1">
              Fresh from the kitchen, heading straight to you in temperature-controlled thermal containers.
            </p>
          </div>

          <button
            id="track-view-all-orders-btn"
            onClick={onViewAllOrders}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1 text-sm font-bold text-[#102038] hover:text-[#596B27] transition-colors"
          >
            <span>View All Orders ({currentOrder.id})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tracker Container */}
        <div className="bg-[#FBF8F0] rounded-3xl border border-[#DDD6C7] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Panel: 4-Stage Progress & Order Details (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#DDD6C7]">
            <div>
              {/* Order ID & Restaurant */}
              <div className="flex items-center justify-between pb-4 border-b border-[#DDD6C7]">
                <div className="flex items-center gap-3">
                  <img
                    src={currentOrder.restaurantImage}
                    alt={currentOrder.restaurantName}
                    className="w-12 h-12 rounded-xl object-cover border border-[#DDD6C7]"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#102038] leading-tight">
                      {currentOrder.restaurantName}
                    </h3>
                    <span className="text-xs text-[#68675F]">
                      Order #{currentOrder.id} • 3 Items
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-[#596B27]/15 text-[#596B27] text-xs font-bold uppercase tracking-wider">
                  {stages[activeStep].label}
                </span>
              </div>

              {/* 4 Stages Vertical Stepper */}
              <div className="py-6 space-y-6 relative">
                {/* Connecting vertical background line */}
                <div className="absolute top-8 bottom-8 left-5 w-0.5 bg-[#DDD6C7] -translate-x-1/2" />
                {/* Active progress colored vertical line */}
                <div
                  className="absolute top-8 left-5 w-0.5 bg-[#596B27] -translate-x-1/2 transition-all duration-500"
                  style={{ height: `${(activeStep / (stages.length - 1)) * 75}%` }}
                />

                {stages.map((stg, idx) => {
                  const Icon = stg.icon;
                  const isPassed = idx <= activeStep;
                  const isCurrent = idx === activeStep;

                  return (
                    <div
                      key={stg.label}
                      onClick={() => setActiveStep(idx)}
                      className="flex items-start gap-4 relative z-10 cursor-pointer group"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCurrent
                            ? 'bg-[#C95718] text-white ring-4 ring-[#C95718]/20 shadow-md scale-105'
                            : isPassed
                            ? 'bg-[#596B27] text-white shadow-xs'
                            : 'bg-[#EDE5D5] text-[#68675F] group-hover:bg-[#DDD6C7]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="pt-0.5">
                        <div
                          className={`text-sm font-bold transition-colors ${
                            isCurrent
                              ? 'text-[#C95718]'
                              : isPassed
                              ? 'text-[#102038]'
                              : 'text-[#68675F]'
                          }`}
                        >
                          {stg.label}
                        </div>
                        <div className="text-xs text-[#68675F] mt-0.5">{stg.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Courier details */}
              <div className="p-4 bg-[#EDE5D5]/60 rounded-2xl border border-[#DDD6C7] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#68675F] tracking-wider block">
                      Assigned Courier
                    </span>
                    <span className="text-xs font-bold text-[#102038]">
                      {currentOrder.driverName || 'Marco Bellini (Electric Scooter #12)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert('Calling driver: +1 (212) 555-0198')}
                      className="p-2 rounded-xl bg-white text-[#102038] hover:bg-[#596B27] hover:text-white transition-colors shadow-xs"
                      title="Call Courier"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => alert('Sending direct message to courier...')}
                      className="p-2 rounded-xl bg-white text-[#102038] hover:bg-[#596B27] hover:text-white transition-colors shadow-xs"
                      title="Message Courier"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#68675F] pt-1 border-t border-[#DDD6C7]/50">
                  <ShieldCheck className="w-4 h-4 text-[#596B27]" />
                  <span>Sealed sanitary lock verified prior to departure</span>
                </div>
              </div>
            </div>

            {/* View Full Tracker CTA */}
            <button
              id="live-tracker-button"
              onClick={onViewAllOrders}
              className="w-full py-3.5 px-4 rounded-xl bg-[#596B27] hover:bg-[#48571f] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <span>Track Live Order →</span>
            </button>
          </div>

          {/* Right Panel: Simplified Illustrated Interactive Map (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[440px] bg-[#EDE5D5] p-6 flex flex-col justify-between overflow-hidden">
            {/* Styled Map Background Grid & Vector Roads */}
            <div className="absolute inset-0 opacity-40">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DDD6C7" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />

                {/* Abstract City Streets & Park Polygons */}
                <rect x="40" y="80" width="160" height="90" rx="12" fill="#D9E2CC" opacity="0.6" />
                <rect x="360" y="160" width="180" height="110" rx="16" fill="#D9E2CC" opacity="0.6" />

                {/* Water canal / river curve */}
                <path
                  d="M0 380 Q 200 320 400 350 T 800 280"
                  fill="none"
                  stroke="#C0D3E5"
                  strokeWidth="28"
                  strokeLinecap="round"
                />

                {/* Avenue Roads */}
                <path d="M50 40 L650 360" stroke="#FFF" strokeWidth="14" strokeLinecap="round" />
                <path d="M50 320 L550 80" stroke="#FFF" strokeWidth="12" strokeLinecap="round" />
                <path d="M180 30 L220 420" stroke="#FFF" strokeWidth="10" strokeLinecap="round" />
                <path d="M420 20 L380 430" stroke="#FFF" strokeWidth="10" strokeLinecap="round" />
              </svg>
            </div>

            {/* Dynamic Animated Delivery Route SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 700 450"
              preserveAspectRatio="none"
            >
              {/* Route shadow */}
              <path
                d="M 120 120 Q 260 160 380 240 T 560 320"
                fill="none"
                stroke="#102038"
                strokeWidth="6"
                strokeOpacity="0.15"
                strokeLinecap="round"
              />
              {/* Route line */}
              <path
                d="M 120 120 Q 260 160 380 240 T 560 320"
                fill="none"
                stroke="#596B27"
                strokeWidth="4"
                strokeDasharray="8 6"
                strokeLinecap="round"
                className="animate-[dash_20s_linear_infinite]"
              />
            </svg>

            {/* Top Overlay: Live ETA Floating Card */}
            <div className="relative z-20 flex items-center justify-between">
              <div className="bg-[#102038]/90 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 shadow-lg flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#C95718] flex items-center justify-center text-white">
                  <Clock className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#DDD6C7] font-semibold">
                    Estimated Arrival
                  </div>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-white">
                    18 min
                  </div>
                  <div className="text-[11px] text-[#DDD6C7]">
                    2.4 km away • En Route
                  </div>
                </div>
              </div>

              {/* Stage simulation switcher */}
              <div className="hidden sm:flex items-center gap-1 bg-white/90 backdrop-blur-md p-1 rounded-xl border border-[#DDD6C7] shadow-sm text-[11px] font-semibold">
                <span className="text-[#68675F] px-2">Simulation:</span>
                {[0, 1, 2, 3].map((step) => (
                  <button
                    key={step}
                    onClick={() => setActiveStep(step)}
                    className={`px-2 py-1 rounded-lg transition-colors ${
                      activeStep === step
                        ? 'bg-[#102038] text-white'
                        : 'text-[#18202B] hover:bg-[#EDE5D5]'
                    }`}
                  >
                    Step {step + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Illustrated Map Markers */}
            <div className="relative z-20 my-auto h-48">
              {/* Marker 1: Restaurant Origin (Left) */}
              <div className="absolute top-4 left-6 sm:left-14 flex items-center gap-2">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#102038] text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <ChefHat className="w-5 h-5 text-[#EDE5D5]" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#596B27] border-2 border-white" />
                </div>
                <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#DDD6C7] shadow-xs">
                  <div className="text-[10px] font-bold text-[#68675F] uppercase">Origin Kitchen</div>
                  <div className="text-xs font-bold text-[#102038]">{currentOrder.restaurantName}</div>
                </div>
              </div>

              {/* Marker 2: Courier in Motion (Middle) */}
              <div
                className="absolute transition-all duration-700 ease-out"
                style={{
                  top: activeStep === 0 ? '16%' : activeStep === 1 ? '30%' : activeStep === 2 ? '55%' : '80%',
                  left: activeStep === 0 ? '16%' : activeStep === 1 ? '32%' : activeStep === 2 ? '52%' : '78%',
                }}
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-[#C95718] text-white flex items-center justify-center shadow-xl border-2 border-white animate-bounce">
                    <Bike className="w-6 h-6" />
                  </div>
                  <span className="mt-1 px-2 py-0.5 bg-[#102038] text-white text-[10px] font-bold rounded-md whitespace-nowrap shadow-sm">
                    Courier En Route
                  </span>
                </div>
              </div>

              {/* Marker 3: Home Destination (Right) */}
              <div className="absolute bottom-2 right-4 sm:right-12 flex items-center gap-2">
                <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#DDD6C7] shadow-xs text-right">
                  <div className="text-[10px] font-bold text-[#68675F] uppercase">Destination</div>
                  <div className="text-xs font-bold text-[#102038]">424 West Broadway, SoHo</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#596B27] text-white flex items-center justify-center shadow-lg border-2 border-white">
                  <Home className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Bottom Overlay: Delivery address pin */}
            <div className="relative z-20 flex items-center justify-between bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#DDD6C7] shadow-sm text-xs">
              <div className="flex items-center gap-2 text-[#18202B]">
                <MapPin className="w-4 h-4 text-[#C95718] shrink-0" />
                <span className="font-medium truncate max-w-sm sm:max-w-md">
                  Delivering to: {currentOrder.deliveryAddress}
                </span>
              </div>

              <span className="text-[11px] font-bold text-[#596B27] whitespace-nowrap hidden sm:inline">
                Live GPS Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
