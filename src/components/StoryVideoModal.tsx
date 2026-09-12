import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Sparkles, Award } from 'lucide-react';

interface StoryVideoModalProps {
  onClose: () => void;
}

export const StoryVideoModal: React.FC<StoryVideoModalProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);

  return (
    <div
      id="story-video-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        id="story-video-modal"
        className="relative w-full max-w-4xl bg-[#102038] text-white rounded-3xl shadow-2xl border border-white/10 overflow-hidden my-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close story film"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Canvas Container */}
        <div className="relative aspect-16/9 w-full bg-black overflow-hidden flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
            alt="DineNest culinary documentary scene"
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isPlaying ? 'opacity-90 scale-102 transition-transform duration-10000' : 'opacity-60'
            }`}
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#102038] via-black/20 to-transparent" />

          {/* Film Center Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-widest text-[#EDE5D5]">
              <Sparkles className="w-3.5 h-3.5 text-[#C95718]" />
              <span>DineNest Original Film • Chapter {activeChapter}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-xl text-white">
              The Art of Gathering
            </h2>

            <p className="text-xs sm:text-sm text-[#DDD6C7] max-w-md">
              A cinematic journey into the kitchens, hearths, and harvests redefining hospitality.
            </p>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#C95718] hover:bg-[#b04a13] text-white flex items-center justify-center transition-all shadow-xl hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current ml-1" />
              )}
            </button>
          </div>

          {/* Video Control Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 hover:text-[#C95718] transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 hover:text-[#C95718] transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="text-[#DDD6C7]">02:14 / 04:30</span>
            </div>

            {/* Chapters */}
            <div className="hidden sm:flex items-center gap-2">
              {['The Soil & Harvest', 'The Hearth & Fire', 'The Table & Host'].map((ch, idx) => (
                <button
                  key={ch}
                  onClick={() => setActiveChapter(idx + 1)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    activeChapter === idx + 1
                      ? 'bg-[#596B27] text-white'
                      : 'text-[#DDD6C7] hover:bg-white/10'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
