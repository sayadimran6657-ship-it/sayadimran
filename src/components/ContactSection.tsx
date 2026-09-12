import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Building2,
  HelpCircle,
} from 'lucide-react';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiries & Bookings',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onShowToast('Message received. Our hospitality concierge will respond within 2 hours.');
  };

  const faqs = [
    {
      q: 'How does table reservation confirmation work on DineNest?',
      a: 'All reservations made through DineNest are instantly confirmed directly with the restaurant management system. You will receive an immediate digital booking voucher and SMS confirmation. No booking deposit is required for regular dining.',
    },
    {
      q: 'Can I modify or cancel a reservation without penalty?',
      a: 'Yes, cancellations or time modifications made up to 2 hours before your scheduled dining slot are 100% free of penalty. You can manage your bookings directly inside the Orders & Bookings tab.',
    },
    {
      q: 'How do restaurants partner with DineNest?',
      a: 'We welcome independent culinary houses, wood-fired hearths, and chef-driven dining rooms. Select "Restaurant Partnership" in our contact form or contact partner@dinenest.com to arrange a tasting and onboarding visit with our culinary curation board.',
    },
    {
      q: 'What is the DineNest temperature-controlled courier promise?',
      a: 'All deliveries dispatched through DineNest originate from our partner kitchens and travel in sealed thermal induction cases, ensuring delicate sauces and crisp textures arrive exactly as the chef intended.',
    },
  ];

  return (
    <div id="contact-section" className="py-12 sm:py-16 bg-[#F7F1E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#596B27]">
            Concierge & Partnerships
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#102038] mt-1">
            Let's Talk Hospitality
          </h1>
          <p className="text-sm sm:text-base text-[#68675F] mt-2">
            Whether you need bespoke private dining arrangements, assistance with an order, or want to join our kitchen collective.
          </p>
        </div>

        {/* 4 Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'Concierge Phone',
              desc: '+1 (212) 555-0199',
              sub: 'Available 24/7 for active reservations',
              icon: Phone,
            },
            {
              title: 'Concierge Email',
              desc: 'concierge@dinenest.com',
              sub: 'Average response under 15 minutes',
              icon: Mail,
            },
            {
              title: 'Curation Office',
              desc: '480 Broadway, SoHo',
              sub: 'New York, NY 10013',
              icon: MapPin,
            },
            {
              title: 'Kitchen Partnerships',
              desc: 'partners@dinenest.com',
              sub: 'Join our verified culinary roster',
              icon: Building2,
            },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="bg-[#FBF8F0] p-5 rounded-2xl border border-[#DDD6C7] space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EDE5D5] flex items-center justify-center text-[#596B27]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-bold text-sm text-[#102038]">{c.title}</div>
                <div className="text-xs font-semibold text-[#C95718]">{c.desc}</div>
                <div className="text-[11px] text-[#68675F]">{c.sub}</div>
              </div>
            );
          })}
        </div>

        {/* Form and FAQ 2-Col Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#FBF8F0] p-6 sm:p-8 rounded-3xl border border-[#DDD6C7] shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-[#102038] mb-1">
              Send Concierge a Message
            </h3>
            <p className="text-xs text-[#68675F] mb-6">
              Our hospitality team handles special party requests, dietary briefings, and corporate accounts.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#596B27]/20 border border-[#596B27] rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#596B27] mx-auto" />
                <h4 className="font-serif text-xl font-bold text-[#102038]">
                  Thank You For Reaching Out
                </h4>
                <p className="text-xs text-[#68675F]">
                  We have logged inquiry #{Math.floor(10000 + Math.random() * 90000)}. An epicurean concierge will follow up promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-[#596B27] underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#102038] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sayad Imran"
                      className="w-full p-3 rounded-xl bg-white border border-[#DDD6C7] text-xs text-[#102038]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#102038] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sayad@example.com"
                      className="w-full p-3 rounded-xl bg-white border border-[#DDD6C7] text-xs text-[#102038]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102038] mb-1">
                    Subject of Inquiry
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white border border-[#DDD6C7] text-xs font-semibold text-[#102038]"
                  >
                    <option value="General Inquiries & Bookings">General Inquiries & Bookings</option>
                    <option value="Restaurant Partnership">Restaurant Partnership & Listing</option>
                    <option value="Private Dining & VIP Concierge">Private Dining & VIP Concierge</option>
                    <option value="Press & Media Relations">Press & Media Relations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#102038] mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your dining occasion, restaurant details, or questions..."
                    className="w-full p-3 rounded-xl bg-white border border-[#DDD6C7] text-xs text-[#102038]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#596B27] hover:bg-[#48571f] text-white font-bold text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>

          {/* FAQ Accordion (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#596B27] uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>

            <div className="space-y-3">
              {faqs.map((f, idx) => (
                <div
                  key={f.q}
                  className="bg-[#FBF8F0] rounded-2xl border border-[#DDD6C7] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between font-serif font-bold text-sm sm:text-base text-[#102038] hover:text-[#596B27] transition-colors"
                  >
                    <span>{f.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#68675F] shrink-0 transition-transform ${
                        activeFaq === idx ? 'rotate-180 text-[#C95718]' : ''
                      }`}
                    />
                  </button>

                  {activeFaq === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#68675F] leading-relaxed border-t border-[#DDD6C7]/40 bg-[#EDE5D5]/30">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
