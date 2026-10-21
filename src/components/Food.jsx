import { useMemo, useState } from 'react';
import { MEALS, TEMPLATES, mapLink } from '../data.js';

export default function Food({ trip, plan, todayDay }) {
  const [day, setDay] = useState(todayDay ?? 0);
  const [q, setQ] = useState('');
  const ready = trip.status === 'ready';

  const meals = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return MEALS.map((m) => ({ ...m, days: plan.days.filter((d) => d.id === m.tpl) }))
      .filter((m) => !day || m.days.some((d) => d.n === day))
      .map((m) => ({
        ...m,
        list: m.list.filter((r) => !needle || `${r.name} ${r.loc} ${r.menu}`.toLowerCase().includes(needle)),
      }))
      .filter((m) => m.list.length);
  }, [day, q, plan.days]);

  return (
    <>
      <section className="card">
        <h1>동선별 식당 추천</h1>
        <p className="muted">
          끼니마다 동선 근처의 저렴한 현지인 식당 3곳입니다. 가격은 출처 작성 시점 기준이고, 영업시간은 방문 전 구글 지도로 확인하세요.
        </p>
        <input
          className="search"
          type="search"
          placeholder="이름·메뉴로 찾기 (예: 반미, 락사, 버거)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="chips">
          {[0, ...plan.days.map((d) => d.n)].map((n) => (
            <button key={n} className={`chip ${day === n ? 'on' : ''}`} onClick={() => setDay(n)}>
              {n ? `${n}일차` : '전체'}
            </button>
          ))}
        </div>
      </section>

      {meals.length === 0 && <p className="muted center">조건에 맞는 식당이 없습니다.</p>}

      {meals.map((m) => (
        <section key={m.title} className="card">
          <h2>{m.days.length ? m.days.map((d) => `${d.n}일차`).join('·') : `${TEMPLATES[m.tpl].tag}(일정에 없음)`} {m.title}</h2>
          <div className="food-grid">
            {m.list.map((r) => {
              const key = `food-${r.q}`;
              const visited = !!trip.data.progress[key];
              return (
                <article key={r.name} className={`food ${visited ? 'visited' : ''}`}>
                  <h3>{r.name}</h3>
                  <p className="muted">📍 {r.loc}</p>
                  <p>{r.menu}</p>
                  {r.open && m.days.some((d) => d.dow != null && !r.open.includes(d.dow)) && (
                    <p className="warn">⚠ 이 날은 휴무일 수 있어요 ({m.days.map((d) => d.dowLabel).join('·')}요일)</p>
                  )}
                  <p className="small">
                    출처:{' '}
                    {r.src.map(([label, url], i) => (
                      <span key={url}>
                        {i > 0 && ', '}
                        <a href={url} target="_blank" rel="noreferrer">{label}</a>
                      </span>
                    ))}
                  </p>
                  <div className="row">
                    <a className="btn small" href={mapLink(r.q)} target="_blank" rel="noreferrer">구글 지도</a>
                    {ready && (
                      <button
                        className={`btn small ${visited ? 'primary' : ''}`}
                        onClick={() => trip.actions.toggleStop(key, !visited)}
                      >
                        {visited ? '✔ 다녀옴' : '다녀왔어요'}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          {m.note && <p className="muted small">{m.note}</p>}
        </section>
      ))}
    </>
  );
}
