import { useEffect, useState } from 'react';
import { TEMPLATES } from '../data.js';
import { buildDays, dateLabel, defaultOrder, tripLength } from '../plan.js';

const CHOICES = Object.values(TEMPLATES);

// Flight schedule form + which plan goes on which day
export default function Setup({ plan, trip }) {
  const [form, setForm] = useState(plan.settings);
  useEffect(() => setForm(plan.settings), [JSON.stringify(plan.settings)]);

  const valid = form.arriveDate && form.departDate && form.departDate >= form.arriveDate;
  const n = valid ? tripLength(form) : 0;
  const order = valid && form.order?.length === n ? form.order : valid ? defaultOrder(n) : [];
  const preview = valid ? buildDays({ ...form, order }) : [];
  const dirty = JSON.stringify({ ...form, order }) !== JSON.stringify(plan.settings);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value, ...(k.endsWith('Date') ? { order: [] } : {}) });
  const setDay = (i, id) => {
    const next = [...order];
    next[i] = id;
    setForm({ ...form, order: next });
  };

  return (
    <section className="card setup">
      <h2>✈️ 비행기 일정</h2>
      <p className="muted small">시드니 현지 날짜·시각으로 넣으세요. 도착일·출국일 시간표가 이 시각에 맞춰 다시 계산됩니다.</p>
      <div className="setup-grid">
        <label>
          <span className="label">시드니 도착 날짜</span>
          <input type="date" value={form.arriveDate} onChange={set('arriveDate')} />
        </label>
        <label>
          <span className="label">도착 시각</span>
          <input type="time" value={form.arriveTime} onChange={set('arriveTime')} />
        </label>
        <label>
          <span className="label">시드니 출발 날짜</span>
          <input type="date" value={form.departDate} min={form.arriveDate || undefined} onChange={set('departDate')} />
        </label>
        <label>
          <span className="label">출발 시각</span>
          <input type="time" value={form.departTime} onChange={set('departTime')} />
        </label>
      </div>
      {form.arriveDate && form.departDate && !valid && <p className="error">출발 날짜가 도착 날짜보다 빠릅니다.</p>}

      {valid && (
        <>
          <h3 className="setup-h">일차별 일정 배치 ({n}일)</h3>
          <p className="muted small">예약한 투어 날짜에 맞춰 바꾸세요. 요일이 맞지 않는 장소가 있으면 ⚠로 알려줍니다.</p>
          <ol className="order">
            {preview.map((d, i) => (
              <li key={i}>
                <span className="order-day">{d.n}일차 <small>{dateLabel(d)}</small></span>
                <select value={order[i]} onChange={(e) => setDay(i, e.target.value)} aria-label={`${d.n}일차 일정`}>
                  {CHOICES.map((t) => (
                    <option key={t.id} value={t.id}>{t.tag} — {t.title}</option>
                  ))}
                </select>
                {d.warnings.map((w) => <p key={w} className="warn">⚠ {w}</p>)}
              </li>
            ))}
          </ol>
        </>
      )}

      <div className="row">
        <button className="btn primary" disabled={!valid || !dirty} onClick={() => plan.save({ ...form, order })}>
          {dirty ? '저장' : '저장됨'}
        </button>
        {valid && (
          <button className="btn" onClick={() => setForm({ ...form, order: defaultOrder(n) })}>기본 배치로</button>
        )}
      </div>
      <p className="muted small">
        {trip.status === 'ready'
          ? '여행 코드로 연결돼 있어 동행자와 같은 일정이 보입니다.'
          : '이 브라우저에만 저장됩니다. 여행 코드를 입력하면 동행자와 함께 씁니다.'}
      </p>
    </section>
  );
}
