import React, { useState, useEffect } from 'react';
import { Heart, Plus, Sparkles, CheckCircle2, Circle } from 'lucide-react';
import { BucketItem } from '../types';
import { romanticAudio } from '../utils/audio';

const INITIAL_BUCKET: BucketItem[] = [
  {
    id: 'b1',
    title: 'مشاهدة شروق الشمس معاً على شاطئ هادئ وصوت الموج يغني لنا',
    completed: true,
    category: 'طبيعة وسكينة',
  },
  {
    id: 'b2',
    title: 'إعداد عشاء رومانسي على أضواء الشموع بأنفسنا وتبادل الضحكات',
    completed: true,
    category: 'دفء البيت',
  },
  {
    id: 'b3',
    title: 'رحلة عفوية بسيطة بالسيارة بلا وجهة محددة ونحن نستمع لأغنياتنا المفضلة',
    completed: false,
    category: 'مغامرة لطيفة',
  },
  {
    id: 'b4',
    title: 'الاستلقاء في ليلة صيفية تحت سماء صافية وتأمل النجوم وتمني أمنية مشتركة',
    completed: false,
    category: 'رومانسية ليلية',
  },
  {
    id: 'b5',
    title: 'كتابة رسائل ورقية حقيقية بخط اليد ونحتفظ بها في صندوق أسرارنا الخاص',
    completed: true,
    category: 'توثيق الحب',
  },
  {
    id: 'b6',
    title: 'السفر معاً إلى مدينة أحلامنا وزيارة أزقتها التاريخية وارتشاف القهوة في مقهى عتيق',
    completed: false,
    category: 'سفر واستكشاف',
  },
];

export const BucketList: React.FC = () => {
  const [items, setItems] = useState<BucketItem[]>(() => {
    const saved = localStorage.getItem('love_bucket');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_BUCKET;
      }
    }
    return INITIAL_BUCKET;
  });

  const [newWish, setNewWish] = useState('');
  const [newCat, setNewCat] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    localStorage.setItem('love_bucket', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    romanticAudio.playHeartSound();
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.trim()) return;

    const newItem: BucketItem = {
      id: Date.now().toString(),
      title: newWish.trim(),
      completed: false,
      category: newCat.trim() || 'أمنية جديدة',
    };

    setItems([...items, newItem]);
    romanticAudio.playHeartSound();
    setNewWish('');
    setNewCat('');
    setShowAdd(false);
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <section id="bucket-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto scroll-mt-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-medium tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>أحلام ننسجها معاً خطوة بخطوة</span>
        </div>
        <h2 className="font-calligraphy text-3xl sm:text-5xl font-bold text-rose-100 mb-4">
          قائمة أمنياتنا المشتركة
        </h2>
        <p className="font-serif-ar text-stone-300 text-base max-w-xl mx-auto">
          تجارب ولحظات جميلة نعد بعضنا بأن نعيشها ونخلدها في كتاب عمرنا.
        </p>

        {/* Progress summary */}
        <div className="mt-8 max-w-md mx-auto p-4 rounded-xl bg-stone-950/60 border border-rose-950/40">
          <div className="flex items-center justify-between text-xs text-stone-300 mb-2">
            <span>نسبة إنجاز أمنياتنا:</span>
            <span className="font-bold text-rose-300 font-mono">{progressPercent}% ({completedCount} من {items.length})</span>
          </div>
          <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-rose-600 to-rose-400 transition-all duration-700 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-rose-200 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-800/40 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAdd ? 'إلغاء' : 'إضافة أمنية جديدة'}</span>
          </button>
        </div>
      </div>

      {/* Add wish form */}
      {showAdd && (
        <form
          onSubmit={handleAddWish}
          className="mb-8 p-5 rounded-2xl bg-stone-900 border border-rose-900/40 shadow-xl max-w-lg mx-auto"
        >
          <div className="mb-3">
            <label className="block text-xs text-stone-300 mb-1">الأمنية المشتركة</label>
            <input
              type="text"
              required
              value={newWish}
              onChange={(e) => setNewWish(e.target.value)}
              placeholder="مثال: الذهاب في رحلة بالمنطاد الهوائي..."
              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-rose-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs text-stone-300 mb-1">تصنيف الأمنية</label>
            <input
              type="text"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              placeholder="مثال: سفر ومغامرة"
              className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-rose-500"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-700 hover:bg-rose-600 text-white transition-colors"
            >
              إضافة للقائمة
            </button>
          </div>
        </form>
      )}

      {/* Bucket Items List */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`group flex items-start gap-4 p-4 sm:p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
              item.completed
                ? 'bg-rose-950/20 border-rose-900/30 text-stone-400'
                : 'bg-stone-950/60 border-stone-800 hover:border-rose-900/50 text-stone-100'
            }`}
          >
            <button
              type="button"
              className="mt-0.5 shrink-0 text-rose-500 transition-transform group-hover:scale-110"
              aria-label={item.completed ? 'تعليم كغير مكتمل' : 'تعليم كمكتمل'}
            >
              {item.completed ? (
                <CheckCircle2 className="w-5 h-5 text-rose-500 fill-rose-950" />
              ) : (
                <Circle className="w-5 h-5 text-stone-500 group-hover:text-rose-400" />
              )}
            </button>

            <div className="flex-1">
              <p
                className={`font-serif-ar text-base sm:text-lg transition-all ${
                  item.completed
                    ? 'line-through text-stone-500'
                    : 'text-stone-100 group-hover:text-rose-100'
                }`}
              >
                {item.title}
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                <span>{item.category}</span>
                {item.completed && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-rose-400 font-medium">عشناها بحب ❤️</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
