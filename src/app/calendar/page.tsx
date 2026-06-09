'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import SiteLayout from '@/components/SiteLayout';
import { CHINESE_NEW_YEAR_DATES } from '@/lib/astrology/newYearDates';
import { getActiveProfile, ddmmyyyyToISO } from '@/hooks/useProfile';
import { getStoredMode } from '@/hooks/useMode';
import CalendarGuide from '@/components/CalendarGuide';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WEEKDAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const CHINESE_ZODIAC = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
const ZODIAC_SYMBOLS: Record<string,string> = { Aries:'♈',Taurus:'♉',Gemini:'♊',Cancer:'♋',Leo:'♌',Virgo:'♍',Libra:'♎',Scorpio:'♏',Sagittarius:'♐',Capricorn:'♑',Aquarius:'♒',Pisces:'♓' };
const CHINESE_EMOJI: Record<string,string> = { Rat:'🐀',Ox:'🐂',Tiger:'🐅',Rabbit:'🐇',Dragon:'🐉',Snake:'🐍',Horse:'🐴',Goat:'🐐',Monkey:'🐒',Rooster:'🐓',Dog:'🐕',Pig:'🐖' };
const DAY_MEANINGS: Record<number,string> = { 1:'New Beginnings',2:'Cooperation',3:'Expression',4:'Foundation',5:'Change',6:'Harmony',7:'Reflection',8:'Abundance',9:'Completion',11:'Master Intuition',22:'Master Builder',33:'Master Teacher' };
const NUM_COLORS: Record<number,string> = { 1:'#c6a85b',2:'#7b9ec9',3:'#e07b6a',4:'#54ab8c',5:'#b07edb',6:'#e8b86d',7:'#6ab0c9',8:'#c97070',9:'#7bc98a',11:'#e8d5ff',22:'#ffd700',33:'#54ab8c' };
const PERSONAL_COLOR = '#54ab8c';

const EVENT_TYPES = [
  { value:'reminder', label:'🔔 Reminder', color:'#c6a85b' },
  { value:'meeting',  label:'💼 Meeting',  color:'#7b9ec9' },
  { value:'important',label:'⭐ Important',color:'#e07b6a' },
  { value:'personal', label:'🌿 Personal', color:'#54ab8c' },
  { value:'spiritual',label:'✨ Spiritual',color:'#b07edb' },
];

// ─── Storage ──────────────────────────────────────────────────

interface DayEntry { note: string; eventType: string; eventLabel: string; }
const NOTES_PREFIX = 'astroguider_cal_';

function storageKey(y:number,m:number,d:number){ return `${NOTES_PREFIX}${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`; }
function loadEntry(y:number,m:number,d:number): DayEntry|null {
  if(typeof window==='undefined') return null;
  try { const r=localStorage.getItem(storageKey(y,m,d)); return r?JSON.parse(r):null; } catch{ return null; }
}
function saveEntry(y:number,m:number,d:number,e:DayEntry){
  if(typeof window==='undefined') return;
  try{
    if(!e.note.trim()&&!e.eventType) localStorage.removeItem(storageKey(y,m,d));
    else localStorage.setItem(storageKey(y,m,d),JSON.stringify(e));
  }catch{}
}
function loadMonthEntries(y:number,m:number): Record<number,boolean> {
  if(typeof window==='undefined') return {};
  try{
    const result:Record<number,boolean>={};
    const prefix=`${NOTES_PREFIX}${y}-${String(m).padStart(2,'0')}-`;
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k?.startsWith(prefix)){
        const d=parseInt(k.slice(-2));
        if(!isNaN(d)) result[d]=true;
      }
    }
    return result;
  }catch{ return {}; }
}

// ─── Numerology ───────────────────────────────────────────────

function reduceToSingle(n:number):number {
  if(n===11||n===22||n===33) return n;
  while(n>9){ n=String(n).split('').reduce((a,d)=>a+Number(d),0); if(n===11||n===22||n===33) return n; }
  return n;
}
function digitSum(s:string):number { return s.split('').reduce((a,d)=>a+Number(d),0); }
function getUniversalDay(y:number,m:number,d:number){ const t=digitSum(`${y}${m}${d}`); return {totalSum:t,reduced:reduceToSingle(t)}; }
function getUniversalMonth(y:number,m:number){ const t=digitSum(`${y}${m}`); return {totalSum:t,reduced:reduceToSingle(t)}; }

function getPersonalYear(bd:string,y:number,m:number):number {
  const b=new Date(bd+'T12:00:00');
  const bMonth=b.getMonth()+1;
  const bDay=b.getDate();
  const refDate=new Date(y,m-1,1);
  const birthdayThisYear=new Date(y,bMonth-1,bDay);
  const cycleBaseYear=refDate>=birthdayThisYear?y:y-1;
  return reduceToSingle(cycleBaseYear+bMonth+bDay);
}
function getPersonalMonth(bd:string,y:number,m:number):number {
  const py=getPersonalYear(bd,y,m);
  return reduceToSingle(py+m);
}
function getPersonalDay(bd:string,y:number,m:number,d:number):number {
  const pm=getPersonalMonth(bd,y,m);
  return reduceToSingle(pm+d);
}

function getWesternZodiac(m:number,d:number):string {
  if((m===1&&d>=20)||(m===2&&d<=18)) return 'Aquarius';
  if((m===2&&d>=19)||(m===3&&d<=20)) return 'Pisces';
  if((m===3&&d>=21)||(m===4&&d<=19)) return 'Aries';
  if((m===4&&d>=20)||(m===5&&d<=20)) return 'Taurus';
  if((m===5&&d>=21)||(m===6&&d<=20)) return 'Gemini';
  if((m===6&&d>=21)||(m===7&&d<=22)) return 'Cancer';
  if((m===7&&d>=23)||(m===8&&d<=22)) return 'Leo';
  if((m===8&&d>=23)||(m===9&&d<=22)) return 'Virgo';
  if((m===9&&d>=23)||(m===10&&d<=22)) return 'Libra';
  if((m===10&&d>=23)||(m===11&&d<=21)) return 'Scorpio';
  if((m===11&&d>=22)||(m===12&&d<=21)) return 'Sagittarius';
  return 'Capricorn';
}
function getChineseZodiac(date:Date):string {
  const y=date.getFullYear(); const cny=CHINESE_NEW_YEAR_DATES[y];
  const ly=(cny&&date<cny)?y-1:y;
  return CHINESE_ZODIAC[((ly-4)%12+12)%12];
}
function getWeekNumber(date:Date):number {
  const first=new Date(date.getFullYear(),0,1);
  const past=(date.getTime()-first.getTime())/86400000;
  return Math.ceil((past+first.getDay()+1)/7);
}

// ─── Day Modal ────────────────────────────────────────────────

interface SelectedDay { day:number; month:number; year:number; }

function DayEditor({ selected, birthDate, onClose, onSaved }:{ selected:SelectedDay; birthDate:string|null; onClose:()=>void; onSaved:()=>void; }) {
  const {day,month,year}=selected;
  const existing=loadEntry(year,month,day);
  const [note,setNote]=useState(existing?.note??'');
  const [eventType,setEventType]=useState(existing?.eventType??'');
  const [eventLabel,setEventLabel]=useState(existing?.eventLabel??'');

  const date=new Date(year,month-1,day);
  const formatted=date.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const zodiac=getWesternZodiac(month,day);
  const chineseSign=getChineseZodiac(date);
  const uDay=getUniversalDay(year,month,day);
  const uColor=NUM_COLORS[uDay.reduced]??'#c6a85b';
  const pDay=birthDate?getPersonalDay(birthDate,year,month,day):null;
  const selectedEvent=EVENT_TYPES.find(t=>t.value===eventType);

  const handleSave=()=>{ saveEntry(year,month,day,{note,eventType,eventLabel}); onSaved(); onClose(); };
  const handleClear=()=>{ saveEntry(year,month,day,{note:'',eventType:'',eventLabel:''}); onSaved(); onClose(); };

  return (
    <div className="bg-[#16181d] border border-zinc-800 rounded-xl overflow-hidden mb-6">
      <div className="px-5 pt-4 pb-4 border-b border-zinc-800">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-zinc-200 text-sm font-semibold">{formatted}</p>
            <p className="text-zinc-500 text-[11px] mt-1">{ZODIAC_SYMBOLS[zodiac]} {zodiac} · {CHINESE_EMOJI[chineseSign]} {chineseSign}</p>
          </div>
          <button onClick={onClose} className="text-zinc-600 hover:text-zinc-300 transition-colors text-lg flex-shrink-0 mt-0.5">✕</button>
        </div>
        <div className="flex items-center gap-x-8 gap-y-3 mt-3 flex-wrap">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Universal</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-bold font-mono px-2 py-[2px] rounded" style={{color:uColor,backgroundColor:`${uColor}22`}}>
                {uDay.totalSum}/{uDay.reduced}{(uDay.reduced===11||uDay.reduced===22||uDay.reduced===33)&&<span className="ml-[2px] text-[9px]">✦</span>}
              </span>
              <span className="text-[11px]" style={{color:`${uColor}99`}}>{DAY_MEANINGS[uDay.reduced]}</span>
            </div>
          </div>
          {pDay!==null&&(
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Personal</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-bold font-mono px-2 py-[2px] rounded" style={{color:PERSONAL_COLOR,backgroundColor:`${PERSONAL_COLOR}22`}}>
                  ◎{pDay}{(pDay===11||pDay===22||pDay===33)&&<span className="ml-[2px] text-[9px]">✦</span>}
                </span>
                <span className="text-[11px]" style={{color:`${PERSONAL_COLOR}99`}}>{DAY_MEANINGS[pDay]}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-4 space-y-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Event type</label>
          <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map(t=>(
              <button key={t.value} onClick={()=>setEventType(eventType===t.value?'':t.value)}
                className="px-3 py-1.5 rounded-lg text-xs border transition-colors"
                style={eventType===t.value
                  ?{backgroundColor:t.color,borderColor:t.color,color:'#0b0c10'}
                  :{backgroundColor:'transparent',borderColor:'#3f3f46',color:'#a1a1aa'}}>
                {t.label}
              </button>
            ))}
          </div>
          {eventType&&(
            <input value={eventLabel} onChange={e=>setEventLabel(e.target.value)}
              placeholder={`${selectedEvent?.label.replace(/^.+? /,'')} title...`}
              className="mt-2 block w-full box-border bg-[#0b0c10] border border-zinc-800 px-3 py-2 rounded-lg text-zinc-200 placeholder-zinc-600 focus:border-[#c6a85b] focus:outline-none text-sm" />
          )}
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Note</label>
          <textarea value={note} onChange={e=>setNote(e.target.value)}
            placeholder="Write something about this day..."
            rows={4}
            className="block w-full box-border bg-[#0b0c10] border border-zinc-800 px-3 py-2 rounded-lg text-zinc-200 placeholder-zinc-600 focus:border-[#c6a85b] focus:outline-none text-sm resize-none" />
        </div>
      </div>

      <div className="px-5 py-4 border-t border-zinc-800 flex gap-3">
        <button onClick={handleSave}
          className="flex-1 min-h-[44px] bg-[#c6a85b] hover:bg-[#b8964a] text-[#0b0c10] font-semibold rounded-lg transition-colors text-sm">
          Save
        </button>
        {(existing?.note||existing?.eventType)&&(
          <button onClick={handleClear}
            className="px-4 min-h-[44px] border border-zinc-700 hover:border-red-900 text-zinc-500 hover:text-red-400 rounded-lg transition-colors text-sm">
            Clear
          </button>
        )}
        <button onClick={onClose}
          className="px-4 min-h-[44px] border border-zinc-700 hover:border-zinc-500 text-zinc-400 rounded-lg transition-colors text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Week label ───────────────────────────────────────────────

function WeekLabel({n}:{n:number}) {
  return <div className="flex items-center justify-center"><span className="text-[10px] font-mono text-zinc-600 tracking-widest">W{n}</span></div>;
}

// ─── Day Card ─────────────────────────────────────────────────

interface DayCell { day:number; month:number; year:number; isToday:boolean; isCurrentMonth:boolean; }

function DayCard({ cell,birthDate,hasEntry,eventType,isSelected,onSelect }:{
  cell:DayCell; birthDate:string|null; hasEntry:boolean; eventType?:string; isSelected:boolean; onSelect:(c:DayCell)=>void;
}) {
  const {day,month,year,isToday,isCurrentMonth}=cell;
  if(!isCurrentMonth) return <div className="rounded-lg bg-transparent" />;

  const date=new Date(year,month-1,day);
  const weekdayShort=date.toLocaleDateString('en-GB',{weekday:'short'});
  const zodiac=getWesternZodiac(month,day);
  const chineseSign=getChineseZodiac(date);
  const uDay=getUniversalDay(year,month,day);
  const color=NUM_COLORS[uDay.reduced]??'#c6a85b';
  const meaning=DAY_MEANINGS[uDay.reduced]??'';
  const isMaster=uDay.reduced===11||uDay.reduced===22||uDay.reduced===33;
  const pDay=birthDate?getPersonalDay(birthDate,year,month,day):null;
  const pIsMaster=pDay===11||pDay===22||pDay===33;
  const eventColor=EVENT_TYPES.find(t=>t.value===eventType)?.color;

  const borderStyle = hasEntry&&eventColor
    ? {borderColor:eventColor,boxShadow:`0 0 8px ${eventColor}33`}
    : hasEntry
    ? {borderColor:'#c6a85b',boxShadow:'0 0 8px rgba(198,168,91,0.2)'}
    : isToday
    ? {borderColor:'#c6a85b'}
    : {borderColor:'#3f3f46'};

  return (
    <button
      type="button"
      onPointerUp={() => onSelect(cell)}
      onTouchEnd={() => onSelect(cell)}
      onClick={() => onSelect(cell)}
      className={`print-keep relative rounded-lg p-2 pb-3 flex flex-col gap-1.5 transition-all duration-150 border text-left w-full cursor-pointer hover:border-zinc-500 text-zinc-200 min-h-[90px] ${isToday?'bg-[#1e1c14]':'bg-[#16181d]'} ${isSelected?'ring-2 ring-[#c6a85b] ring-offset-0':''}`}
      style={borderStyle}>

      {/* Day number + weekday */}
      <div className="flex items-baseline justify-between mb-0.5">
        <span
          className="font-serif font-bold leading-none"
          style={{ fontSize: 'clamp(14px, 2.2vw, 19px)', color: isToday ? '#c6a85b' : '#f4f4f5' }}
        >
          {day}
        </span>
        <span className="text-[9px] text-zinc-600 uppercase tracking-wider hidden sm:block">{weekdayShort}</span>
      </div>

      {/* Universal day */}
      <span className="text-[10px] font-bold font-mono leading-none px-1.5 py-[3px] rounded self-start" style={{color, backgroundColor:`${color}22`}}>
        {uDay.totalSum}/{uDay.reduced}{isMaster&&<span className="ml-[2px] text-[8px]">✦</span>}
      </span>

      {/* Personal day */}
      {pDay!==null&&(
        <span className="text-[10px] font-bold font-mono leading-none px-1.5 py-[3px] rounded self-start" style={{color:PERSONAL_COLOR,backgroundColor:`${PERSONAL_COLOR}22`}}>
          ◎{pDay}{pIsMaster&&<span className="ml-[2px] text-[8px]">✦</span>}
        </span>
      )}

      {/* Meaning — vain isommilla näytöillä */}
      <div className="text-[8px] leading-snug hidden lg:block mt-0.5" style={{color:`${color}99`}}>{meaning}</div>

      {/* Zodiac symbols — alhaalla, himmennetty */}
      <div className="flex items-center gap-1 mt-auto pt-1.5 border-t border-zinc-800/50">
        <span className="text-[10px] opacity-50" title={zodiac}>{ZODIAC_SYMBOLS[zodiac]??''}</span>
        <span className="text-[10px] opacity-50" title={chineseSign}>{CHINESE_EMOJI[chineseSign]??''}</span>
      </div>

      {/* Indicator dot */}
      {hasEntry&&(
        <span className="absolute top-1.5 right-1.5 w-[5px] h-[5px] rounded-full" style={{backgroundColor:eventColor??'#c6a85b'}} />
      )}
      {!hasEntry&&isToday&&(
        <span className="absolute top-1.5 right-1.5 w-[5px] h-[5px] rounded-full bg-[#c6a85b]" />
      )}
    </button>
  );
}

// ─── Legend ───────────────────────────────────────────────────

function Legend({showPersonal}:{showPersonal:boolean}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-x-5 gap-y-2">
        {[1,2,3,4,5,6,7,8,9].map(n=>(
          <span key={n} className="flex items-center gap-1.5 text-[12px] text-zinc-400">
            <span className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0" style={{backgroundColor:NUM_COLORS[n]}} />
            <span style={{color:NUM_COLORS[n]}} className="font-mono font-bold">{n}</span>
            <span className="text-zinc-500">— {DAY_MEANINGS[n]}</span>
          </span>
        ))}
      </div>
      <div className="h-px bg-zinc-800" />
      <div>
        <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Master Numbers</p>
        <div className="grid grid-cols-3 gap-x-5 gap-y-2">
          {[11,22].map(n=>(
            <span key={n} className="flex items-center gap-1.5 text-[12px] text-zinc-400">
              <span className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0" style={{backgroundColor:NUM_COLORS[n]}} />
              <span style={{color:NUM_COLORS[n]}} className="font-mono font-bold">{n} ✦</span>
              <span className="text-zinc-500">— {DAY_MEANINGS[n]}</span>
            </span>
          ))}
        </div>
      </div>
      {showPersonal&&<>
        <div className="h-px bg-zinc-800" />
        <div className="flex items-center gap-2 text-[12px] text-zinc-500">
          <span className="font-mono font-bold" style={{color:PERSONAL_COLOR}}>◎</span>
          <span>Personal Day number — calculated from your birth date</span>
        </div>
      </>}
      <div className="h-px bg-zinc-800" />
      <div>
        <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Events &amp; Notes — tap any day to add</p>
        <div className="flex flex-wrap gap-3">
          {EVENT_TYPES.map(t=>(
            <span key={t.value} className="flex items-center gap-1.5 text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{backgroundColor:t.color}} />
              <span className="text-zinc-500">{t.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Grid builder ─────────────────────────────────────────────

interface Week { weekNumber:number; cells:DayCell[]; }

function buildWeeks(year:number,month:number):Week[] {
  const firstDay=new Date(year,month-1,1);
  const daysInMonth=new Date(year,month,0).getDate();
  const startOffset=(firstDay.getDay()+6)%7;
  const weeks:Week[]=[]; let currentWeek:DayCell[]=[];
  const today=new Date();
  for(let i=0;i<startOffset;i++) currentWeek.push({day:0,month,year,isToday:false,isCurrentMonth:false});
  for(let d=1;d<=daysInMonth;d++){
    const date=new Date(year,month-1,d);
    currentWeek.push({day:d,month,year,
      isToday:date.getDate()===today.getDate()&&date.getMonth()===today.getMonth()&&date.getFullYear()===today.getFullYear(),
      isCurrentMonth:true});
    if(currentWeek.length===7){
      weeks.push({weekNumber:getWeekNumber(new Date(year,month-1,d-6+startOffset>0?d-6+startOffset:1)),cells:currentWeek});
      currentWeek=[];
    }
  }
  if(currentWeek.length>0){
    while(currentWeek.length<7) currentWeek.push({day:0,month,year,isToday:false,isCurrentMonth:false});
    const last=currentWeek.find(c=>c.isCurrentMonth);
    weeks.push({weekNumber:last?getWeekNumber(new Date(year,month-1,last.day)):0,cells:currentWeek});
  }
  return weeks;
}

// ─── Page ─────────────────────────────────────────────────────

export default function CalendarPage() {
  const now=new Date();
  const [year,setYear]=useState(now.getFullYear());
  const [month,setMonth]=useState(now.getMonth()+1);
  const [birthDate,setBirthDate]=useState<string|null>(null);
  const [selectedDay,setSelectedDay]=useState<SelectedDay|null>(null);
  const [monthEntries,setMonthEntries]=useState<Record<number,boolean>>({});
  const [monthEventTypes,setMonthEventTypes]=useState<Record<number,string>>({});

  useEffect(()=>{
    if(getStoredMode()==='user'){
      const p=getActiveProfile();
      if(p?.birthDate) setBirthDate(ddmmyyyyToISO(p.birthDate));
    }
  },[]);

  const refreshMonthEntries=useCallback(()=>{
    const entries=loadMonthEntries(year,month);
    setMonthEntries(entries);
    const types:Record<number,string>={};
    Object.keys(entries).forEach(d=>{
      const e=loadEntry(year,month,parseInt(d));
      if(e?.eventType) types[parseInt(d)]=e.eventType;
    });
    setMonthEventTypes(types);
  },[year,month]);

  useEffect(()=>{ refreshMonthEntries(); },[refreshMonthEntries]);

  const weeks=useMemo(()=>buildWeeks(year,month),[year,month]);
  const uMonth=useMemo(()=>getUniversalMonth(year,month),[year,month]);
  const chineseSign=getChineseZodiac(new Date(year,month-1,15));
  const monthColor=NUM_COLORS[uMonth.reduced]??'#c6a85b';
  const isMasterMonth=uMonth.reduced===11||uMonth.reduced===22||uMonth.reduced===33;
  const pYear=birthDate?getPersonalYear(birthDate,year,month):null;
  const pMonth=birthDate?getPersonalMonth(birthDate,year,month):null;

  const yearRange=useMemo(()=>{ const y=[]; for(let i=now.getFullYear()-120;i<=now.getFullYear()+50;i++) y.push(i); return y; },[]);

  const prevMonth=()=>{ if(month===1){setMonth(12);setYear(y=>y-1);}else setMonth(m=>m-1); };
  const nextMonth=()=>{ if(month===12){setMonth(1);setYear(y=>y+1);}else setMonth(m=>m+1); };
  const goToday=()=>{ setYear(now.getFullYear()); setMonth(now.getMonth()+1); };

  return (
    <SiteLayout>
      <div className="max-w-6xl mx-auto px-2 sm:px-4">

        <section className="text-center mb-8 space-y-2">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-200">Astrology &amp; Numerology Calendar</h1>
          <p className="text-[14px] text-zinc-400">
            Universal day numbers · Western &amp; Chinese zodiac · Week numbers · Master numbers
            {birthDate&&<span style={{color:PERSONAL_COLOR}}> · Personal day numbers</span>}
          </p>
          <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#c6a85b] to-transparent opacity-50" />
        </section>

        <div className="print:hidden">
          <CalendarGuide />
        </div>

        <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="w-9 h-9 rounded-lg border border-zinc-700 hover:border-[#c6a85b] text-zinc-300 hover:text-[#c6a85b] transition-colors flex items-center justify-center text-lg">‹</button>
            <select value={month} onChange={e=>setMonth(Number(e.target.value))} className="bg-[#0b0c10] border border-zinc-800 px-3 py-2 rounded-lg text-zinc-200 focus:border-[#c6a85b] focus:outline-none text-[14px] min-h-[36px]">
              {MONTHS.map((m,i)=><option key={m} value={i+1}>{m}</option>)}
            </select>
            <select value={year} onChange={e=>setYear(Number(e.target.value))} className="bg-[#0b0c10] border border-zinc-800 px-3 py-2 rounded-lg text-zinc-200 focus:border-[#c6a85b] focus:outline-none text-[14px] min-h-[36px]">
              {yearRange.map(y=><option key={y} value={y}>{y}</option>)}
            </select>
            <button onClick={nextMonth} className="w-9 h-9 rounded-lg border border-zinc-700 hover:border-[#c6a85b] text-zinc-300 hover:text-[#c6a85b] transition-colors flex items-center justify-center text-lg">›</button>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <button onClick={goToday} className="text-[12px] px-3 py-2 rounded-lg border border-zinc-700 hover:border-[#c6a85b] text-zinc-400 hover:text-[#c6a85b] transition-colors">Today</button>
            <div className="text-[13px] px-3 py-2 rounded-lg border" style={{borderColor:`${monthColor}55`,backgroundColor:`${monthColor}0f`,color:monthColor}}>
              Universal Month&nbsp;<span className="font-bold font-mono">{uMonth.totalSum}/{uMonth.reduced}{isMasterMonth&&<span className="ml-1 text-[12px]">✦</span>}</span>
              <span className="text-[12px] ml-1 opacity-70">— {DAY_MEANINGS[uMonth.reduced]}</span>
            </div>
            {pMonth!==null&&(
              <div className="text-[13px] px-3 py-2 rounded-lg border" style={{borderColor:`${PERSONAL_COLOR}55`,backgroundColor:`${PERSONAL_COLOR}0f`,color:PERSONAL_COLOR}}>
                Personal Month&nbsp;<span className="font-bold font-mono">{pMonth}{(pMonth===11||pMonth===22||pMonth===33)&&<span className="ml-1 text-[12px]">✦</span>}</span>
                {pYear!==null&&<span className="text-[12px] ml-1 opacity-70">· Year {pYear}</span>}
              </div>
            )}
            <div className="text-[14px] text-zinc-400">{CHINESE_EMOJI[chineseSign]} Year of the {chineseSign}</div>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="bg-[#16181d] border border-zinc-800 rounded-xl overflow-hidden mb-4">
          <div className="grid gap-[2px] p-3 pb-0" style={{gridTemplateColumns:'32px repeat(7, 1fr)'}}>
            <div/>
            {WEEKDAYS.map(d=><div key={d} className="text-center text-[10px] uppercase tracking-widest text-zinc-600 py-2">{d}</div>)}
          </div>
          <div className="p-3 space-y-2">
            {weeks.map((week,wi)=>(
              <div key={wi} className="grid gap-2" style={{gridTemplateColumns:'32px repeat(7, 1fr)'}}>
                <WeekLabel n={week.weekNumber} />
                {week.cells.map((cell,ci)=>(
                  <DayCard key={ci} cell={cell} birthDate={birthDate}
                    hasEntry={!!monthEntries[cell.day]}
                    eventType={monthEventTypes[cell.day]}
                    isSelected={
                      !!selectedDay &&
                      cell.isCurrentMonth &&
                      selectedDay.year===cell.year &&
                      selectedDay.month===cell.month &&
                      selectedDay.day===cell.day
                    }
                    onSelect={setSelectedDay} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {selectedDay && (
          <DayEditor
            selected={selectedDay}
            birthDate={birthDate}
            onClose={() => setSelectedDay(null)}
            onSaved={refreshMonthEntries}
          />
        )}

        <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-5 mb-8">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-4">Day Number Legend</p>
          <Legend showPersonal={!!birthDate} />
          <div className="mt-4 pt-3 border-t border-zinc-800 flex flex-wrap gap-4 text-[12px] text-zinc-500">
            <span>♈ ♉ ♊ … Western zodiac sign</span>
            <span>🐀 🐂 🐅 … Chinese zodiac year</span>
            <span>✦ Master number day</span>
            <span>● Coloured border = event or note</span>
          </div>
        </div>

        <div className="text-left pb-10 print:hidden">
          <button onClick={()=>window.print()} className="bg-[#c6a85b] border border-zinc-700 hover:border-[#c6a85b] text-zinc-300 px-5 py-2 rounded-lg transition-colors text-[14px]">
            📄 Print / Save as PDF
          </button>
        </div>

      </div>
    </SiteLayout>
  );
}