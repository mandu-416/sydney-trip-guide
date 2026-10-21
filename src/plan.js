// Turns the traveler's flight schedule + template order into dated days.
import { DEFAULT_ORDER, TEMPLATES } from './data.js';
import { parseSlot } from './time.js';

export const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
const MAX_DAYS = 21;

export const EMPTY_SETTINGS = { arriveDate: '', arriveTime: '14:00', departDate: '', departTime: '21:30', order: [] };

const toMin = (t) => {
  const [h, m] = (t || '0:0').split(':').map(Number);
  return h * 60 + m;
};
export const hhmm = (min) => {
  const m = Math.max(0, Math.min(24 * 60 - 1, Math.round(min)));
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};
const slot = (a, b) => (b == null ? hhmm(a) : `${hhmm(a)}–${hhmm(b)}`);

function addDays(date, n) {
  const d = new Date(date + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function tripLength(s) {
  if (!s.arriveDate || !s.departDate) return DEFAULT_ORDER.length;
  const n = Math.round((new Date(s.departDate) - new Date(s.arriveDate)) / 86400000) + 1;
  return Math.max(1, Math.min(MAX_DAYS, n));
}

// Arrival first, departure last, the tours/sights in between; pad with free days
export function defaultOrder(n) {
  if (n === 1) return ['departure'];
  const middle = DEFAULT_ORDER.slice(1, -1).slice(0, n - 2);
  while (middle.length < n - 2) middle.push('free');
  return ['arrival', ...middle, 'departure'];
}

export function settingsValid(s) {
  return !!(s.arriveDate && s.departDate && s.departDate >= s.arriveDate);
}

// Arrival day: airport + check-in rows from the landing time, then the fixed
// afternoon plan shifted later if the flight lands late.
function arrivalItems(tpl, arriveTime) {
  const a = toMin(arriveTime);
  const head = [
    [slot(a, a + 60), '공항 도착, 입국심사·짐 찾기', '—', '넉넉하게 1시간', 'Sydney Airport International'],
    [slot(a + 60, a + 90), '공항 → 숙소', 'Airport Link 기차로 Town Hall까지 15–20분, 숙소까지 도보 5분', 'Opal 또는 컨택리스 카드. 공항역 이용료 별도'],
    [slot(a + 90, a + 135), '숙소 체크인(또는 짐 맡기기), 휴식', '—', '체크인 시간 전이면 짐만 맡기기'],
  ];
  const ready = a + 135;
  const first = parseSlot(tpl.items[0][0])[0];
  const shift = Math.max(0, ready - first);
  const rest = tpl.items
    .map((it) => {
      if (!shift) return it;
      const [s, e] = parseSlot(it[0]);
      const single = !it[0].includes('–');
      const moved = [single ? slot(s + shift) : slot(s + shift, e + shift), ...it.slice(1)];
      // Paddy's Markets closes at 18:00
      if (it[4]?.startsWith("Paddy's") && e + shift > 18 * 60) moved[3] = '⚠ 18:00 마감이라 오늘은 어려워요. 다른 날 일정에 넣으세요.';
      return moved;
    })
    // a late landing drops the evening plan instead of running past midnight
    .filter((it) => parseSlot(it[0])[0] < 21 * 60 + 30);
  const gap = first - ready;
  const free = gap >= 60 ? [[slot(ready, first), '자유 시간: 숙소 근처 산책·카페', '—', '시차 적응 겸 가볍게']] : [];
  return [...head, ...free, ...rest];
}

// Departure day: keep the morning plan only while it ends before leaving for
// the airport (4 h before take-off), then add the airport rows.
function departureItems(tpl, departTime) {
  const d = toMin(departTime);
  const leave = d - 240;
  const kept = tpl.items.filter((it) => parseSlot(it[0])[1] <= leave - 15);
  return [
    ...kept,
    [slot(leave, leave + 45), '숙소 → 공항 국제선', '도보 5분 + Airport Link 15–20분', '퇴근 시간대면 여유 있게'],
    [slot(leave + 45, d - 30), '체크인, TRS 환급, 출국수속', '—', 'TRS는 한 매장 A$300 이상. 3시간 전 도착 목표'],
    [slot(d), '출발', '—', ''],
  ];
}

export function buildDays(settings) {
  const s = { ...EMPTY_SETTINGS, ...settings };
  const dated = settingsValid(s);
  const n = dated ? tripLength(s) : DEFAULT_ORDER.length;
  const order = s.order?.length === n && s.order.every((id) => TEMPLATES[id]) ? s.order : defaultOrder(n);
  return order.map((id, i) => {
    const tpl = TEMPLATES[id];
    const date = dated ? addDays(s.arriveDate, i) : null;
    const dow = date ? new Date(date + 'T00:00:00Z').getUTCDay() : null;
    let items = tpl.items;
    if (i === 0 && id === 'arrival') items = arrivalItems(tpl, s.arriveTime);
    // whatever lands on the last day is cut off where the airport trip starts
    if (i === n - 1) items = departureItems({ items }, s.departTime);
    const warnings = [];
    if (dow != null) {
      const check = (list, label) =>
        list.forEach((it) => {
          const open = it[5];
          if (open && !open.includes(dow)) warnings.push(`${label}${it[1]}: ${WEEKDAY[dow]}요일에는 열지 않아요`);
        });
      check(items, '');
      if (typeof tpl.rain === 'object') check(tpl.rain.items, '비 오는 날 · ');
    }
    return { n: i + 1, id, tpl, date, dow, dowLabel: dow != null ? WEEKDAY[dow] : '', items, warnings };
  });
}

export const dateLabel = (day) => (day.date ? `${Number(day.date.slice(5, 7))}/${Number(day.date.slice(8))}(${day.dowLabel})` : '');
