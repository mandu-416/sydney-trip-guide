import { useState } from 'react';
import { SHOPPING } from '../data.js';
import { store } from '../lib.js';

// souvenirs are listed by price band: first number of the price, "이하" means "up to"
export function priceTier(price) {
  const n = Number((price.match(/\d+(?:\.\d+)?/) ?? [0])[0]);
  if (/이하/.test(price) || n < 5) return 'A$5 이하';
  if (n < 15) return 'A$5–15';
  if (n < 40) return 'A$15–40';
  return 'A$40 이상';
}

function Rows({ items, got, toggle }) {
  return (
    <ul className="shop">
      {items.map(([name, price, where, note]) => (
        <li key={name} className={got[name] ? 'done' : ''}>
          <label>
            <input type="checkbox" checked={!!got[name]} onChange={() => toggle(name)} />
            <span className="shop-main">
              <strong>{name}</strong>
              <span className="shop-price">{price}</span>
            </span>
          </label>
          <p className="muted small">📍 {where}{note ? ` · ${note}` : ''}</p>
        </li>
      ))}
    </ul>
  );
}

export default function Shopping({ data = SHOPPING }) {
  const [got, setGot] = useState(() => store.get('shopGot', {}));
  const [filter, setFilter] = useState('all');
  const toggle = (name) => setGot((g) => {
    const next = { ...g, [name]: !g[name] };
    store.set('shopGot', next);
    return next;
  });
  const groups = filter === 'all' ? data.groups : data.groups.filter((g) => g.id === filter);
  const total = data.groups.reduce((n, g) => n + g.items.length, 0);
  const done = data.groups.reduce((n, g) => n + g.items.filter(([name]) => got[name]).length, 0);

  return (
    <>
      <section className="card">
        <h1>🛍️ 시드니 쇼핑 리스트</h1>
        <p className="muted">{data.note}</p>
        <p className="small">산 것 {done} / {total} · 체크는 이 기기에만 저장됩니다.</p>
        <div className="chips">
          <button className={`chip ${filter === 'all' ? 'on' : ''}`} onClick={() => setFilter('all')}>전체</button>
          {data.groups.map((g) => (
            <button key={g.id} className={`chip ${filter === g.id ? 'on' : ''}`} onClick={() => setFilter(g.id)}>{g.title}</button>
          ))}
        </div>
      </section>
      {groups.map((g) => (
        <section key={g.id} className="card">
          <h2>{g.title}</h2>
          <p className="muted small">어디서: {g.where}</p>
          {g.tiers
            ? ['A$5 이하', 'A$5–15', 'A$15–40', 'A$40 이상'].map((t) => {
                const list = g.items.filter(([, price]) => priceTier(price) === t);
                return list.length ? (
                  <div key={t}>
                    <h3 className="tier">{t}</h3>
                    <Rows items={list} got={got} toggle={toggle} />
                  </div>
                ) : null;
              })
            : <Rows items={g.items} got={got} toggle={toggle} />}
        </section>
      ))}
      <section className="card">
        <h2>사기 전에 알아 둘 것</h2>
        <dl className="tips">
          {data.tips.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </section>
      {data.sources?.length > 0 && (
        <section className="card">
          <h2>가격 출처</h2>
          <ul className="small">
            {data.sources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{label}</a></li>)}
          </ul>
        </section>
      )}
    </>
  );
}
