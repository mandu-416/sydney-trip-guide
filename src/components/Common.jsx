import { useEffect, useState } from 'react';

export function MapImage({ src, alt }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <figure className="map">
      <button className="map-btn" onClick={() => setOpen(true)} aria-label="지도 크게 보기">
        <img src={src} alt={alt} loading="lazy" />
        <span className="zoom-hint">🔍 크게 보기</span>
      </button>
      <figcaption>{alt}</figcaption>
      {open && (
        <div className="lightbox" role="dialog" aria-label={alt} onClick={() => setOpen(false)}>
          <img src={src} alt={alt} />
          <button className="lightbox-close" aria-label="닫기">✕</button>
        </div>
      )}
    </figure>
  );
}

// Shown where shared (Supabase) features need the trip code
export function TripGate({ trip, children, compact }) {
  const [code, setCode] = useState('');
  if (trip.status === 'ready') return children;
  return (
    <div className={`gate card ${compact ? 'compact' : ''}`}>
      <p>
        <strong>🔒 여행 코드를 입력하면</strong> 동행자와 함께 쓰는 체크리스트·경비·방문 체크·메모가 열립니다.
      </p>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          if (code.trim()) trip.unlock(code);
        }}
      >
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="SYD-XXXX-XXXX"
          aria-label="여행 코드"
          autoCapitalize="characters"
        />
        <button className="btn primary" disabled={trip.status === 'loading'}>
          {trip.status === 'loading' ? '확인 중…' : '열기'}
        </button>
      </form>
      {trip.error && <p className="error">{trip.error}</p>}
    </div>
  );
}

export function Progress({ value, total }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="progress" aria-label={`${value}/${total}`}>
      <div className="bar" style={{ width: `${pct}%` }} />
      <span>{value}/{total}</span>
    </div>
  );
}
