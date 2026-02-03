
import { DayPlan, ChecklistItem, LearningGuide, POI } from './types';

export interface TransportDetails {
  shuttle: string;
  airportAccess: {
    airport: string;
    method: string;
    duration: string;
  }[];
}

export interface ResortInfo {
  region: string;
  cn: string;
  en: string;
  lat: number;
  lng: number;
  transport?: TransportDetails;
}

export const resortToAirportMap: Record<string, string> = {
  "苗場滑雪場": "NRT", "神樂滑雪場": "NRT", "GALA 湯澤滑雪場": "NRT", "上越國際滑雪場": "NRT", "草津溫泉滑雪場": "NRT", "輕井澤王子大飯店雪場": "NRT",
  "白馬八方尾根滑雪場": "NRT", "白馬五龍滑雪場": "NRT", "栂池高原滑雪場": "NRT", "野澤溫泉滑雪場": "NRT", "志賀高原滑雪場": "NRT", "妙高杉之原滑雪場": "NRT",
  "藏王溫泉滑雪場": "SDJ", "安比高原滑雪場": "SDJ", "磐梯山溫泉滑雪場": "SDJ", "夏油高原滑雪場": "SDJ",
  "琵琶湖 Valley 滑雪場": "KIX", "箱館山滑雪場": "KIX", "大山木屋滑雪場": "KIX",
  "二世谷聯合滑雪場": "CTS", "留壽都度假村": "CTS", "富良野滑雪場": "CTS", "星野 Tomamu 滑雪場": "CTS"
};

export const airportAdvice: Record<string, { airport: string; time: string; note: string; busTime: string; gap: string }> = {
  CTS: { airport: "新千歲 (CTS)", time: "06:30 - 11:10", note: "北海道雪場接駁巴士車程長，班機太晚會沒車進山。", busTime: "3h", gap: "1.5h" },
  NRT: { airport: "成田 (NRT)", time: "08:00 - 12:30", note: "建議轉乘新幹線，車程約 1.5 - 4 小時。中午前抵達最保險。", busTime: "2.5h", gap: "2h" },
  SDJ: { airport: "仙台 (SDJ)", time: "07:30 - 11:45", note: "直飛班機較少，請優先確認虎航或星宇航線。", busTime: "1.5h", gap: "1h" },
  KIX: { airport: "關西 (KIX)", time: "09:00 - 13:00", note: "適合搭配京都或滋賀地區行程。", busTime: "2.5h", gap: "2h" }
};

export const INITIAL_POIS: POI[] = [
  {
    id: "p1",
    resortName: "二世谷聯合滑雪場 (Niseko United)",
    name: "阿武茶 (A-bu-cha 2nd)",
    type: "food",
    votes: 8,
    recommender: "阿雪",
    rating: "4.8",
    imgUrl: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?q=80&w=400&auto=format&fit=crop",
    mapUrl: "https://maps.google.com/?q=Abucha+2nd+Niseko"
  },
  {
    id: "p2",
    resortName: "二世谷聯合滑雪場 (Niseko United)",
    name: "羊蹄山觀景台",
    type: "spot",
    votes: 12,
    recommender: "SkiMaster",
    rating: "5.0",
    imgUrl: "https://images.unsplash.com/photo-1544413647-b510492421ec?q=80&w=400&auto=format&fit=crop",
    mapUrl: "https://maps.google.com/?q=Mount+Yotei+View"
  },
  {
    id: "p3",
    resortName: "白馬八方尾根滑雪場 (Hakuba Happo-One Snow Resort)",
    name: "白馬山頂咖啡",
    type: "spot",
    votes: 5,
    recommender: "滑雪小龍",
    rating: "4.6",
    imgUrl: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=400&auto=format&fit=crop",
    mapUrl: "https://maps.google.com/?q=Hakuba+Mountain+Harbor"
  }
];

export const JAPAN_RESORTS: ResortInfo[] = [
  { region: '關東地區 (Kanto)', cn: '苗場滑雪場', en: 'Naeba Ski Resort', lat: 36.7925, lng: 138.7844 },
  { region: '關東地區 (Kanto)', cn: '神樂滑雪場', en: 'Kagura Ski Resort', lat: 36.8481, lng: 138.7611 },
  { region: '關東地區 (Kanto)', cn: 'GALA 湯澤滑雪場', en: 'GALA Yuzawa Snow Resort', lat: 36.9411, lng: 138.8014 },
  { region: '北陸/長野地區 (Nagano)', cn: '白馬八方尾根滑雪場', en: 'Hakuba Happo-One Snow Resort', lat: 36.7022, lng: 137.8453 },
  { region: '東北地區 (Tohoku)', cn: '藏王溫泉滑雪場', en: 'Zao Onsen Ski Resort', lat: 38.1614, lng: 140.3996 },
  { region: '北海道地區 (Hokkaido)', cn: '二世谷聯合滑雪場', en: 'Niseko United', lat: 42.8048, lng: 140.6874 }
];

export const INITIAL_ITINERARY: DayPlan[] = [
  {
    id: 'day-1',
    date: new Date().toISOString().split('T')[0],
    resort: '二世谷聯合滑雪場 (Niseko United)',
    items: []
  }
];

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: 'g1', label: '滑雪板/單板', description: '檢查鋼邊與固定器螺絲。', category: '裝備', checked: false },
  { id: 'c1', label: 'Gore-Tex 外套', description: '防水透氣外層。', category: '衣物', checked: false },
  { id: 'd1', label: '海外滑雪保險', description: '需包含搜救費用。', category: '文件', checked: true }
];

export const SNOWBOARD_GUIDE: LearningGuide = {
  type: 'Snowboard',
  levels: [
    {
      level: '初階',
      skills: [
        { id: 'sb-1', title: '安全跌倒與護身', description: '學會如何安全跌倒以避免手腕與尾椎受傷。', keyPoints: ['往前摔用前臂緩衝', '往後摔縮下巴', '手切勿直接撐地'], isCompleted: false, videoUrl: 'https://www.youtube.com/results?search_query=snowboard+how+to+fall+safely' }
      ]
    }
  ]
};

export const SKI_GUIDE: LearningGuide = {
  type: 'Ski',
  levels: [
    {
      level: '初階',
      skills: [
        { id: 'sk-2', title: '全制動 (Pizza)', description: '利用板尾張開形成楔形來控制速度。', keyPoints: ['板尖保持拳頭寬', '內緣用力切雪'], isCompleted: false, videoUrl: 'https://www.youtube.com/results?search_query=skiing+snowplow+turn' }
      ]
    }
  ]
};
