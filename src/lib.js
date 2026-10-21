import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY, {
  auth: { persistSession: false },
});

export async function rpc(fn, args) {
  const { data, error } = await supabase.rpc(fn, args);
  if (error) throw new Error(error.message.includes('invalid trip code') ? '여행 코드가 맞지 않습니다.' : error.message);
  return data;
}

// localStorage can throw in private mode; never let that break the page
export const store = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v == null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  },
};

const TZ = 'Australia/Sydney';

// Current Sydney wall-clock as { date: 'YYYY-MM-DD', minutes, label }
export function sydneyNow(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false,
    }).formatToParts(now).map((p) => [p.type, p.value]),
  );
  const hour = parts.hour === '24' ? '00' : parts.hour;
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(hour) * 60 + Number(parts.minute),
    label: `${hour}:${parts.minute}`,
  };
}

export { parseSlot } from './time.js';

// Days until the trip starts, counted in Sydney dates
export function daysUntil(dateStr, now = new Date()) {
  const today = new Date(sydneyNow(now).date + 'T00:00:00Z');
  const target = new Date(dateStr + 'T00:00:00Z');
  return Math.round((target - today) / 86400000);
}

export const fmtAud = (n) => `A$${Number(n).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const fmtKrw = (n) => `${Math.round(n).toLocaleString('ko-KR')}원`;
