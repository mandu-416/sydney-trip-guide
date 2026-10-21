import { RAIN_SPOTS, SOURCES, TIPS, TRANSPORT, mapLink } from '../data.js';
import { MapImage } from './Common.jsx';

export default function Info() {
  return (
    <>
      <section className="card">
        <h1>교통</h1>
        <p>
          숙소 기준으로 시내는 대부분 걸어서 다니고, 기차는 가장 가까운 Town Hall역(도보 5분)에서 탑니다. Opal 카드나 컨택리스
          신용카드를 태그하며, 하루 요금 상한이 있습니다.
        </p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>구간</th><th>수단</th><th>소요</th></tr></thead>
            <tbody>{TRANSPORT.map((r) => <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="muted small">이동시간은 추정치입니다. 출발 전 TripView나 구글 지도로 확인하세요.</p>
      </section>

      <MapImage
        src="/maps/transport.jpg"
        alt="교통 노선 개념도: Town Hall역 중심으로 공항철도, 서큘러키, 본다이·브론테, 올림픽파크, 맨리 페리"
      />

      <section className="card">
        <h2>비 오는 날 갈 만한 실내 명소</h2>
        <p className="muted small">시드니 봄(10~11월)은 소나기가 잦습니다. 접이식 우산을 들고 다니고 전날 밤·당일 아침 예보를 보세요.</p>
        <ul className="spots">
          {RAIN_SPOTS.map(([name, from, hours, point, url]) => (
            <li key={name}>
              <strong>{name}</strong>
              <span className="muted small">{from} · {hours}</span>
              <span>{point}</span>
              <span className="row">
                <a className="btn small" href={mapLink(name)} target="_blank" rel="noreferrer">구글 지도</a>
                {url && <a className="btn small" href={url} target="_blank" rel="noreferrer">공식 안내</a>}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2>준비물과 주의사항</h2>
        <dl className="tips">
          {TIPS.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </section>

      <section className="card">
        <h2>출처</h2>
        <p className="muted small">
          Firecrawl로 네이버 블로그와 구글 검색 결과를 수집해 정리했습니다. 일부 글에는 제휴·광고가 섞여 있을 수 있습니다.
        </p>
        <ul className="sources">
          {SOURCES.map(([t, u]) => (
            <li key={u}><a href={u} target="_blank" rel="noreferrer">{t}</a></li>
          ))}
        </ul>
      </section>
    </>
  );
}
