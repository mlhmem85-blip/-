import React, { useState } from 'react';
import { Heart, Shuffle, ArrowRight, ArrowLeft, MessageCircleHeart } from 'lucide-react';
import { ConversationQuestion } from '../types';
import { romanticAudio } from '../utils/audio';
import nightImage from '../assets/images/romantic_night_stargazing_1790697516114.jpg';

const QUESTIONS: ConversationQuestion[] = [
  {
    id: 1,
    category: 'مشاعر',
    question: 'ما هي اللحظة الأولى التي شعرت فيها أنني لست مجرد شخص عابر، بل وطناً حقيقياً لروحك؟',
  },
  {
    id: 2,
    category: 'تفاصيل صغيرة',
    question: 'ما هو الشيء البسيط جداً الذي أفعله بعفوية ودون قصد ويجعل قلبك يبتسم من الأعماق؟',
  },
  {
    id: 3,
    category: 'مستقبل',
    question: 'لو كُتب لنا أن نسافر معاً غداً إلى أي مكان في العالم بلا هواتف أو التزامات، إلى أين ستأخذني؟',
  },
  {
    id: 4,
    category: 'ذكريات',
    question: 'ما هي الذكرى التي إذا ضاقت بك الدنيا وتذكرتها شعرت بالدفء والاطمئنان فوراً؟',
  },
  {
    id: 5,
    category: 'مشاعر',
    question: 'ما هو الدعاء الذي أردده في سري لك كل ليلة ولا تعرفه؟ أو كيف غيرت نظرتك للحياة بعد أن عرفتني؟',
  },
  {
    id: 6,
    category: 'تفاصيل صغيرة',
    question: 'ما هي الأغنية أو اللحن أو العطر الذي كلما صادفته تذكرتني فوراً وابتهجت؟',
  },
  {
    id: 7,
    category: 'مستقبل',
    question: 'كيف تتخيل صباحنا معاً بعد عشر سنوات من الآن؟ ما هو المشهد الذي تتمناه؟',
  },
  {
    id: 8,
    category: 'مشاعر',
    question: 'إذا كان بإمكانك أن تصف شعورك نحوي بكلمة واحدة عميقة، فما هي؟ ولماذا؟',
  },
];

export const IntimateCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const activeQ = QUESTIONS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    romanticAudio.playHeartSound();
    setCurrentIndex((prev) => (prev + 1) % QUESTIONS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    romanticAudio.playHeartSound();
    setCurrentIndex((prev) => (prev - 1 + QUESTIONS.length) % QUESTIONS.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    romanticAudio.playHeartSound();
    const rand = Math.floor(Math.random() * QUESTIONS.length);
    setCurrentIndex(rand);
  };

  return (
    <section id="questions-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-medium tracking-widest uppercase mb-3">
          <MessageCircleHeart className="w-3.5 h-3.5" />
          <span>جلسة مصارحة وتلاقٍ روحي</span>
        </div>
        <h2 className="font-calligraphy text-3xl sm:text-5xl font-bold text-rose-100 mb-4">
          بطاقات حوار القلوب
        </h2>
        <p className="font-serif-ar text-stone-300 text-base max-w-xl mx-auto">
          أسئلة رومانسية عميقة وممتعة تزيد التناغم والانسجام وتفتح نوافذ الأسرار الجميلة بين الحبيبين.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Atmosphere Card Frame */}
        <div className="relative rounded-3xl overflow-hidden border border-rose-900/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-stone-950">
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src={nightImage}
              alt="أمسية رومانسية وسماء مرصعة بالنجوم"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter blur-[2px]"
            />
            <div className="absolute inset-0 bg-stone-950/80" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 flex flex-col items-center text-center min-h-[340px] justify-between">
            {/* Card Counter & Category */}
            <div className="w-full flex items-center justify-between text-xs text-stone-400 pb-4 border-b border-rose-950/60 font-mono">
              <span className="font-serif-ar text-rose-300">
                محور: {activeQ.category}
              </span>
              <span>
                بطاقة {currentIndex + 1} من {QUESTIONS.length}
              </span>
            </div>

            {/* Question Body */}
            <div className="my-8 max-w-lg">
              <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-800/40 mx-auto mb-6 flex items-center justify-center text-rose-400 shadow-inner">
                <Heart className="w-6 h-6 fill-rose-500/20" />
              </div>

              <h3 className="font-serif-ar text-2xl sm:text-3xl text-rose-50 leading-relaxed font-semibold [text-wrap:balance]">
                "{activeQ.question}"
              </h3>
            </div>

            {/* Controls */}
            <div className="w-full pt-4 border-t border-rose-950/60 flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-900 transition-colors"
                title="السابق"
              >
                <ArrowRight className="w-4 h-4" />
                <span>السابق</span>
              </button>

              <button
                onClick={handleShuffle}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-rose-950/50 hover:bg-rose-900/60 text-rose-200 border border-rose-800/40 transition-all shadow-sm"
              >
                <Shuffle className="w-3.5 h-3.5 text-rose-400" />
                <span>سؤال عشوائي</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-900 transition-colors"
                title="التالي"
              >
                <span>التالي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
