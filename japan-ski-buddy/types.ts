
export type AppView = 'itinerary' | 'explore' | 'learning' | 'checklist';

export interface POI {
  id: string;
  resortName: string;
  name: string;
  type: 'food' | 'spot';
  votes: number;
  recommender: string;
  rating: string;
  imgUrl: string;
  mapUrl: string;
  votedByMe?: boolean;
}

export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  location: string;
  notes?: string;
  type: 'skiing' | 'transport' | 'food' | 'rest';
}

export interface DayPlan {
  id: string;
  date: string;
  resort: string;
  items: ItineraryItem[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
  category: '裝備' | '衣物' | '文件' | '其他';
  checked: boolean;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  keyPoints?: string[];
  isCompleted: boolean;
  videoUrl?: string;
}

export interface LearningLevel {
  level: '初階' | '中階' | '進階';
  skills: Skill[];
}

export interface LearningGuide {
  type: 'Snowboard' | 'Ski';
  levels: LearningLevel[];
}
