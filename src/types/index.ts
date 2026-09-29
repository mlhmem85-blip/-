export interface CoupleProfile {
  partner1: string; // The sender or user
  partner2: string; // The beloved
  relationshipStartDate: string; // YYYY-MM-DD
  anniversaryNote: string;
}

export interface LoveMemory {
  id: string;
  date: string;
  title: string;
  description: string;
  tag: string;
  highlight?: boolean;
}

export interface LoveReason {
  id: number;
  text: string;
  category: 'قلب' | 'روح' | 'تفاصيل' | 'أمان';
}

export interface PoemItem {
  id: string;
  poet: string;
  era: string;
  verses: string[];
  theme: 'غزل' | 'شوق' | 'عهد' | 'سحر';
}

export interface ConversationQuestion {
  id: number;
  question: string;
  category: 'ذكريات' | 'مشاعر' | 'مستقبل' | 'تفاصيل صغيرة';
}

export interface BucketItem {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}
