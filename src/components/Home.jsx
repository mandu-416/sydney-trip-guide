import { useState } from 'react';
import { TRIP } from '../data.js';
import { dateLabel } from '../plan.js';
import Setup from './Setup.jsx';
import { daysUntil, parseSlot, fmtKrw } from '../lib.js';
import { TripGate } from './Common.jsx';

function NowCard({ plan, now, todayDay, go }) {
  const { days, dated, settings } = plan;
  if (!dated) {
    return (
      <section className="hero card">
        <p className="eyebrow">시작하기</p>
        <p className="now-title">비행기 일정을 넣으면 날짜가 맞춰집니다</p>
        <p className="muted">아래 ✈️ 비행기 일정에 시드니 도착·출발 날짜와 시각을 입력하세요.</p>
      </section>
    );
  }
  if (todayDay == null) {
    const until = daysUntil(days[0].date);
    const after = daysUntil(days[days.length - 1].date) < 0;
    return (
      <section className="hero card">
        <p className="eyebrow">{after ? '여행 끝' : '출발까지'}</p>
        <p className="big">{after ? '수고했어요 👋' : until === 0 ? 'D-DAY' : `D-${until}`}</p>
        <p className="muted">
          {dateLabel(days[0])} {settings.arriveTime} 시드니 도착 · {dateLabel(days[days.length - 1])} {settings.departTime} 출발
        </p>
      </section>
    );
  }
  const day = days[todayDay - 1];
  const slots = day.items.map((it) => ({ it, range: parseSlot(it[0]) }));
  const current = slots.find((s) => now.minutes >= s.range[0] && now.minutes < s.range[1]);
  const next = slots.find((s) => s.range[0] > now.minutes);
  return (
    <section className="hero card">
      <p className="eyebrow">{todayDay}일차 {dateLabel(day)} · {day.tpl.tag}</p>
      <p className="now-title">{current ? current.it[1] : next ? '다음 일정까지 자유 시간' : '오늘 일정 끝'}</p>
      {current && current.it[3] && <p className="muted">{current.it[0]} · {current.it[3]}</p>}
      {next && (
        <p className="next">다음 <strong>{next.it[0]}</strong> {next.it[1]}{next.it[2] && next.it[2] !== '—' ? ` (${next.it[2]})` : ''}</p>
      )}
      <button className="btn primary" onClick={() => go('days', todayDay)}>오늘 일정 전체 보기</button>
    </section>
  );
}

function WeatherStrip({ plan, weather, go }) {
  if (!plan.dated || weather.status === 'error') return null;
  const any = Object.keys(weather.byDate).length > 0;
  return (
    <section className="card">
      <h2>시드니 날씨 예보</h2>
      {!any ? (
        <p className="muted">
          {weather.status === 'loading' ? '불러오는 중…' : '예보는 여행 16일 전부터 나옵니다. 가까워지면 여기에 날짜별 강수 확률이 뜹니다.'}
        </p>
      ) : (
        <div className="weather">
          {plan.days.map((d) => {
            const w = weather.byDate[d.date];
            return (
              <button key={d.n} className={`wx ${w && w.rain >= 60 ? 'wet' : ''}`} onClick={() => go('days', d.n)}>
                <span className="wx-day">{d.n}일차 {d.dowLabel}</span>
                {w ? (
                  <>
                    <span className="wx-icon">{w.icon}</span>
                    <span>{w.max}° / {w.min}°</span>
                    <span className="wx-rain">☔ {w.rain}%</span>
                  </>
                ) : (
                  <span className="muted small">예보 전</span>
                )}
              </button>
            );
          })}
        </div>
      )}
      {any && <p className="muted small">강수 확률 60% 이상인 날은 비 오는 날 일정이 있는 경우 그 일정으로 먼저 열립니다.</p>}
    </section>
  );
}

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

export default function Home({ trip, plan, weather, rate, now, todayDay, go }) {
  const doneStops = Object.values(trip.data.progress).filter(Boolean).length;
  return (
    <>
      <NowCard plan={plan} now={now} todayDay={todayDay} go={go} />
      {!plan.dated && <Setup plan={plan} trip={trip} />}
      <section className="card">
        <h1>{TRIP.title}</h1>
        <p>{TRIP.lead}</p>
      </section>
      <WeatherStrip plan={plan} weather={weather} go={go} />
      <section className="card">
        <h2>한눈에 보기</h2>
        <ol className="overview">
          {plan.days.map((d) => (
            <li key={d.n}>
              <button onClick={() => go('days', d.n)} className={todayDay === d.n ? 'today' : ''}>
                <span className="ov-day">{d.n}일차<small>{dateLabel(d)}</small></span>
                <span className="ov-body">
                  <span className="pill">{d.tpl.tag}</span>
                  {d.tpl.title}
                  {d.warnings.length > 0 && <span className="warn-inline"> ⚠ 요일 확인</span>}
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
      {plan.dated && <Setup plan={plan} trip={trip} />}
      <Converter rate={rate} />
    </>
  );
}
