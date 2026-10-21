import { useState } from 'react';
import { TRIP } from '../data.js';
import { DAYS } from '../plan.js';
import { fmtKrw } from '../lib.js';
import { TripGate } from './Common.jsx';

function Converter({ rate }) {
  const [aud, setAud] = useState('10');
  const [editing, setEditing] = useState(false);
  const [manual, setManual] = useState('');
  return (
    <section className="card">
      <h2>환율 계산</h2>
      <div className="row">
        <label className="grow">
          <span className="label">호주 달러</span>
          <input inputMode="decimal" value={aud} onChange={(e) => setAud(e.target.value)} />
        </label>
        <div className="grow converted">
          <span className="label">원화</span>
          <strong>{fmtKrw((Number(aud) || 0) * rate.rate)}</strong>
        </div>
      </div>
      {editing ? (
        <form
          className="row small-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (Number(manual) > 0) rate.setManual(Number(manual));
            setEditing(false);
          }}
        >
          <input inputMode="decimal" value={manual} onChange={(e) => setManual(e.target.value)} aria-label="1 AUD 원화" />
          <button className="btn">적용</button>
        </form>
      ) : (
        <p className="muted small">
          1 AUD = {rate.rate}원 ({rate.source}) ·{' '}
          <button className="link" onClick={() => { setManual(String(rate.rate)); setEditing(true); }}>
            직접 입력
          </button>
        </p>
      )}
    </section>
  );
}

export default function Home({ trip, rate, go }) {
  const doneStops = Object.values(trip.data.progress).filter(Boolean).length;
  return (
    <>
      <section className="card">
        <h1>{TRIP.title}</h1>
        <p>{TRIP.lead}</p>
      </section>
      <section className="card">
        <h2>한눈에 보기</h2>
        <ol className="overview">
          {DAYS.map((d) => (
            <li key={d.n}>
              <button onClick={() => go('days', d.n)} >
                <span className="ov-day">{d.n}일차</span>
                <span className="ov-body">
                  <span className="pill">{d.tpl.tag}</span>
                  {d.tpl.title}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <p className="muted small">패디스 마켓은 월·화 휴무, 더 록스 마켓은 토·일, 본다이 마켓은 일요일만 엽니다.</p>
      </section>
      <section className="card">
        <h2>함께 쓰기</h2>
        <TripGate trip={trip} compact>
          <p>
            ✅ 연결됨 · 방문 체크 {doneStops}곳 · 준비물 {trip.data.checklist.filter((i) => i.done).length}/{trip.data.checklist.length} ·
            경비 {trip.data.expenses.length}건
          </p>
          <p className="muted small">같은 코드를 동행자에게 알려주면 체크리스트와 경비를 함께 씁니다.</p>
          <button className="btn" onClick={trip.lock}>이 기기에서 코드 지우기</button>
        </TripGate>
      </section>
      <Converter rate={rate} />
    </>
  );
}
