import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface NavigationProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenCustomize: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isMusicPlaying,
  onToggleMusic,
  onOpenCustomize,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-rose-950/40 bg-[#0c090d]/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-calligraphy text-2xl font-bold tracking-wide text-rose-100 hover:text-rose-300 transition-colors shrink-0"
        >
          أوتار القلوب
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <a
            href="#letter-section"
            className="hover:text-rose-300 transition-colors whitespace-nowrap"
          >
            رسالتنا
          </a>
          <a
            href="#counter-section"
            className="hover:text-rose-300 transition-colors whitespace-nowrap"
          >
            أيامنا
          </a>
          <a
            href="#timeline-section"
            className="hover:text-rose-300 transition-colors whitespace-nowrap"
          >
            ذكرياتنا
          </a>
          <a
            href="#jar-section"
            className="hover:text-rose-300 transition-colors whitespace-nowrap"
          >
            جرة الأسباب
          </a>
          <a
            href="#poetry-section"
            className="hover:text-rose-300 transition-colors whitespace-nowrap"
          >
            واحة الشعر
          </a>
          <a
            href="#questions-section"
            className="hover:text-rose-300 transition-colors whitespace-nowrap"
          >
            حوار القلوب
          </a>
          <a
            href="#bucket-section"
            className="hover:text-rose-300 transition-colors whitespace-nowrap"
          >
            أمنياتنا
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMusic}
            aria-label={isMusicPlaying ? 'إيقاف اللحن الرومانسي' : 'تشغيل اللحن الرومانسي'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isMusicPlaying
                ? 'border-rose-500/50 bg-rose-950/40 text-rose-200 shadow-[0_0_15px_rgba(225,29,72,0.25)]'
                : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:text-stone-200'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span className="hidden sm:inline">لحن العشق يعمل</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">لحن هادئ</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenCustomize}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-rose-50 bg-gradient-to-r from-rose-700 to-rose-900 rounded-lg hover:from-rose-600 hover:to-rose-800 transition-all shadow-sm whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-200" />
            <span>تخصيص الإهداء</span>
          </button>
        </div>
      </div>
    </header>
  );
};
