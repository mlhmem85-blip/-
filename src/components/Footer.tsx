import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { CoupleProfile } from '../types';

interface FooterProps {
  profile: CoupleProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-rose-950/40 bg-[#080609] py-12 px-4 sm:px-6 lg:px-8 text-stone-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <div className="font-calligraphy text-xl text-rose-200 font-bold">
            أوتار القلوب
          </div>
          <p className="font-serif-ar text-stone-400">
            مساحة رومانسية مخصصة لحفظ أثمن الذكريات والمشاعر الدافئة.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-stone-400 font-serif-ar">
          <span>صُنعت بكل حب وشغف لـ</span>
          <span className="text-rose-300 font-semibold">{profile.partner2 || 'الحبيب'}</span>
          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600 inline mx-0.5 animate-pulse" />
          <span>من قِبل</span>
          <span className="text-rose-300 font-semibold">{profile.partner1 || 'المحب'}</span>
        </div>

        <div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-800 text-stone-400 hover:text-rose-200 hover:border-rose-800/40 transition-colors"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
