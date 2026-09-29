import React, { useState, useEffect } from 'react';
import { Heart, Plus, Calendar, Sparkles, Trash2, Clock } from 'lucide-react';
import { LoveMemory, CoupleProfile } from '../types';
import { romanticAudio } from '../utils/audio';

interface LoveTimelineProps {
  profile: CoupleProfile;
}

const DEFAULT_MEMORIES: LoveMemory[] = [
  {
    id: '1',
    date: '2024-02-14',
    title: 'أول نظرة.. حين توقف الزمن',
    description: 'تلاقت الأعين فجأة، وكان في تلك النظرة حديث طويل لم تنطقه الشفاه، شعرت حينها أن شيئاً عظيماً قد بدأ في حياتي.',
    tag: 'البداية الساحرة',
    highlight: true,
  },
  {
    id: '2',
    date: '2024-05-20',
    title: 'أول ضحكة من أعماق القلب',
    description: 'جلسنا نتبادل الأحاديث البسيطة حتى ضحكنا معاً بعفوية، وفي تلك اللحظة أدركت أن سعادتي الحقيقية تكمن في ابتسامتك.',
    tag: 'فرحة الروح',
  },
  {
    id: '3',
    date: '2024-09-15',
    title: 'حديث تحت ضوء القمر',
    description: 'سهرنا حتى مطلع الفجر نتشارك الأحلام والمخاوف والأسرار، شعرت لأول مرة أنني وجدت وطني الآمن ومرساتي.',
    tag: 'سكينة المساء',
    highlight: true,
  },
  {
    id: '4',
    date: '2025-01-01',
    title: 'أمنية العام الجديد',
    description: 'استقبلنا عامنا الجديد معاً، متمنين أن تبقى أيدينا متشابكة مهما تقلبت الأيام وتعاقبت الفصول.',
    tag: 'عهد متجدد',
  },
];

export const LoveTimeline: React.FC<LoveTimelineProps> = ({ profile }) => {
  const [memories, setMemories] = useState<LoveMemory[]>(() => {
    const saved = localStorage.getItem('love_memories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_MEMORIES;
      }
    }
    return DEFAULT_MEMORIES;
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    localStorage.setItem('love_memories', JSON.stringify(memories));
  }, [memories]);

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate) return;

    const newMemory: LoveMemory = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      date: newDate,
      description: newDesc.trim() || 'لحظة مميزة محفورة في الوجدان.',
      tag: newTag.trim() || 'ذكرى غالية',
      highlight: false,
    };

    setMemories([newMemory, ...memories]);
    romanticAudio.playHeartSound();
    setNewTitle('');
    setNewDate('');
    setNewDesc('');
    setNewTag('');
    setShowAddForm(false);
  };

  const handleDeleteMemory = (id: string) => {
    setMemories(memories.filter((m) => m.id !== id));
  };

  return (
    <section id="timeline-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-medium tracking-widest uppercase mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>مسار حكايتنا المشتركة</span>
        </div>
        <h2 className="font-calligraphy text-3xl sm:text-5xl font-bold text-rose-100 mb-4">
          شريط الذكريات والمحطات الخالدة
        </h2>
        <p className="font-serif-ar text-stone-300 text-base max-w-xl mx-auto">
          كل محطة عبرناها معاً صنعت نسيج حبنا. هنا نخلد أثمن لحظاتنا المشتركة.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-rose-200 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/40 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-rose-400" />
            <span>{showAddForm ? 'إلغاء الإضافة' : 'إضافة ذكرى جديدة لقصتنا'}</span>
          </button>
        </div>
      </div>

      {/* Add Memory Modal/Box */}
      {showAddForm && (
        <form
          onSubmit={handleAddMemory}
          className="mb-12 p-6 rounded-2xl bg-stone-900/90 border border-rose-900/40 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <div className="flex items-center gap-2 text-rose-300 font-medium text-sm mb-4">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>توثيق ذكرى حب جديدة</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-stone-300 mb-1">عنوان الذكرى</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="مثال: أول هدية، رحلتنا إلى البحر..."
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs text-stone-300 mb-1">تاريخ اليوم المميز</label>
              <input
                type="date"
                required
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-stone-300 mb-1">ماذا حدث في هذه اللحظة؟</label>
            <textarea
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="اكتب شعورك وتفاصيل اللحظة التي لا تُنسى..."
              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="تصنيف مختصر (مثلاً: مفاجأة لطيفة)"
              className="max-w-xs px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-rose-600 to-rose-800 text-white hover:from-rose-500 hover:to-rose-700 transition-colors shadow-sm"
            >
              حفظ في شريط العمر
            </button>
          </div>
        </form>
      )}

      {/* Timeline items */}
      <div className="relative border-r border-rose-950/60 mr-4 sm:mr-6 space-y-10">
        {memories.map((item) => (
          <div key={item.id} className="relative pr-8 sm:pr-10 group">
            {/* Timeline node icon */}
            <div className="absolute -right-[17px] top-1.5 w-8 h-8 rounded-full bg-[#0c090d] border border-rose-700/60 flex items-center justify-center text-rose-400 group-hover:border-rose-400 group-hover:scale-110 transition-all duration-300 shadow-[0_0_10px_rgba(225,29,72,0.3)]">
              <Heart className={`w-3.5 h-3.5 ${item.highlight ? 'fill-rose-500 text-rose-500' : ''}`} />
            </div>

            {/* Memory Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-stone-950/50 border border-rose-950/40 hover:border-rose-900/50 transition-all duration-300 hover:bg-stone-950/70">
              {/* Unboxed metadata: zero-pill rule with middle dot */}
              <div className="flex items-center justify-between text-xs text-stone-400 mb-2 font-mono">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-rose-300/90">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>{item.date}</span>
                  </span>
                  <span aria-hidden="true" className="text-stone-600">·</span>
                  <span className="text-stone-400 font-sans-ar">{item.tag}</span>
                </div>

                {memories.length > 1 && (
                  <button
                    onClick={() => handleDeleteMemory(item.id)}
                    aria-label="حذف هذه الذكرى"
                    className="opacity-0 group-hover:opacity-100 text-stone-500 hover:text-rose-400 transition-opacity p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Title */}
              <h3 className="font-serif-ar text-lg sm:text-xl font-bold text-rose-100 mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-serif-ar text-sm sm:text-base text-stone-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
