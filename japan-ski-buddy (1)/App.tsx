
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckSquare, 
  Edit2, 
  Eye, 
  Plus, 
  Snowflake,
  MapPin,
  Trash2,
  CheckCircle2,
  Youtube,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Info,
  Clock,
  Circle,
  Scroll,
  X,
  Plane,
  PlaneTakeoff,
  Bus,
  Hotel,
  Share2,
  UserPlus,
  Copy,
  ThumbsUp,
  Utensils,
  Camera,
  Compass
} from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { AppView, DayPlan, ChecklistItem, LearningGuide, ItineraryItem, Skill, POI } from './types';
import { INITIAL_ITINERARY, INITIAL_CHECKLIST, SNOWBOARD_GUIDE, SKI_GUIDE, JAPAN_RESORTS, ResortInfo, resortToAirportMap, airportAdvice, INITIAL_POIS } from './constants';

// --- Vote Card Component (Wabi-sabi Style) ---

const VoteCard: React.FC<{ item: POI; onVote: (id: string, isVoted: boolean) => void }> = ({ item, onVote }) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-[#E2E0D5] wabi-shadow group transition-all hover:border-[#D8D6CD] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={item.imgUrl} 
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
            item.type === 'food' ? 'bg-[#43423E] text-[#F2F0E9]' : 'bg-[#7C786A] text-[#F2F0E9]'
          }`}>
            {item.type === 'food' ? <Utensils size={10}/> : <Camera size={10}/>}
            {item.type === 'food' ? '美食' : '景點'}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[#43423E] text-[10px] font-bold flex items-center gap-1 serif">
          ⭐ {item.rating}
        </div>
      </div>

      <div className="p-7">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <h4 className="text-xl font-black text-[#43423E] leading-tight serif">{item.name}</h4>
            <p className="text-[10px] text-[#B4B0A5] font-bold uppercase tracking-widest">{item.resortName.split('(')[0]}</p>
          </div>
          <a href={item.mapUrl} target="_blank" rel="noreferrer" className="text-[#B4B0A5] hover:text-[#43423E] transition-all p-2 bg-[#F2F0E9] rounded-xl">
            <MapPin size={18} />
          </a>
        </div>
        
        <p className="text-[11px] text-[#7C786A] mb-8 font-bold uppercase tracking-widest opacity-60">推薦人：{item.recommender}</p>

        <div className="flex items-center justify-between mt-2 pt-6 border-t border-[#F2F0E9]">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#EAE8DF] flex items-center justify-center text-[10px] shadow-sm">
                👤
              </div>
            ))}
            <span className="ml-4 text-[10px] font-bold text-[#B4B0A5] uppercase tracking-tighter">+{item.votes} 想去</span>
          </div>

          <button 
            onClick={() => onVote(item.id, !item.votedByMe)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all ${
              item.votedByMe 
              ? 'bg-[#43423E] text-[#F2F0E9] shadow-lg scale-95' 
              : 'bg-[#F2F0E9] text-[#7C786A] border border-[#D8D6CD] hover:bg-[#EAE8DF]'
            }`}
          >
            <ThumbsUp size={14} className={item.votedByMe ? 'fill-current' : ''} />
            {item.votedByMe ? '已收納' : '想去 +1'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Explore Section (POIs) ---

const ExploreSection: React.FC<{ 
  pois: POI[]; 
  currentResort: string;
  onVote: (id: string, isVoted: boolean) => void;
}> = ({ pois, currentResort, onVote }) => {
  const [filter, setFilter] = useState<'all' | 'food' | 'spot'>('all');
  
  const filteredPOIs = pois.filter(p => {
    const matchesResort = p.resortName === currentResort;
    const matchesType = filter === 'all' || p.type === filter;
    return matchesResort && matchesType;
  });

  return (
    <div className="space-y-12 pb-24">
      <div className="bg-[#EAE8DF] rounded-[2.5rem] p-10 border border-[#E2E0D5] wabi-shadow">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-[#B4B0A5]">
             <Compass size={18} />
             <span className="text-[11px] font-bold uppercase tracking-[0.5em]">探索目標</span>
          </div>
          <h2 className="text-3xl font-black text-[#43423E] serif leading-tight">{currentResort}</h2>
          <div className="flex gap-3 pt-4">
            {(['all', 'food', 'spot'] as const).map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${filter === f ? 'bg-[#43423E] text-[#F2F0E9]' : 'bg-white/40 text-[#7C786A] border border-[#D8D6CD]'}`}
              >
                {f === 'all' ? '全部' : f === 'food' ? '美食' : '景點'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filteredPOIs.length === 0 ? (
          <div className="py-24 text-center space-y-4 opacity-30">
            <Compass size={40} className="mx-auto" />
            <p className="serif text-sm italic tracking-[0.2em]">此雪場目前尚無雪友推薦項目</p>
          </div>
        ) : (
          filteredPOIs.map(poi => (
            <VoteCard key={poi.id} item={poi} onVote={onVote} />
          ))
        )}
      </div>

      <button className="w-full h-24 border-2 border-dashed border-[#B4B0A5] rounded-[2.5rem] flex items-center justify-center text-[#B4B0A5] hover:text-[#43423E] hover:bg-[#EAE8DF] transition-all text-[12px] font-bold uppercase tracking-[0.5em] group">
        <Plus size={24} className="mr-4 opacity-40 group-hover:opacity-100" /> 推薦新發現
      </button>
    </div>
  );
};

// --- Trip Invite Card Component ---

const TripInviteCard: React.FC<{ isOpen: boolean; onClose: () => void; tripName: string; resortName: string }> = ({ isOpen, onClose, tripName, resortName }) => {
  if (!isOpen) return null;

  const tripId = `trip-${Date.now()}`;
  const inviteUrl = `https://japanskibuddy.app/join/${tripId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    alert('邀請連結已複製！傳給 Line 群組吧 🏂');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#43423E]/60 backdrop-blur-md">
      <div className="bg-[#F2F0E9] w-full max-w-sm rounded-[3rem] border border-[#E2E0D5] overflow-hidden shadow-2xl animate-modal">
        <div className="p-8 flex flex-col items-center">
          <div className="w-full flex justify-end">
            <button onClick={onClose} className="text-[#B4B0A5] hover:text-[#43423E] transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="bg-white p-4 rounded-3xl mb-4 shadow-sm">
            <UserPlus className="text-[#43423E]" size={32} />
          </div>
          
          <h2 className="text-2xl font-black text-[#43423E] text-center mb-1 serif">{tripName}</h2>
          <p className="text-[#7C786A] text-[11px] font-bold uppercase tracking-widest mb-6 text-center">目標：{resortName}</p>

          <div className="p-5 bg-white border-4 border-white rounded-3xl shadow-inner mb-6">
            <QRCodeCanvas 
              value={inviteUrl} 
              size={180}
              fgColor="#43423E"
              bgColor="#ffffff"
              level="H"
            />
          </div>

          <p className="text-[10px] text-[#B4B0A5] mb-6 text-center serif leading-relaxed">
            讓朋友掃描 QR Code <br/> 或分享連結加入共享行程
          </p>

          <div className="flex gap-3 w-full">
            <button 
              onClick={copyToClipboard}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-[#E2E0D5] text-[#43423E] rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-[#EAE8DF] transition-all"
            >
              <Copy size={16} /> 複製連結
            </button>
            <button 
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#43423E] text-[#F2F0E9] rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-lg hover:bg-[#2A2926] transition-all"
            >
              <Share2 size={16} /> 分享
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Flight & Transport Logic Component ---

const FlightSearchCard: React.FC<{ resortName: string; date: string }> = ({ resortName, date }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestion, setSuggestion] = useState<any>(null);

  useEffect(() => {
    const resortPureName = resortName.split('(')[0].trim();
    const airportCode = resortToAirportMap[resortPureName] || "NRT";
    setSuggestion(airportAdvice[airportCode]);
  }, [resortName]);

  if (!suggestion) return null;

  const generateSkyscannerUrl = (destCode: string, startDate: string) => {
    const origin = 'tpe'; 
    const dateStr = startDate.replace(/-/g, '').slice(2); 
    return `https://www.skyscanner.com.tw/transport/flights/${origin}/${destCode.split(' ')[0].toLowerCase().replace('(', '')}/${dateStr}/?adultsv2=1&cabinclass=economy`;
  };

  return (
    <div className="w-full mb-8 animate-in fade-in duration-700">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-500 shadow-sm ${isExpanded ? 'bg-[#43423E] border-[#43423E] text-[#F2F0E9]' : 'bg-[#EAE8DF] border-[#D8D6CD] text-[#43423E]'}`}
      >
        <div className="flex items-center gap-5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isExpanded ? 'bg-white/10' : 'bg-white/40 text-[#B4B0A5]'}`}>
            <Plane size={24} />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-black serif uppercase tracking-widest">交通預估時間軸</h3>
            <p className={`text-[10px] font-bold tracking-tighter transition-opacity ${isExpanded ? 'text-[#B4B0A5]' : 'text-[#7C786A] opacity-60'}`}>
              桃園 TPE ➔ {suggestion.airport}
            </p>
          </div>
        </div>
        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

      {isExpanded && (
        <div className="mt-4 bg-white/60 backdrop-blur-sm rounded-[2.5rem] border border-[#E2E0D5] wabi-shadow overflow-hidden animate-in slide-in-from-top-4 duration-500">
          <div className="p-8 space-y-12">
            
            <div className="space-y-8">
              <h4 className="text-lg font-black text-[#43423E] serif flex items-center gap-3">
                <Clock className="text-[#B4B0A5]" size={20} /> 預估行程安排
              </h4>
              <div className="relative border-l-2 border-[#E2E0D5] ml-4 space-y-10 pb-4">
                <div className="relative pl-10">
                  <div className="absolute -left-4 bg-[#43423E] p-2.5 rounded-full ring-8 ring-[#F2F0E9]">
                    <Plane size={14} className="text-[#F2F0E9]" />
                  </div>
                  <h5 className="font-bold text-[#43423E] serif">桃園 ➔ {suggestion.airport}</h5>
                  <p className="text-[12px] text-[#7C786A] mt-1">建議班機抵達：{suggestion.time}</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute -left-2 w-4 h-4 bg-[#F2F0E9] rounded-full border-2 border-[#B4B0A5]"></div>
                  <h5 className="font-bold text-[#43423E] serif">緩衝時間：{suggestion.gap}</h5>
                  <p className="text-[12px] text-[#7C786A] mt-1">包含取雪具、買飯糰、找巴士月台。</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute -left-4 bg-[#B4B0A5] p-2.5 rounded-full ring-8 ring-[#F2F0E9]">
                    <Bus size={14} className="text-[#F2F0E9]" />
                  </div>
                  <h5 className="font-bold text-[#43423E] serif">接駁巴士 / 新幹線</h5>
                  <p className="text-[12px] text-[#7C786A] mt-1">預計車程：{suggestion.busTime}</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute -left-4 bg-[#7C786A] p-2.5 rounded-full ring-8 ring-[#F2F0E9]">
                    <Hotel size={14} className="text-[#F2F0E9]" />
                  </div>
                  <h5 className="font-bold text-[#43423E] serif">到達滑雪場</h5>
                  <p className="text-[12px] text-[#7C786A] mt-1">準備開滑！❄️</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-[#F2F0E9]">
              <div className="bg-[#EAE8DF]/50 p-6 rounded-2xl border border-[#D8D6CD]">
                <div className="flex items-center gap-3 mb-4 text-[#43423E]">
                   <Info size={16} className="text-[#B4B0A5]" />
                   <span className="text-[11px] font-bold uppercase tracking-widest serif">AI 提醒</span>
                </div>
                <p className="text-[13px] text-[#7C786A] leading-relaxed serif italic">
                  {suggestion.note}
                </p>
              </div>

              <a 
                href={generateSkyscannerUrl(suggestion.airport, date)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 w-full py-6 bg-[#43423E] text-[#F2F0E9] rounded-[1.5rem] text-[13px] font-bold tracking-[0.2em] shadow-lg hover:bg-[#2A2926] active:scale-95 transition-all serif uppercase"
              >
                <PlaneTakeoff size={20} />
                前往 Skyscanner 搜尋即時機票
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Resort Picker ---

const SkiResortPicker: React.FC<{ 
  onSelect: (resort: ResortInfo) => void;
  currentValue?: string;
  isMinimal?: boolean;
}> = ({ onSelect, currentValue, isMinimal = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const regions = Array.from(new Set(JAPAN_RESORTS.map(r => r.region)));

  return (
    <div className={`space-y-6 w-full ${isMinimal ? '' : 'max-w-md mx-auto'}`}>
      <button 
        onClick={() => setIsOpen(true)}
        className={`w-full flex items-center justify-between p-6 bg-[#F2F0E9] border border-[#D8D6CD] rounded-[2rem] font-bold text-[#43423E] serif shadow-sm hover:border-[#43423E] transition-all ${isMinimal ? 'text-md' : 'text-lg'}`}
      >
        <div className="flex items-center gap-4">
          <MapPin size={20} className="text-[#B4B0A5]" />
          <span className="truncate">{currentValue || "選擇滑雪場資訊"}</span>
        </div>
        <ChevronDown size={20} className="text-[#B4B0A5] flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-[#43423E]/20 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#F2F0E9] w-full max-w-lg h-[80vh] rounded-[3rem] border border-[#E2E0D5] flex flex-col overflow-hidden wabi-shadow animate-modal">
            <div className="p-8 border-b border-[#E2E0D5] flex items-center justify-between bg-white/40">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 bg-[#43423E] rounded-full" />
                <h3 className="text-[12px] font-bold uppercase tracking-[0.6em] text-[#7C786A] serif">滑雪場名錄</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#B4B0A5] hover:text-[#43423E] p-2">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {regions.map(region => (
                <div key={region} className="space-y-3">
                  <button 
                    onClick={() => setExpandedRegion(expandedRegion === region ? null : region)}
                    className={`w-full text-left p-6 rounded-[1.5rem] border transition-all flex items-center justify-between ${expandedRegion === region ? 'bg-[#43423E] text-[#F2F0E9] border-[#43423E]' : 'bg-white/40 border-[#E2E0D5] text-[#7C786A] hover:bg-white/60'}`}
                  >
                    <span className="font-bold tracking-widest serif">{region}</span>
                    {expandedRegion === region ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedRegion === region && (
                    <div className="grid grid-cols-1 gap-3 animate-in slide-in-from-top-4">
                      {JAPAN_RESORTS.filter(r => r.region === region).map(resort => (
                        <button
                          key={resort.en}
                          onClick={() => {
                            onSelect(resort);
                            setIsOpen(false);
                          }}
                          className="w-full text-left p-6 bg-white/60 hover:bg-white rounded-[1.5rem] border border-[#E2E0D5] transition-all group flex items-center justify-between"
                        >
                          <div className="serif">
                            <span className="block font-bold text-[#43423E] text-md">{resort.cn}</span>
                            <span className="text-[10px] font-bold text-[#B4B0A5] tracking-[0.1em] uppercase">{resort.en}</span>
                          </div>
                          <ChevronRight size={18} className="text-[#D8D6CD] group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Itinerary Section ---

const ItinerarySection: React.FC<{
  plans: DayPlan[];
  isEditing: boolean;
  onUpdate: (newPlans: DayPlan[]) => void;
}> = ({ plans, isEditing, onUpdate }) => {
  const [selectedDayId, setSelectedDayId] = useState(plans[0]?.id);
  const selectedDay = plans.find(p => p.id === selectedDayId) || plans[0];

  const updateItem = (itemId: string, field: keyof ItineraryItem, value: string) => {
    onUpdate(plans.map(p => p.id === selectedDayId ? {
      ...p,
      items: p.items.map(item => item.id === itemId ? { ...item, [field]: value } : item)
    } : p));
  };

  return (
    <div className="space-y-12 pb-24">
      <div className="flex gap-5 overflow-x-auto pb-6 no-scrollbar -mx-6 px-6">
        {plans.map((day) => (
          <button
            key={day.id}
            onClick={() => setSelectedDayId(day.id)}
            className={`flex-shrink-0 w-20 h-28 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all border ${
              selectedDayId === day.id 
                ? 'bg-[#43423E] border-[#43423E] text-[#F2F0E9] wabi-shadow scale-105' 
                : 'bg-[#EAE8DF] border-[#E2E0D5] text-[#7C786A] hover:bg-[#E2E0D5]'
            }`}
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-60">
              {new Date(day.date).toLocaleDateString('zh-TW', { month: 'short' })}
            </span>
            <span className="text-3xl font-black serif">
              {new Date(day.date).getDate()}
            </span>
          </button>
        ))}
        {isEditing && (
          <button onClick={() => {
            const last = plans[plans.length-1];
            const d = new Date(last.date); d.setDate(d.getDate()+1);
            onUpdate([...plans, { ...last, id: Date.now().toString(), date: d.toISOString().split('T')[0], items: [] }]);
          }} className="flex-shrink-0 w-20 h-28 rounded-2xl border-2 border-dashed border-[#B4B0A5] flex items-center justify-center text-[#B4B0A5] hover:text-[#7C786A] transition-all">
            <Plus size={32} />
          </button>
        )}
      </div>

      {selectedDay && (
        <div className="space-y-10 animate-in fade-in duration-700">
          <div className="bg-[#EAE8DF] rounded-[2.5rem] p-10 border border-[#E2E0D5] wabi-shadow space-y-10">
             <div className="space-y-8">
                <div className="flex items-center gap-3">
                   <Calendar size={18} className="text-[#7C786A] opacity-40" />
                   <span className="font-bold text-[11px] uppercase tracking-[0.5em] text-[#7C786A]">日誌核心</span>
                </div>
                <div className="space-y-10">
                  <div>
                    <label className="text-[10px] font-bold text-[#B4B0A5] uppercase tracking-widest mb-4 block">Ski Resort / 雪場選擇</label>
                    {isEditing ? (
                       <SkiResortPicker 
                        currentValue={selectedDay.resort}
                        onSelect={(resort) => onUpdate(plans.map(p => p.id === selectedDayId ? {...p, resort: `${resort.cn} (${resort.en})`} : p))}
                       />
                    ) : (
                      <h2 className="text-4xl font-black text-[#43423E] tracking-tighter serif">{selectedDay.resort}</h2>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#B4B0A5] uppercase tracking-widest mb-3 block">Travel Date / 計畫日期</label>
                    {isEditing ? (
                      <input 
                        type="date" 
                        value={selectedDay.date} 
                        onChange={(e) => onUpdate(plans.map(p => p.id === selectedDayId ? { ...p, date: e.target.value } : p))}
                        className="w-full text-lg font-bold bg-[#F2F0E9] border border-[#D8D6CD] rounded-[1.5rem] p-5 outline-none focus:border-[#43423E] transition-all serif"
                      />
                    ) : (
                      <p className="text-[#7C786A] text-lg font-medium tracking-tight serif">{new Date(selectedDay.date).toLocaleDateString('zh-TW', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    )}
                  </div>
                </div>
             </div>
          </div>

          {!isEditing && (
            <FlightSearchCard resortName={selectedDay.resort} date={selectedDay.date} />
          )}

          <div className="space-y-6">
            <div className="flex items-center gap-4 px-3">
               <div className="w-1.5 h-1.5 bg-[#43423E] rounded-full opacity-30" />
               <h3 className="text-[12px] font-bold text-[#43423E] uppercase tracking-[0.7em] serif opacity-30">行程活動</h3>
               <div className="flex-1 h-[1px] bg-[#E2E0D5] opacity-30" />
            </div>
            {selectedDay.items.length === 0 && !isEditing && (
              <div className="py-20 text-center space-y-4 opacity-30">
                <Snowflake size={32} className="mx-auto" />
                <p className="serif text-sm italic tracking-[0.2em]">點擊編輯圖示開始安排行程</p>
              </div>
            )}
            {selectedDay.items.map(item => (
              <div key={item.id} className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 border border-[#E2E0D5] wabi-shadow flex flex-col sm:flex-row sm:items-center gap-8 group">
                {isEditing ? (
                  <div className="flex-1 space-y-5">
                    <div className="flex gap-4">
                      <div className="relative w-36">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B4B0A5]" size={16} />
                        <input 
                          type="time" 
                          value={item.time}
                          onChange={(e) => updateItem(item.id, 'time', e.target.value)}
                          className="w-full text-sm font-bold bg-[#F2F0E9] border border-[#D8D6CD] rounded-xl p-3.5 pl-12 outline-none"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={item.activity}
                        onChange={(e) => updateItem(item.id, 'activity', e.target.value)}
                        className="flex-1 text-base font-bold bg-[#F2F0E9] border border-[#D8D6CD] rounded-xl p-3.5 outline-none"
                        placeholder="活動內容"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                       <MapPin size={14} className="text-[#B4B0A5]" />
                       <input 
                        type="text" 
                        value={item.location}
                        onChange={(e) => updateItem(item.id, 'location', e.target.value)}
                        className="flex-1 text-[12px] font-medium text-[#7C786A] bg-transparent border-b border-[#E2E0D5] py-2 outline-none"
                        placeholder="詳細地點"
                      />
                      <button onClick={() => onUpdate(plans.map(p => p.id === selectedDayId ? {...p, items: p.items.filter(i => i.id !== item.id)} : p))} className="text-[#B4B0A5] hover:text-[#43423E] p-2 transition-colors"><Trash2 size={18}/></button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-[#7C786A] w-20 border-r border-[#F2F0E9] pr-8 flex flex-col items-center justify-center text-center">
                      <span className="text-4xl font-black text-[#43423E] leading-none serif">{item.time.split(':')[0]}</span>
                      <span className="text-[11px] font-bold opacity-40 mt-2 uppercase tracking-tighter">{item.time.split(':')[1]} min</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#43423E] tracking-tight text-xl serif group-hover:translate-x-1 transition-transform">{item.activity}</h4>
                      {item.location && <div className="text-[11px] text-[#7C786A] mt-3 flex items-center gap-2 font-bold uppercase tracking-widest opacity-60"><MapPin size={12} />{item.location}</div>}
                    </div>
                  </>
                )}
              </div>
            ))}
            
            {isEditing && (
              <button 
                onClick={() => onUpdate(plans.map(p => p.id === selectedDayId ? {...p, items: [...p.items, {id: Date.now().toString(), time: '09:00', activity: '新增活動', location: '', type: 'skiing'}]} : p))}
                className="w-full h-20 border-2 border-dashed border-[#B4B0A5] rounded-[2rem] flex items-center justify-center text-[#B4B0A5] hover:text-[#43423E] hover:bg-[#EAE8DF] transition-all text-[12px] font-bold uppercase tracking-[0.5em] group"
              >
                <Plus size={24} className="mr-4 opacity-40 group-hover:opacity-100" /> 新增活動
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Other Sections (Learning, Checklist) ---

const LearningSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Snowboard' | 'Ski'>('Snowboard');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const guide = activeTab === 'Snowboard' ? SNOWBOARD_GUIDE : SKI_GUIDE;

  return (
    <div className="space-y-12 pb-24">
      <div className="flex p-2 bg-[#EAE8DF] rounded-[2.5rem] max-w-[340px] mx-auto border border-[#E2E0D5]">
        {(['Snowboard', 'Ski'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 rounded-[2rem] text-[11px] font-bold tracking-[0.3em] transition-all ${activeTab === tab ? 'bg-[#43423E] text-[#F2F0E9] wabi-shadow' : 'text-[#7C786A] hover:text-[#43423E]'}`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {guide.levels.map((level) => (
        <div key={level.level} className="space-y-6">
          <div className="flex items-center gap-4 px-3">
             <Circle size={8} fill="#43423E" stroke="none" className="opacity-60" />
             <h3 className="text-[12px] font-bold text-[#43423E] uppercase tracking-[0.7em] serif">{level.level} 課程</h3>
             <div className="flex-1 h-[1px] bg-[#E2E0D5]" />
          </div>
          <div className="space-y-4">
            {level.skills.map(skill => (
              <div key={skill.id} className="border border-[#E2E0D5] rounded-[2.5rem] overflow-hidden bg-white/40 wabi-shadow transition-all">
                <div 
                  onClick={() => setExpandedId(expandedId === skill.id ? null : skill.id)}
                  className={`flex items-center gap-7 p-8 cursor-pointer transition-all ${expandedId === skill.id ? 'bg-[#F2F0E9]/50' : 'hover:bg-[#F2F0E9]/30'}`}
                >
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center border-2 transition-all ${skill.isCompleted ? 'bg-[#43423E] border-[#43423E] text-white' : 'border-[#D8D6CD] text-transparent'}`}>
                    <CheckCircle2 size={16} />
                  </div>
                  <h4 className="flex-1 font-bold text-lg text-[#43423E] serif">{skill.title}</h4>
                  {expandedId === skill.id ? <ChevronUp size={20} className="text-[#B4B0A5]" /> : <ChevronRight size={20} className="text-[#B4B0A5]" />}
                </div>
                {expandedId === skill.id && (
                  <div className="px-8 pb-12 bg-[#F2F0E9]/20 animate-in slide-in-from-top-4 duration-500">
                    <div className="pt-8 border-t border-[#E2E0D5] space-y-10">
                      <p className="text-[14px] text-[#7C786A] leading-relaxed font-medium serif">{skill.description}</p>
                      {skill.keyPoints && (
                        <div className="grid grid-cols-1 gap-4">
                          {skill.keyPoints.map((pt, i) => (
                            <div key={i} className="flex items-start gap-4 bg-[#EAE8DF]/40 p-4 rounded-2xl border border-[#D8D6CD] text-[12px] font-bold text-[#43423E] serif">
                              <span className="text-[#B4B0A5]">○ {i+1}</span> {pt}
                            </div>
                          ))}
                        </div>
                      )}
                      {skill.videoUrl && (
                        <a href={skill.videoUrl} target="_blank" className="flex items-center justify-center gap-4 bg-[#43423E] text-[#F2F0E9] py-5 rounded-[2rem] text-[11px] font-bold tracking-[0.4em] uppercase shadow-xl transition-all serif">
                          <Youtube size={20} /> 教學影片
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const ChecklistSection: React.FC<{
  items: ChecklistItem[];
  isEditing: boolean;
  onUpdate: (newItems: ChecklistItem[]) => void;
}> = ({ items, isEditing, onUpdate }) => {
  const categories = Array.from(new Set(items.map(i => i.category)));
  return (
    <div className="space-y-16 pb-24">
      {categories.map(cat => (
        <div key={cat} className="space-y-8">
          <div className="flex items-center gap-5 px-3">
            <div className="w-1.5 h-1.5 bg-[#43423E] rounded-full" />
            <h3 className="text-[12px] font-bold uppercase text-[#7C786A] tracking-[0.6em] serif">{cat}</h3>
            <div className="flex-1 h-[1px] bg-[#E2E0D5]" />
          </div>
          <div className="space-y-4">
            {items.filter(i => i.category === cat).map(item => (
              <div key={item.id} className="bg-white/40 rounded-[2rem] p-7 border border-[#E2E0D5] wabi-shadow flex items-start gap-6 group">
                <button 
                  onClick={() => onUpdate(items.map(i => i.id === item.id ? {...i, checked: !i.checked} : i))} 
                  className={`mt-1 w-8 h-8 rounded-xl flex items-center justify-center transition-all border-2 ${item.checked ? 'bg-[#43423E] border-[#43423E] text-white shadow-lg' : 'border-[#D8D6CD] text-transparent'}`}
                >
                  <CheckCircle2 size={18} strokeWidth={2.5} />
                </button>
                <div className="flex-1">
                  <h4 className={`font-bold text-lg serif transition-all ${item.checked ? 'text-[#B4B0A5] line-through' : 'text-[#43423E]'}`}>{item.label}</h4>
                  {item.description && <p className={`text-[12px] mt-2 font-medium transition-colors ${item.checked ? 'text-[#D8D6CD]' : 'text-[#7C786A]'}`}>{item.description}</p>}
                </div>
                {isEditing && (
                  <button onClick={() => onUpdate(items.filter(i => i.id !== item.id))} className="text-[#B4B0A5] hover:text-[#43423E] p-2 transition-colors"><Trash2 size={20}/></button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>('itinerary');
  const [isEditing, setIsEditing] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [itinerary, setItinerary] = useState<DayPlan[]>(INITIAL_ITINERARY);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [pois, setPois] = useState<POI[]>(INITIAL_POIS);

  const currentResort = itinerary[0]?.resort || '二世谷聯合滑雪場 (Niseko United)';

  const handleVote = (id: string, isVoted: boolean) => {
    setPois(prev => prev.map(p => {
      if (p.id === id) {
        return { 
          ...p, 
          votes: isVoted ? p.votes + 1 : p.votes - 1, 
          votedByMe: isVoted 
        };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen pb-40 bg-[#F2F0E9] antialiased">
      <header className="sticky top-0 z-40 glass-header px-8 pt-20 pb-12 border-b border-[#E2E0D5]">
        <div className="max-w-2xl mx-auto flex items-end justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-4 text-[#B4B0A5]">
              <Snowflake size={20} strokeWidth={1.5} className="animate-pulse" />
              <span className="font-bold text-[12px] uppercase tracking-[0.8em] opacity-60 serif">SNOW / SPIRIT</span>
            </div>
            <h1 className="text-4xl font-black text-[#43423E] tracking-tighter serif">
              {activeView === 'itinerary' && '冬日規劃'}
              {activeView === 'explore' && '雪場探索'}
              {activeView === 'checklist' && '行囊檢查'}
              {activeView === 'learning' && '滑走秘笈'}
            </h1>
          </div>
          <div className="flex gap-4">
            {activeView === 'itinerary' && (
              <button 
                onClick={() => setIsInviteOpen(true)}
                className="w-16 h-16 rounded-[1.5rem] bg-white/40 border border-[#E2E0D5] flex items-center justify-center text-[#B4B0A5] hover:text-[#43423E] shadow-sm transition-all"
              >
                <UserPlus size={24} />
              </button>
            )}
            {(activeView === 'itinerary' || activeView === 'checklist') && (
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 ${isEditing ? 'bg-[#43423E] text-[#F2F0E9] shadow-2xl scale-110' : 'bg-white/40 border border-[#E2E0D5] text-[#B4B0A5] shadow-sm hover:text-[#43423E]'}`}
              >
                {isEditing ? <Eye size={24} /> : <Edit2 size={24} />}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="px-8 mt-16 max-w-2xl mx-auto">
        {activeView === 'itinerary' && (
          <ItinerarySection 
            plans={itinerary} 
            isEditing={isEditing} 
            onUpdate={setItinerary} 
          />
        )}
        {activeView === 'explore' && (
          <ExploreSection 
            pois={pois}
            currentResort={currentResort}
            onVote={handleVote}
          />
        )}
        {activeView === 'checklist' && (
          <ChecklistSection 
            items={checklist} 
            isEditing={isEditing} 
            onUpdate={setChecklist} 
          />
        )}
        {activeView === 'learning' && <LearningSection />}
      </main>

      <TripInviteCard 
        isOpen={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)} 
        tripName="2026 粉雪之旅"
        resortName={currentResort}
      />

      <nav className="fixed bottom-0 left-0 right-0 z-[60] px-8 py-10 glass-header border-t border-[#E2E0D5]">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <NavButton active={activeView === 'itinerary'} onClick={() => setActiveView('itinerary')} icon={<Calendar size={28} />} label="計畫" />
          <NavButton active={activeView === 'explore'} onClick={() => setActiveView('explore')} icon={<Compass size={28} />} label="探索" />
          <NavButton active={activeView === 'checklist'} onClick={() => setActiveView('checklist')} icon={<CheckSquare size={28} />} label="行囊" />
          <NavButton active={activeView === 'learning'} onClick={() => setActiveView('learning')} icon={<Scroll size={28} />} label="秘笈" />
        </div>
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-4 transition-all duration-700 flex-1 ${active ? 'text-[#43423E]' : 'text-[#B4B0A5] hover:text-[#7C786A]'}`}
  >
    <div className={`transition-all duration-700 ${active ? 'scale-125 -translate-y-4 shadow-xl' : 'opacity-40'}`}>
      {icon}
    </div>
    <span className={`text-[11px] font-bold tracking-[0.4em] uppercase transition-all duration-700 serif ${active ? 'opacity-100' : 'opacity-30'}`}>{label}</span>
  </button>
);

export default App;
