import { useMemo, useState } from 'react';
import { EXPENSE_CATEGORIES } from '../data.js';
import { dateLabel } from '../plan.js';
import { fmtAud, fmtKrw, store } from '../lib.js';
import { TripGate } from './Common.jsx';

// Equal split among everyone who paid something; greedy transfers to settle up
function settle(expenses) {
  const paid = {};
  expenses.forEach((e) => {
    if (e.paid_by) paid[e.paid_by] = (paid[e.paid_by] || 0) + Number(e.amount_aud);
  });
  const names = Object.keys(paid);
  if (names.length < 2) return { names, share: 0, transfers: [] };
  const total = Object.values(paid).reduce((a, b) => a + b, 0);
  const share = total / names.length;
  const bal = names.map((n) => ({ n, v: paid[n] - share }));
  const debtors = bal.filter((b) => b.v < -0.005).sort((a, b) => a.v - b.v);
  const creditors = bal.filter((b) => b.v > 0.005).sort((a, b) => b.v - a.v);
  const transfers = [];
  for (const d of debtors) {
    for (const c of creditors) {
      if (d.v >= -0.005) break;
      const amt = Math.min(-d.v, c.v);
      if (amt <= 0.005) continue;
      transfers.push([d.n, c.n, amt]);
      d.v += amt;
      c.v -= amt;
    }
  }
  return { names, share, transfers, paid };
}

export default function Expenses({ trip, plan, rate, todayDay }) {
  const DAYS = plan.days;
  const [form, setForm] = useState(() => ({
    day: todayDay ?? 1,
    category: '식비',
    title: '',
    amount: '',
    paidBy: store.get('lastPayer', ''),
  }));
  const [filter, setFilter] = useState('all');
  const expenses = trip.data.expenses;
  const total = expenses.reduce((a, e) => a + Number(e.amount_aud), 0);

  const byCat = useMemo(() => {
    const m = {};
    expenses.forEach((e) => (m[e.category] = (m[e.category] || 0) + Number(e.amount_aud)));
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [expenses]);
  const { transfers, share, names, paid } = useMemo(() => settle(expenses), [expenses]);
  const shown = filter === 'all' ? expenses : expenses.filter((e) => String(e.day) === filter);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <section className="card">
        <h1>여행 경비</h1>
        <p className="muted">호주 달러로 적으면 원화로 바꿔 보여주고, 낸 사람별로 똑같이 나눠 정산합니다.</p>
      </section>
      <TripGate trip={trip}>
        <section className="card totals">
          <div>
            <span className="label">총 지출</span>
            <strong className="big">{fmtAud(total)}</strong>
            <span className="muted">≈ {fmtKrw(total * rate.rate)}</span>
          </div>
          {byCat.length > 0 && (
            <ul className="cat-bars">
              {byCat.map(([c, v]) => (
                <li key={c}>
                  <span>{c}</span>
                  <span className="cat-track"><span style={{ width: `${(v / total) * 100}%` }} /></span>
                  <span className="num">{fmtAud(v)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h2>지출 추가</h2>
          <form
            className="expense-form"
            onSubmit={(e) => {
              e.preventDefault();
              const amount = Number(form.amount);
              if (!form.title.trim() || !(amount >= 0)) return;
              trip.actions.addExpense({ ...form, day: Number(form.day), amount });
              store.set('lastPayer', form.paidBy);
              setForm({ ...form, title: '', amount: '' });
            }}
          >
            <select value={form.day} onChange={set('day')} aria-label="일차">
              <option value={0}>출발 전</option>
              {DAYS.map((d) => <option key={d.n} value={d.n}>{d.n}일차{d.date ? ` ${dateLabel(d)}` : ''}</option>)}
            </select>
            <select value={form.category} onChange={set('category')} aria-label="분류">
              {EXPENSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input value={form.title} onChange={set('title')} placeholder="내용 (예: 마막 저녁)" maxLength={200} aria-label="내용" />
            <input value={form.amount} onChange={set('amount')} inputMode="decimal" placeholder="금액 A$" aria-label="금액(호주 달러)" />
            <input value={form.paidBy} onChange={set('paidBy')} placeholder="낸 사람 (선택)" maxLength={40} aria-label="낸 사람" />
            <button className="btn primary">추가</button>
          </form>
          {form.amount && Number(form.amount) > 0 && (
            <p className="muted small">≈ {fmtKrw(Number(form.amount) * rate.rate)}</p>
          )}
        </section>

        {names.length >= 2 && (
          <section className="card">
            <h2>정산</h2>
            <p className="muted small">
              {names.length}명 · 1인당 {fmtAud(share)} ({fmtKrw(share * rate.rate)}) ·{' '}
              {names.map((n) => `${n} ${fmtAud(paid[n])}`).join(', ')}
            </p>
            {transfers.length === 0 ? (
              <p>정산할 금액이 없습니다.</p>
            ) : (
              <ul className="transfers">
                {transfers.map(([from, to, amt]) => (
                  <li key={from + to}>
                    <strong>{from}</strong> → <strong>{to}</strong> {fmtAud(amt)} <span className="muted">({fmtKrw(amt * rate.rate)})</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className="card">
          <h2>내역</h2>
          <div className="chips">
            <button className={`chip ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>전체</button>
            {[0, ...DAYS.map((d) => d.n)].map((n) => (
              <button key={n} className={`chip ${filter === String(n) ? 'on' : ''}`} onClick={() => setFilter(String(n))}>
                {n ? `${n}일차` : '출발 전'}
              </button>
            ))}
          </div>
          {shown.length === 0 ? (
            <p className="muted">아직 기록이 없습니다.</p>
          ) : (
            <ul className="expense-list">
              {shown.map((e) => (
                <li key={e.id}>
                  <span className="pill">{e.day ? `${e.day}일차` : '출발 전'}</span>
                  <span className="grow">
                    {e.title}
                    <span className="muted small"> · {e.category}{e.paid_by ? ` · ${e.paid_by}` : ''}</span>
                  </span>
                  <span className="num">
                    {fmtAud(e.amount_aud)}
                    <small className="muted">{fmtKrw(e.amount_aud * rate.rate)}</small>
                  </span>
                  <button className="icon-btn" aria-label={`${e.title} 삭제`} onClick={() => trip.actions.deleteExpense(e.id)}>✕</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </TripGate>
    </>
  );
}
