import { useEffect, useState } from 'react';
import { MEALS, mapLink } from '../data.js';
import { DAYS } from '../plan.js';
import { MapImage, TripGate } from './Common.jsx';

function Timeline({ items, prefix, trip }) {
  const ready = trip.status === 'ready';
  return (
    <ol className="timeline">
      {items.map((it, i) => {
        const [slot, what, move, memo, place] = it;
        const key = `${prefix}-${i}`;
        const done = !!trip.data.progress[key];
        return (
          <li key={key} className={done ? 'done' : ''}>
            <div className="tl-time">{slot}</div>
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

export default function Itinerary({ day, go, trip }) {
  const d = DAYS.find((x) => x.n === day) ?? DAYS[0];
  const t = d.tpl;
  const hasRainPlan = typeof t.rain === 'object';
  const [rainMode, setRainMode] = useState(false);
  useEffect(() => setRainMode(false), [d.n]);
  const meals = MEALS.filter((m) => m.tpl === d.id);
  const items = rainMode ? t.rain.items.map(([s, w, orig, , , open]) => [s, w, orig ? `원래: ${orig}` : '', '', '', open]) : d.items;
  const prefix = `${rainMode ? 'r-' : ''}${d.id}`;
  const doneCount = items.filter((_, i) => trip.data.progress[`${prefix}-${i}`]).length;

  return (
    <>
      <div className="chips" role="tablist">
        {DAYS.map((x) => (
          <button
            key={x.n}
            role="tab"
            aria-selected={x.n === d.n}
            className={`chip ${x.n === d.n ? 'on' : ''}`}
            onClick={() => go('days', x.n)}
          >
            {x.n}일차<small>{x.tpl.tag}</small>
          </button>
        ))}
      </div>

      <section className="card">
        <p className="eyebrow">{d.n}일차 · {t.tag}</p>
        <h1>{t.title}</h1>
        <p>{t.summary}</p>
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
          <Timeline items={items} prefix={prefix} trip={trip} />
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
