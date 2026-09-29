import React, { useState } from 'react';
import { Heart, X, Check, Share2, Copy, Sparkles, Calendar, User } from 'lucide-react';
import { CoupleProfile } from '../types';
import { romanticAudio } from '../utils/audio';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: CoupleProfile;
  onSaveProfile: (profile: CoupleProfile) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<CoupleProfile>(profile);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    romanticAudio.playHeartSound();
    onClose();
  };

  const handleCopyGiftLink = () => {
    // Generate shareable URL hash with query parameters
    const params = new URLSearchParams();
    params.set('p1', formData.partner1);
    params.set('p2', formData.partner2);
    params.set('date', formData.relationshipStartDate);
    if (formData.anniversaryNote) {
      params.set('note', formData.anniversaryNote);
    }

    const shareUrl = `${window.location.origin}${window.location.pathname}#${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    romanticAudio.playHeartSound();
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-stone-900 border border-rose-900/60 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-stone-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إغلاق النافذة"
          className="absolute top-5 left-5 p-1.5 rounded-full text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-800/40 mx-auto mb-3 flex items-center justify-center text-rose-400 shadow-inner">
            <Heart className="w-6 h-6 fill-rose-500/20" />
          </div>
          <h3 className="font-calligraphy text-2xl sm:text-3xl font-bold text-rose-100 mb-1">
            تخصيص بطاقة وصفحة الإهداء
          </h3>
          <p className="font-serif-ar text-xs sm:text-sm text-stone-400">
            أدخل أسماءكما وتاريخ لقائكما لتصبح هذه الصفحة الرومانسية ملكاً لكما تماماً.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-stone-300 mb-1.5 flex items-center gap-1 font-medium">
                <User className="w-3.5 h-3.5 text-rose-400" />
                <span>اسمك (المُهدي)</span>
              </label>
              <input
                type="text"
                required
                value={formData.partner1}
                onChange={(e) => setFormData({ ...formData, partner1: e.target.value })}
                placeholder="مثال: يوسف"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-stone-300 mb-1.5 flex items-center gap-1 font-medium">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>اسم الحبيب / الحبيبة</span>
              </label>
              <input
                type="text"
                required
                value={formData.partner2}
                onChange={(e) => setFormData({ ...formData, partner2: e.target.value })}
                placeholder="مثال: سارة"
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-rose-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-stone-300 mb-1.5 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>تاريخ بداية قصة حبكما (لحساب العداد)</span>
            </label>
            <input
              type="date"
              required
              value={formData.relationshipStartDate}
              onChange={(e) => setFormData({ ...formData, relationshipStartDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-300 mb-1.5 font-medium">
              كلمة إهداء خاصة تظهر في الواجهة
            </label>
            <textarea
              rows={2}
              value={formData.anniversaryNote}
              onChange={(e) => setFormData({ ...formData, anniversaryNote: e.target.value })}
              placeholder="اكتب عبارة غرامية أو أمنية تسكن قلبك..."
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-rose-500 transition-colors font-serif-ar"
            />
          </div>

          {/* Shareable Gift Link Section */}
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/40">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-rose-200 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-rose-400" />
                <span>رابط إهداء مباشر للحبيب</span>
              </span>
              <button
                type="button"
                onClick={handleCopyGiftLink}
                className="flex items-center gap-1 text-[11px] font-semibold text-rose-300 hover:text-white bg-rose-900/60 hover:bg-rose-800 px-2.5 py-1 rounded-lg transition-colors"
              >
                {copiedLink ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedLink ? 'تم نسخ الرابط!' : 'نسخ رابط الهدية'}</span>
              </button>
            </div>
            <p className="text-[11px] text-stone-400 leading-relaxed font-serif-ar">
              يمكنك إرسال هذا الرابط لشريك حياتك، وحين يفتحه ستظهر الصفحة مباشرة بأسمائكما وتاريخكما ورسالتكما!
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-500 hover:to-rose-700 text-white shadow-[0_4px_16px_rgba(225,29,72,0.3)] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>تطبيق التغييرات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
