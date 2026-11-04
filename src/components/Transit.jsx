// Pudong layover guide; the crew page renders the same data from Supabase
export default function Transit({ data }) {
  if (!data) return null;
  return (
    <section className="card">
      <h2>{data.title}</h2>
      <p className="muted small">{data.note}</p>
      {data.groups.map((g) => (
        <div key={g.title}>
          <h3 className="tier">{g.title}</h3>
          <ul className="spots">
            {g.items.map(([name, where, detail]) => (
              <li key={name}>
                <strong>{name}</strong>
                {where && where !== '—' && <span className="muted small">📍 {where}</span>}
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h3 className="tier">알아 둘 것</h3>
      <dl className="tips">{data.tips.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      <p className="muted small">출처: {data.sources.map(([t, u], i) => <span key={u}>{i ? ' · ' : ''}<a href={u} target="_blank" rel="noreferrer">{t}</a></span>)}</p>
    </section>
  );
}
