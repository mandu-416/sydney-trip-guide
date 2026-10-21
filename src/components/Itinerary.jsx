import { useEffect, useState } from 'react';
import { MEALS, mapLink } from '../data.js';
import { parseSlot } from '../lib.js';
import { dateLabel, WEEKDAY } from '../plan.js';
import { MapImage, TripGate } from './Common.jsx';

function Timeline({ items, prefix, trip, live, now, dow }) {
  const ready = trip.status === 'ready';
  return (
    <ol className="timeline">
      {items.map((it, i) => {
        const [slot, what, move, memo, place, open] = it;
        const key = `${prefix}-${i}`;
        const done = !!trip.data.progress[key];
        const [s, e] = parseSlot(slot);
        const isNow = live && now.minutes >= s && now.minutes < e;
        const closed = dow != null && open && !open.includes(dow);
        return (
          <li key={key} className={`${done ? 'done' : ''} ${isNow ? 'now' : ''}`}>
            <div className="tl-time">{slot}{isNow && <span className="now-tag">지금</span>}</div>
            <div className="tl-body">
              <div className="tl-head">
                {ready && (
                  <input
                    type="checkbox"
                    checked={done}
                    aria-label={`${what} 완료`}
                    onChange={(ev) => trip.actions.toggleStop(key, ev.target.checked)}
                  />
                )}
                <strong>{what}</strong>
              </div>
              {closed && <p className="warn">⚠ {WEEKDAY[dow]}요일에는 열지 않아요. 다른 날로 옮기세요.</p>}
              {move && move !== '—' && <p className="tl-move">🚶 {move}</p>}
              {memo && memo !== '—' && <p className="tl-memo">{memo}</p>}
              {place && (
                <a className="tl-link" href={mapLink(place)} target="_blank" rel="noreferrer">
                  📍 구글 지도
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Note({ trip, day }) {
  const saved = trip.data.notes[day] ?? '';
  const [text, setText] = useState(saved);
  useEffect(() => setText(saved), [saved, day]);
  return (
    <TripGate trip={trip} compact>
      <label className="note">
        <span className="label">메모 (동행자와 공유)</span>
        <textarea
          rows={3}
          value={text}
          maxLength={5000}
          placeholder="예약 번호, 집결지 메모, 다녀온 소감…"
          onChange={(e) => setText(e.target.value)}
          onBlur={() => text !== saved && trip.actions.saveNote(day, text)}
        />
        <span className="muted small">{text !== saved ? '입력을 마치면 저장됩니다' : saved ? '저장됨' : ''}</span>
      </label>
    </TripGate>
  );
}

export default function Itinerary({ day, go, trip, plan, weather, now, todayDay }) {
  const d = plan.days.find((x) => x.n === day) ?? plan.days[0];
  const t = d.tpl;
  const hasRainPlan = typeof t.rain === 'object';
  const wx = d.date ? weather.byDate[d.date] : null;
  const [rainMode, setRainMode] = useState(false);
  useEffect(() => setRainMode(hasRainPlan && !!wx && wx.rain >= 60), [d.n, d.id, wx?.rain]);
  const live = todayDay === d.n;
  const meals = MEALS.filter((m) => m.tpl === d.id);
  const items = rainMode ? t.rain.items.map(([s, w, orig, , , open]) => [s, w, orig ? `원래: ${orig}` : '', '', '', open]) : d.items;
  const prefix = `${rainMode ? 'r-' : ''}${d.id}`;
  const doneCount = items.filter((_, i) => trip.data.progress[`${prefix}-${i}`]).length;

  return (
    <>
      <div className="chips" role="tablist">
        {plan.days.map((x) => (
          <button
            key={x.n}
            role="tab"
            aria-selected={x.n === d.n}
            className={`chip ${x.n === d.n ? 'on' : ''} ${todayDay === x.n ? 'today' : ''}`}
            onClick={() => go('days', x.n)}
          >
            {x.n}일차<small>{x.date ? dateLabel(x) : x.tpl.tag}</small>
          </button>
        ))}
      </div>

      {!plan.dated && (
        <p className="notice">✈️ 홈에서 비행기 일정을 넣으면 날짜·요일과 도착일·출국일 시간이 맞춰집니다.</p>
      )}

      <section className="card">
        <p className="eyebrow">{d.n}일차{d.date ? ` · ${dateLabel(d)}` : ''} · {t.tag}</p>
        <h1>{t.title}</h1>
        <p>{t.summary}</p>
        {d.warnings.length > 0 && (
          <div className="warn-box">
            {d.warnings.map((w) => <p key={w}>⚠ {w}</p>)}
            <button className="link" onClick={() => go('home')}>일정 배치 바꾸기</button>
          </div>
        )}
        {wx && (
          <p className="wx-line">
            {wx.icon} {wx.text} {wx.max}°/{wx.min}° · 강수 {wx.rain}% · 일몰 {wx.sunset}
          </p>
        )}
        {hasRainPlan && (
          <div className="segmented" role="group" aria-label="날씨별 일정">
            <button className={!rainMode ? 'on' : ''} onClick={() => setRainMode(false)}>☀️ 기본 일정</button>
            <button className={rainMode ? 'on' : ''} onClick={() => setRainMode(true)}>☔ 비 오는 날</button>
          </div>
        )}
        {rainMode && <p className="rain-note">{t.rain.note}</p>}
        {trip.status === 'ready' && items.length > 0 && (
          <p className="muted small">✔ {doneCount}/{items.length} 완료 · 체크는 동행자와 공유됩니다</p>
        )}
      </section>

      {(rainMode ? t.rain.map : t.map) && (
        <MapImage src={rainMode ? t.rain.map : t.map} alt={rainMode ? t.rain.mapAlt : t.mapAlt} />
      )}

      <section className="card">
        <h2>시간표</h2>
        {items.length ? (
          <Timeline items={items} prefix={prefix} trip={trip} live={live} now={now} dow={d.dow} />
        ) : (
          <p className="muted">정해진 일정이 없습니다. 메모에 계획을 적어 두세요.</p>
        )}
        {!hasRainPlan && t.rain && <p className="rain-note">☔ 비가 오면: {t.rain}</p>}
      </section>

      {t.extra && (
        <section className="card">
          <h2>{t.extra.title}</h2>
          <p className="muted">{t.extra.note}</p>
          <div className="table-wrap">
            <table>
              <thead><tr><th>선택지</th><th>내용</th><th>숙소에서</th><th>소요</th></tr></thead>
              <tbody>{t.extra.rows.map((r) => <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </section>
      )}

      {meals.length > 0 && (
        <section className="card">
          <h2>이날 식당 추천</h2>
          {meals.map((m) => (
            <div key={m.title} className="meal-mini">
              <p className="label">{m.title}</p>
              <ul>
                {m.list.map((r) => (
                  <li key={r.name}>
                    <a href={mapLink(r.q)} target="_blank" rel="noreferrer">{r.name}</a>{' '}
                    <span className="muted">— {r.menu}</span>
                    {d.dow != null && r.open && !r.open.includes(d.dow) && (
                      <span className="warn-inline"> ⚠ {d.dowLabel}요일 휴무</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button className="btn" onClick={() => go('food')}>식당 전체 보기</button>
        </section>
      )}

      <section className="card">
        <h2>메모</h2>
        <Note trip={trip} day={d.n} />
      </section>

      <p className="muted small center">지도는 AI로 그린 일러스트라 위치·거리는 대략적입니다. 길은 구글 지도로 확인하세요.</p>
    </>
  );
}
