// "16:15–17:15" -> [975, 1035]; "13:20" -> [800, 830]; "17:30–" -> [1050, 1440]
export function parseSlot(slot) {
  const toMin = (s) => {
    const [h, m] = s.trim().split(':').map(Number);
    return h * 60 + m;
  };
  const [a, b] = slot.split('–');
  const start = toMin(a);
  if (b === undefined) return [start, start + 30];
  if (b.trim() === '') return [start, 24 * 60];
  return [start, toMin(b)];
}
