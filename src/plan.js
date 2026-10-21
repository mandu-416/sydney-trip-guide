// Fixed day-by-day plan: 1일차 … 6일차, no calendar dates.
import { DEFAULT_ORDER, TEMPLATES } from './data.js';

const ARRIVAL = [
  ['13:35', '시드니 공항 T1 도착', '—', '', 'Sydney Airport International'],
  ['13:35–14:35', '입국심사·짐 찾기', '—', '넉넉하게 1시간'],
  ['14:35–15:05', '공항 → 숙소', 'Airport Link 기차로 Town Hall까지 15–20분, 숙소까지 도보 5분', 'Opal 또는 컨택리스 카드. 공항역 이용료 별도'],
  ['15:05–16:00', '숙소 체크인, 잠깐 휴식', '—', '체크인 15:00부터'],
];

const DEPARTURE = [
  ['17:30–18:15', '숙소 → 공항 국제선', '도보 5분 + Airport Link 15–20분', '퇴근 시간대라 여유 있게'],
  ['18:15–21:00', '체크인, TRS 환급, 출국수속', '—', 'TRS는 한 매장 A$300 이상'],
  ['21:30', '출발', '—', ''],
];

export const DAYS = DEFAULT_ORDER.map((id, i) => {
  const tpl = TEMPLATES[id];
  let items = tpl.items;
  if (id === 'arrival') items = [...ARRIVAL, ...items];
  if (id === 'departure') items = [...items, ...DEPARTURE];
  return { n: i + 1, id, tpl, items };
});
