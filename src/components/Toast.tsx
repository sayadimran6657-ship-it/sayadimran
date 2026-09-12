import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      id="dinenest-toast-notification"
      className="fixed bottom-20 md:bottom-8 right-4 sm:right-8 z-50 max-w-sm bg-[#102038] text-white p-4 rounded-2xl shadow-2xl border border-white/15 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300"
    >
      <CheckCircle2 className="w-5 h-5 text-[#596B27] shrink-0" />
      <p className="text-xs font-medium leading-tight flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-white/60 hover:text-white p-1 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
