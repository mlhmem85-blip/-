import React, { useState } from 'react';
import { Heart, Sparkles, Gift, Plus, Check } from 'lucide-react';
import { LoveReason } from '../types';
import { romanticAudio } from '../utils/audio';

const INITIAL_REASONS: LoveReason[] = [
  { id: 1, text: 'لأنك تجعل العالم القاسي مكاناً يفيض بالدفء بمجرد ابتسامتك.', category: 'قلب' },
  { id: 2, text: 'لأنك تستمع إليّ حين أصمت، وتفهم حزني قبل أن أبديه.', category: 'روح' },
  { id: 3, text: 'لأن صوتك في الصباح هو أجمل بداية ليومي ونهاية لكل قلق.', category: 'أمان' },
  { id: 4, text: 'لأن تفاصيلك الصغيرة وطريقتك في الضحك تسحرني كل يوم من جديد.', category: 'تفاصيل' },
  { id: 5, text: 'لأنك آمنت بي ودعمت أحلامي حين شكك الجميع في قدراتي.', category: 'روح' },
  { id: 6, text: 'لأنك الملاذ الآمن الذي أهرب إليه حين تضيق بي الأرض بما رحبت.', category: 'أمان' },
  { id: 7, text: 'لأن بريق عينيك حين تنظر إليّ يشعرني أنني أثمن إنسان في الكون.', category: 'قلب' },
  { id: 8, text: 'لأنك تجعل حتى أبسط الأوقات العادية معك ذكرى استثنائية لا تُنسى.', category: 'تفاصيل' },
  { id: 9, text: 'لأن قلبك الأبيض لا يعرف الضغينة، وطيبتك تُصلح ما أفسدته الحياة.', category: 'روح' },
  { id: 10, text: 'لأنني معك أكون نفسي بكل عفوية وصدق دون أي خوف أو تصنع.', category: 'أمان' },
  { id: 11, text: 'لأن غيرتك اللطيفة وخوفك عليّ دليل حب يدفئ روحي دائماً.', category: 'قلب' },
  { id: 12, text: 'لأنك تفهمني بنظرة واحدة دون الحاجة إلى شرح أو تبرير.', category: 'روح' },
  { id: 13, text: 'لأن طريقتك في مسك يدي تجعل كل الخوف يتلاشى كأنه لم يكن.', category: 'تفاصيل' },
  { id: 14, text: 'لأن حبك منح حياتي هدفاً ومعنى وجمالاً فاق كل تصوراتي.', category: 'قلب' },
  { id: 15, text: 'لأنك دعوتي المستجابة التي حمدتُ الله عليها ألف مرة وما زلت.', category: 'روح' },
];

export const LoveJar: React.FC = () => {
  const [reasons, setReasons] = useState<LoveReason[]>(() => {
    const saved = localStorage.getItem('love_reasons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_REASONS;
      }
    }
    return INITIAL_REASONS;
  });

  const [currentReason, setCurrentReason] = useState<LoveReason | null>(INITIAL_REASONS[0]);
  const [openedCount, setOpenedCount] = useState<number>(1);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newReasonText, setNewReasonText] = useState('');
  const [newCategory, setNewCategory] = useState<'قلب' | 'روح' | 'تفاصيل' | 'أمان'>('قلب');

  const handleDrawReason = () => {
    setIsOpening(true);
    romanticAudio.playHeartSound();

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * reasons.length);
      setCurrentReason(reasons[randomIndex]);
      setOpenedCount((prev) => Math.min(reasons.length, prev + 1));
      setIsOpening(false);
    }, 400);
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReasonText.trim()) return;

    const newObj: LoveReason = {
      id: Date.now(),
      text: newReasonText.trim(),
      category: newCategory,
    };

    const updated = [newObj, ...reasons];
    setReasons(updated);
    localStorage.setItem('love_reasons', JSON.stringify(updated));
    setCurrentReason(newObj);
    romanticAudio.playHeartSound();
    setNewReasonText('');
    setShowAddModal(false);
  };

  return (
    <section id="jar-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-medium tracking-widest uppercase mb-3">
          <Gift className="w-3.5 h-3.5" />
          <span>رسائل صغيرة من القلب</span>
        </div>
        <h2 className="font-calligraphy text-3xl sm:text-5xl font-bold text-rose-100 mb-4">
          جرة أسباب عشقي لك
        </h2>
        <p className="font-serif-ar text-stone-300 text-base max-w-xl mx-auto">
          كل لفافة في هذه الجرة المضيئة تحمل سبباً صادقاً يجعلني أحبك أكثر في كل لحظة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left / Jar Illustration card */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative group p-8 rounded-3xl bg-gradient-to-b from-stone-900/60 to-rose-950/30 border border-rose-900/30 shadow-[0_15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md text-center w-full max-w-xs">
            {/* Glowing crystal jar representation */}
            <div className="relative mx-auto w-36 h-48 rounded-b-[40px] rounded-t-[14px] border-2 border-rose-400/40 bg-radial from-rose-500/10 via-rose-900/20 to-transparent p-4 flex flex-col items-center justify-end overflow-hidden shadow-[inset_0_0_25px_rgba(244,63,94,0.25)]">
              {/* Cork Stopper */}
              <div className="absolute top-0 w-20 h-4 bg-[#8b613c] rounded-t-md border-b border-[#5c3e23] shadow-md" />

              {/* Floating folded paper scrolls inside jar */}
              <div className="space-y-1.5 w-full pb-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2.5 rounded-full bg-gradient-to-r from-[#fae8b4] via-[#f7d794] to-[#f5cd79] opacity-80 shadow-sm transform"
                    style={{
                      transform: `rotate(${((i % 2 === 0 ? 1 : -1) * (i + 1) * 4)}deg) scale(${0.85 + (i % 3) * 0.08})`,
                    }}
                  />
                ))}
              </div>

              {/* Floating stardust inside jar */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Sparkles className="w-8 h-8 text-rose-300 animate-pulse opacity-60" />
              </div>
            </div>

            {/* Jar progress indicator */}
            <div className="mt-5 text-center">
              <span className="text-xs text-stone-400 font-mono">
                اكتشفت <span className="text-rose-300 font-bold">{openedCount}</span> من أصل <span className="text-stone-300">{reasons.length}</span> سبباً
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={handleDrawReason}
                disabled={isOpening}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-600 via-rose-700 to-rose-900 hover:from-rose-500 hover:to-rose-800 transition-all shadow-[0_4px_16px_rgba(225,29,72,0.3)] disabled:opacity-50 cursor-pointer"
              >
                {isOpening ? 'يتم سحب اللفافة...' : 'اسحب سبباً جديداً من الجرة 💌'}
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="w-full py-1.5 px-3 rounded-lg text-[11px] text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 transition-colors flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>أضف سبباً خاصاً بك إلى الجرة</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right / Reason Parchment Display */}
        <div className="md:col-span-7">
          {currentReason && (
            <div className="relative p-7 sm:p-9 rounded-2xl bg-[#fefcf8] text-[#2d1b14] border border-[#e8dcc4] shadow-[0_15px_45px_rgba(0,0,0,0.5)] transition-all duration-500">
              {/* Decorative Corner flourish */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#e9decb]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-rose-800 flex items-center justify-center text-white">
                    <Heart className="w-3 h-3 fill-current" />
                  </div>
                  <span className="font-calligraphy text-base font-bold text-rose-950">
                    سبب حب رقم #{currentReason.id % 100 || 1}
                  </span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#f4ece1] text-[#6b4c3e] font-serif-ar font-medium">
                  سر {currentReason.category}
                </span>
              </div>

              {/* Reason Body */}
              <div className="py-4">
                <p className="font-serif-ar text-xl sm:text-2xl text-[#3b241c] leading-relaxed font-semibold italic text-center selection:bg-rose-200">
                  "{currentReason.text}"
                </p>
              </div>

              {/* Footer Quote */}
              <div className="mt-6 pt-4 border-t border-[#e9decb] text-center text-xs text-[#7e604f] font-serif-ar">
                وكل يوم في قربك أكتشف أسباباً لا حصر لها لأن أسكنك فؤادي.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Reason Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-2xl bg-stone-900 border border-rose-900/50 shadow-2xl text-stone-100">
            <h3 className="font-calligraphy text-xl font-bold text-rose-200 mb-2">
              إضافة سبب جديد لجرّة العشق
            </h3>
            <p className="text-xs text-stone-400 mb-4 font-serif-ar">
              ما هو الشيء الصغير أو الكبير الذي يجعلك تحبه؟
            </p>

            <form onSubmit={handleAddReason}>
              <div className="mb-4">
                <textarea
                  required
                  rows={4}
                  value={newReasonText}
                  onChange={(e) => setNewReasonText(e.target.value)}
                  placeholder="مثال: لأنك تتذكر قهوتي المفضلة بدون أن أطلبها..."
                  className="w-full p-3 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="mb-5">
                <label className="block text-xs text-stone-300 mb-1.5 font-medium">نوع السبب</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['قلب', 'روح', 'تفاصيل', 'أمان'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={`py-1.5 text-xs rounded-lg border transition-all ${
                        newCategory === cat
                          ? 'bg-rose-900/60 border-rose-500 text-rose-200 font-semibold'
                          : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-lg bg-rose-700 hover:bg-rose-600 text-white transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>وضع في الجرة</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
