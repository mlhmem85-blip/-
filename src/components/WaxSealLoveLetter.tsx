import React, { useState } from 'react';
import { Heart, Copy, Check, Edit3, RotateCcw, Sparkles } from 'lucide-react';
import { CoupleProfile } from '../types';
import { romanticAudio } from '../utils/audio';
import letterImage from '../assets/images/romantic_love_envelope_1790697505017.jpg';

interface WaxSealLoveLetterProps {
  profile: CoupleProfile;
}

const PRESET_LETTERS = [
  {
    title: 'حديث الروح للروح',
    content: `إلى من سكنت تفاصيل روحي وملكت نبضاتي..

أكتب إليكِ والليل يرخي سدوله، والقلب لا يعرف سبيلاً إلى الهدوء إلا بذكراكِ. لستِ في حياتي مجرد عابر أو صدفة لطيفة؛ بل أنتِ المعجزة التي كنتُ أنتظرها دون أن أعلم.

معكِ يا حبيبتي، تعلمتُ أن للوقت طعماً آخر، وللضحكة رنيناً يشبه الأمان. كل نظرة من عينيكِ تختصر كل ما عجزت لغات الأرض عن صياغته. أعدكِ أن أظل لكِ السند والملاذ، وأن أحبّك في كل صباح ومساء كأنني أراكِ للمرة الأولى.

دُمتِ لي وطناً لا أبتغي عنه بديلاً.`,
  },
  {
    title: 'قصيدة الشوق الأبدي',
    content: `إلى أجمل ما أهداني القدر..

لو كان لي أن أعيد صياغة أيامي، لما بدأتُ عمري إلا في اللحظة التي التقيتكِ فيها. كنتُ أظن أن الحب كلمة في الدواوين أو خيال في الحكايات، حتى أشرقت شمسكِ في سمائي، فأنارت ما انطفأ وأحيت ما ذبل.

أحبكِ ليس لأنكِ كاملة، بل لأنكِ تجعلين كل نقص في هذا الكون جميلاً حين أكون بجانبك. أحب هدوءك، وضحكتك التي تمسح التعب عن قلبي، وطيبتك التي لا تشبه أحداً. 

أنتِ حكايتي الأبدية، وسري الصغير الذي أفتخر به أمام العالم أجمع.`,
  },
  {
    title: 'عهد الوفاء والسكينة',
    content: `إلى رفيقة دربي وسلوة خاطري..

سلامٌ على قلبكِ الذي لا يعرف إلا النقاء. في زحام هذه الحياة وضجيجها، أجد في صوتكِ واحة من السلام، وفي قربكِ يزول كل قلق.

أكتب لكِ لأذكركِ أن حبكِ في قلبي يزداد مع كل شروق شمس ومع كل تسبيحة نسيم. لن تكفي الحروف لتصف ما أشعر به، لكن يكفيني أن أنظر إليكِ فأعلم أن الله قد استجاب لدعاء قديم لم أكن أعرف كيف أنطقه.

أنتِ أمانتي الغالية، وحلمي الذي تحقق. أحبك اليوم وغداً وإلى ما لا نهاية.`,
  }
];

export const WaxSealLoveLetter: React.FC<WaxSealLoveLetterProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const [customContent, setCustomContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeContent = customContent || PRESET_LETTERS[letterIndex].content;

  const handleOpenLetter = () => {
    if (!isOpen) {
      romanticAudio.playWaxSealBreak();
      setIsOpen(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    romanticAudio.playHeartSound();
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNextLetter = () => {
    setCustomContent('');
    setLetterIndex((prev) => (prev + 1) % PRESET_LETTERS.length);
    romanticAudio.playHeartSound();
  };

  return (
    <section id="letter-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-medium tracking-widest uppercase mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>رسالة مغلفة بعبير الورد</span>
        </div>
        <h2 className="font-calligraphy text-3xl sm:text-5xl font-bold text-rose-100 mb-4">
          مظروف العشق والختم الملكي
        </h2>
        <p className="font-serif-ar text-stone-300 text-base max-w-xl mx-auto">
          اضغط على الختم الشمعي لفض الرسالة واكتشاف الكلمات المخبأة بين ثنايا الورق.
        </p>
      </div>

      <div className="relative">
        {!isOpen ? (
          /* Sealed Envelope View */
          <div
            onClick={handleOpenLetter}
            className="group relative cursor-pointer mx-auto max-w-xl aspect-[16/10] rounded-2xl overflow-hidden border border-rose-900/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-500 hover:scale-[1.01] hover:border-rose-500/50"
          >
            {/* Background envelope art */}
            <img
              src={letterImage}
              alt="مظروف رسالة عشق عتيقة مع ختم شمعي"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.7] group-hover:brightness-[0.8] transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-black/40 to-transparent" />

            {/* Central 3D Wax Seal Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-rose-600 via-rose-700 to-rose-950 p-1 shadow-[0_10px_30px_rgba(225,29,72,0.6)] border-2 border-rose-300/40 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full border border-rose-900/60 flex flex-col items-center justify-center bg-radial from-rose-500 to-rose-900 text-rose-100 shadow-inner">
                    <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-rose-200 text-rose-200 mb-1 animate-pulse" />
                    <span className="font-calligraphy text-xs sm:text-sm font-bold text-rose-100">حب أبدي</span>
                  </div>
                </div>
                <div className="absolute -inset-2 rounded-full border border-rose-400/20 animate-ping opacity-40 pointer-events-none" />
              </div>

              <div className="mt-6">
                <span className="font-serif-ar text-base sm:text-lg text-rose-100 font-semibold drop-shadow block">
                  إلى الغالي: {profile.partner2 || 'حبيبي'}
                </span>
                <span className="text-xs text-rose-300/80 mt-1 block">
                  (انقر لكسر الختم الشمعي وقراءة الرسالة)
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Opened Parchment Letter View */
          <div className="relative mx-auto max-w-2xl bg-[#fdfbf7] text-[#2c1d18] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] p-6 sm:p-10 border border-[#e8dcc4] transition-all duration-700 animate-in fade-in zoom-in-95">
            {/* Parchment decorative vintage border */}
            <div className="absolute inset-3 sm:inset-4 border border-[#e4d3b6] rounded-xl pointer-events-none opacity-70" />
            <div className="absolute inset-4 sm:inset-5 border border-dashed border-[#d8c29d] rounded-lg pointer-events-none opacity-50" />

            {/* Letter Header */}
            <div className="flex items-center justify-between relative z-10 mb-6 pb-4 border-b border-[#e8dcc4]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-rose-700 flex items-center justify-center text-white shadow-sm">
                  <Heart className="w-3.5 h-3.5 fill-rose-200" />
                </div>
                <span className="font-calligraphy text-lg font-bold text-rose-900">
                  {PRESET_LETTERS[letterIndex].title}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#735848]">
                <button
                  onClick={handleNextLetter}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#f4ece1] hover:bg-[#ebdcc8] text-[#5c3e32] transition-colors"
                  title="تغيير نص الرسالة بنص رومانسي آخر"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">نص آخر</span>
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#f4ece1] hover:bg-[#ebdcc8] text-[#5c3e32] transition-colors"
                  title="تعديل كلمات الرسالة بنفسك"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'حفظ' : 'تعديل'}</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-rose-700 hover:bg-rose-800 text-white transition-colors"
                  title="نسخ الرسالة"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
            </div>

            {/* Letter Body */}
            <div className="relative z-10">
              {isEditing ? (
                <textarea
                  value={customContent || PRESET_LETTERS[letterIndex].content}
                  onChange={(e) => setCustomContent(e.target.value)}
                  rows={10}
                  className="w-full p-4 rounded-lg bg-white/70 border border-[#d8c29d] font-serif-ar text-base sm:text-lg leading-relaxed text-[#2c1d18] focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                  placeholder="اكتب كلماتك الرومانسية الصادقة هنا..."
                />
              ) : (
                <div className="font-serif-ar text-base sm:text-lg text-[#322019] leading-loose whitespace-pre-line tracking-wide selection:bg-rose-200">
                  {activeContent}
                </div>
              )}

              {/* Letter Footer Sign-off */}
              <div className="mt-8 pt-4 border-t border-[#e8dcc4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#674f40]">
                <div className="font-calligraphy text-base text-rose-950 font-bold">
                  المحب والمخلص لك دائماً: {profile.partner1 || 'قلبك الآخر'}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-stone-500 hover:text-stone-800 transition-colors text-xs underline underline-offset-2"
                >
                  إعادة إغلاق المظروف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
