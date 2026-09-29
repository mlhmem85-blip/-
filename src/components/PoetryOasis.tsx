import React, { useState } from 'react';
import { BookOpen, Copy, Check, Feather } from 'lucide-react';
import { PoemItem } from '../types';
import { romanticAudio } from '../utils/audio';

const POEMS: PoemItem[] = [
  {
    id: 'nizar-1',
    poet: 'نزار قباني',
    era: 'العصر الحديث',
    theme: 'غزل',
    verses: [
      'حبيبتي هي القانون في بلدٍ بلا قانون..',
      'وحبيبتي هي الشمس والظل.. والثلج والنار..',
      'إن يسألوكِ عني فقولي لهم:',
      'هو رجلٌ يحبني كما لم يحب امرأة أحدٌ في هذا الوجود..',
    ],
  },
  {
    id: 'darwish-1',
    poet: 'محمود درويش',
    era: 'شعر المقاومة والوجدان',
    theme: 'شوق',
    verses: [
      'ونحن نحب الحياة إذا ما استطعنا إليها سبيلا..',
      'لو كان لي أن أقول لكِ شيئاً قبل أن أنام:',
      'أنتِ كل ما أملك في هذه الأرض الغريبة،',
      'وأنتِ وطني الذي لا تغيب عنه الشمس.',
    ],
  },
  {
    id: 'juwaida-1',
    poet: 'فاروق جويدة',
    era: 'الشعر الوجداني المعاصر',
    theme: 'عهد',
    verses: [
      'لو أننا لم نفترق.. لبقيت نجماً في سمائك سارياً',
      'ولسرتُ في درب الهوى حراً طليقاً هادياً',
      'ولكنني في كل درب ألقاكِ شمساً',
      'ولا شيء في الكون يمحو هذا اللقاء.',
    ],
  },
  {
    id: 'qays-1',
    poet: 'قيس بن الملوح (مجنون ليلى)',
    era: 'العصر الأموي',
    theme: 'شوق',
    verses: [
      'أَمُرُّ عَلى الدِيارِ دِيارِ لَيلى .. أُقَبِّلُ ذا الجِدارَ وَذا الجِدارا',
      'وَما حُبُّ الدِيارِ شَغَفنَ قَلبي .. وَلَكِن حُبُّ مَن سَكَنَ الدِيارا',
    ],
  },
  {
    id: 'ibn-zaydun-1',
    poet: 'ابن زيدون (إلى ولادة)',
    era: 'الأندلس',
    theme: 'عهد',
    verses: [
      'أَضحى التَنائي بَديلاً مِن تَدانينا .. وَنابَ عَن طيبِ لُقيانا تَجافينا',
      'إِنَّ الزَمانَ الَّذي ما زالَ يُضحِكُنا .. أُنسًا بِقُربِكُمُ قَد عادَ يُبكينا',
      'لا تَحسَبوا نَأيَكُم عَنّا يُغَيِّرُنا .. أَن طالَما غَيَّرَ النَأيُ المُحِبّينا',
    ],
  },
  {
    id: 'sayyab-1',
    poet: 'بدر شاكر السياب',
    era: 'العصر الحديث',
    theme: 'سحر',
    verses: [
      'عيناكِ غابتا نخيلٍ ساعةَ السَّحر،',
      'أو شُرفتانِ راحَ ينأى عنهُما القمر.',
      'عيناكِ حينَ تبسِمانِ تورِقُ الكُروم،',
      'وترقصُ الأضواءُ كالصباحِ في نهر.',
    ],
  },
];

export const PoetryOasis: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('الكل');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPoems =
    selectedTheme === 'الكل'
      ? POEMS
      : POEMS.filter((p) => p.theme === selectedTheme);

  const handleCopyPoem = (poem: PoemItem) => {
    const textToCopy = `"${poem.verses.join('\n')}"\n— ${poem.poet}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(poem.id);
    romanticAudio.playHeartSound();
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="poetry-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-medium tracking-widest uppercase mb-3">
          <Feather className="w-3.5 h-3.5" />
          <span>أبلغ ما قيل في العشق والهوى</span>
        </div>
        <h2 className="font-calligraphy text-3xl sm:text-5xl font-bold text-rose-100 mb-4">
          واحة الشعر العربي والقصائد الخالدة
        </h2>
        <p className="font-serif-ar text-stone-300 text-base max-w-xl mx-auto">
          أبيات من عيون الشعر العربي صاغها كبار الشعراء لتعبر عن مكنونات الفؤاد.
        </p>

        {/* Clean Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
          {['الكل', 'غزل', 'شوق', 'عهد', 'سحر'].map((theme) => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedTheme === theme
                  ? 'bg-rose-900/60 text-rose-100 border border-rose-500/50 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 border border-stone-800 bg-stone-950/40'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Poems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPoems.map((poem) => (
          <div
            key={poem.id}
            className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-stone-950/60 border border-rose-950/50 hover:border-rose-800/60 transition-all duration-300 hover:bg-stone-900/50 group"
          >
            <div>
              {/* Unboxed Metadata (Zero-Pill Rule) */}
              <div className="flex items-center justify-between text-xs text-stone-400 mb-4 pb-3 border-b border-rose-950/40 font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-rose-300 font-sans-ar">{poem.poet}</span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span className="text-stone-400 font-sans-ar">{poem.era}</span>
                </div>
                <span className="text-rose-400 font-sans-ar text-[11px]">{poem.theme}</span>
              </div>

              {/* Verses */}
              <div className="space-y-3 font-serif-ar text-base sm:text-lg text-stone-100 leading-loose text-center py-2">
                {poem.verses.map((verse, idx) => (
                  <p key={idx} className="tracking-wide">
                    {verse}
                  </p>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-3 border-t border-rose-950/30 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-serif-ar">مقطوعة وجدانية</span>
              <button
                onClick={() => handleCopyPoem(poem)}
                className="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium text-stone-300 hover:text-rose-200 hover:bg-rose-950/40 transition-colors"
                title="نسخ الأبيات لمشاركتها"
              >
                {copiedId === poem.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-rose-300">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>مشاركة</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
