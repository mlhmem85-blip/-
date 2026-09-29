import React, { useState, useEffect } from 'react';
import { Heart, Calendar, ArrowDown, Sparkles, Feather } from 'lucide-react';
import { CoupleProfile } from '../types';
import heroImage from '../assets/images/romantic_hero_cinematic_1790697492480.jpg';

interface HeroSectionProps {
  profile: CoupleProfile;
  onOpenLetter: () => void;
  onOpenCustomize: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenLetter,
  onOpenCustomize,
}) => {
  const [greeting, setGreeting] = useState('');
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('صباح الورد والياسمين لنور عيني');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('طاب يومك يا أجمل أقداري');
    } else {
      setGreeting('مساء الشوق والسكينة لقلبك الدافئ');
    }

    const calculateTime = () => {
      const start = new Date(profile.relationshipStartDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [profile.relationshipStartDate]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Hero Image with Film Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="لقاء رومانسي ساحر تحت أضواء المساء"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.08] transform scale-105 transition-transform duration-1000"
        />
        {/* Soft vignette & gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c090d] via-[#0c090d]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-rose-950/20 via-transparent to-[#0c090d]/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Dedicated sender to recipient tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-800/40 text-rose-200 text-xs sm:text-sm backdrop-blur-md mb-6 shadow-inner">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span>من: <span className="font-semibold text-rose-100">{profile.partner1 || 'المحب'}</span></span>
          <span className="text-rose-400/60">إلى نبض الفؤاد:</span>
          <span className="font-semibold text-rose-100">{profile.partner2 || 'الحبيب'}</span>
        </div>

        {/* Dynamic Warm Greeting */}
        <p className="font-serif-ar text-base sm:text-lg text-rose-300/90 mb-3 tracking-wide italic">
          {greeting}
        </p>

        {/* Hero Title */}
        <h1 className="font-calligraphy text-4xl sm:text-6xl md:text-7xl font-bold text-rose-50 mb-6 leading-tight max-w-3xl drop-shadow-md [text-wrap:balance]">
          حين تلتقي الأرواح.. يصيرُ الحب وطناً وسكينة
        </h1>

        {/* Subtitle text */}
        <p className="font-serif-ar text-lg sm:text-xl text-stone-200/90 max-w-2xl mb-10 leading-relaxed [text-wrap:balance]">
          {profile.anniversaryNote || 'كل يوم معك هو حكاية جديدة تُروى، وكل نبضة في قلبي تشهد أنك أجمل ما أهدتني إياه الحياة.'}
        </p>

        {/* Live Together Time Counter Ribbon */}
        <div className="w-full max-w-2xl bg-stone-950/70 border border-rose-900/30 rounded-2xl p-5 sm:p-6 backdrop-blur-lg mb-10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between text-xs text-rose-300/80 mb-4 pb-2 border-b border-rose-950/60 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>لحظات عشقنا معاً منذ {profile.relationshipStartDate}</span>
            </span>
            <button
              onClick={onOpenCustomize}
              className="text-rose-400 hover:text-rose-200 transition-colors underline underline-offset-4 decoration-rose-500/40 text-[11px]"
            >
              تعديل التاريخ
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="p-2 sm:p-3 rounded-xl bg-rose-950/30 border border-rose-900/20">
              <div className="text-2xl sm:text-4xl font-bold font-mono tabular-nums text-rose-100">
                {timeTogether.days.toLocaleString('ar-EG')}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-1 font-serif-ar">يوماً جميلاً</div>
            </div>

            <div className="p-2 sm:p-3 rounded-xl bg-rose-950/30 border border-rose-900/20">
              <div className="text-2xl sm:text-4xl font-bold font-mono tabular-nums text-rose-200">
                {timeTogether.hours.toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-1 font-serif-ar">ساعة غرام</div>
            </div>

            <div className="p-2 sm:p-3 rounded-xl bg-rose-950/30 border border-rose-900/20">
              <div className="text-2xl sm:text-4xl font-bold font-mono tabular-nums text-rose-300">
                {timeTogether.minutes.toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-1 font-serif-ar">دقيقة شوق</div>
            </div>

            <div className="p-2 sm:p-3 rounded-xl bg-rose-950/30 border border-rose-900/20">
              <div className="text-2xl sm:text-4xl font-bold font-mono tabular-nums text-rose-400 animate-pulse">
                {timeTogether.seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-[11px] sm:text-xs text-stone-400 mt-1 font-serif-ar">ثانية نبض</div>
            </div>
          </div>
        </div>

        {/* Primary Call to Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenLetter}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-white bg-gradient-to-r from-rose-600 via-rose-700 to-rose-900 hover:from-rose-500 hover:to-rose-800 shadow-[0_4px_24px_rgba(225,29,72,0.35)] hover:shadow-[0_6px_32px_rgba(225,29,72,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base cursor-pointer"
          >
            <Feather className="w-4 h-4 text-rose-200" />
            <span>افتح رسالتي لك</span>
            <Sparkles className="w-4 h-4 text-rose-200" />
          </button>

          <a
            href="#timeline-section"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-stone-300 hover:text-white bg-stone-900/70 hover:bg-stone-800/80 border border-stone-800 transition-all text-sm sm:text-base backdrop-blur-sm"
          >
            <span>شريط ذكرياتنا</span>
            <ArrowDown className="w-4 h-4 text-rose-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
