import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section id="newsletter-section" className="py-14 sm:py-20 bg-[#EDE5D5]/70 border-t border-[#DDD6C7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#102038] text-[#F7F1E5] rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl border border-white/10">
          {/* Ambient decorative glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#596B27]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#C95718]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#EDE5D5] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#C95718]" />
              <span>Weekly Gastronomic Gazette</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              Get More Delicious Ideas
            </h2>

            <p className="text-sm sm:text-base text-[#DDD6C7] font-normal leading-relaxed">
              Discover new restaurants, exclusive offers and food inspiration delivered to your inbox every Thursday afternoon.
            </p>

            {submitted ? (
              <div className="p-6 bg-[#596B27]/30 border border-[#596B27] rounded-2xl animate-in zoom-in-95 duration-300">
                <CheckCircle2 className="w-8 h-8 text-[#EDE5D5] mx-auto mb-2" />
                <h3 className="font-serif text-lg font-bold text-white">
                  Welcome to DineNest Club
                </h3>
                <p className="text-xs text-[#DDD6C7] mt-1">
                  We have sent your complimentary 15% dining voucher to{' '}
                  <span className="font-semibold text-white">{email}</span>. Check your inbox!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-[11px] underline text-[#EDE5D5] hover:text-white"
                >
                  Register another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
                  <div className="relative w-full">
                    <Mail className="w-4 h-4 text-[#68675F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="newsletter-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Your email address..."
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#FBF8F0] text-[#102038] placeholder-[#68675F] text-sm focus:outline-none focus:ring-2 focus:ring-[#596B27]"
                    />
                  </div>

                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#C95718] hover:bg-[#b04a13] text-white text-sm font-bold tracking-wide transition-all whitespace-nowrap shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>Join DineNest</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {error && <p className="text-xs text-rose-300 mt-2">{error}</p>}

                <p className="text-[11px] text-[#DDD6C7]/70 mt-3">
                  Zero spam. Unsubscribe anytime with one tap.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
