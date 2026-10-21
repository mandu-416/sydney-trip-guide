import { useState } from 'react';
import { Progress, TripGate } from './Common.jsx';

export default function Checklist({ trip }) {
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState('생활');
  const [hideDone, setHideDone] = useState(false);
  const items = trip.data.checklist;
  const categories = [...new Set(items.map((i) => i.category))];
  const done = items.filter((i) => i.done).length;

  return (
    <>
      <section className="card">
        <h1>준비물·예약 체크리스트</h1>
        <p className="muted">보고서의 준비물과 미리 예약할 것을 옮겨 두었습니다. 동행자와 체크 상태가 함께 바뀝니다.</p>
      </section>
      <TripGate trip={trip}>
        <section className="card">
          <Progress value={done} total={items.length} />
          <label className="inline">
            <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} /> 완료한 항목 숨기기
          </label>
        </section>

        {categories.map((c) => {
          const list = items.filter((i) => i.category === c && !(hideDone && i.done));
          if (!list.length) return null;
          return (
            <section key={c} className="card">
              <h2>{c}</h2>
              <ul className="checklist">
                {list.map((i) => (
                  <li key={i.id} className={i.done ? 'done' : ''}>
                    <label>
                      <input type="checkbox" checked={i.done} onChange={(e) => trip.actions.toggleItem(i.id, e.target.checked)} />
                      <span>{i.label}</span>
                    </label>
                    <button className="icon-btn" aria-label={`${i.label} 삭제`} onClick={() => trip.actions.deleteItem(i.id)}>✕</button>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <section className="card">
          <h2>항목 추가</h2>
          <form
            className="stack"
            onSubmit={(e) => {
              e.preventDefault();
              if (!label.trim()) return;
              trip.actions.addItem(category, label);
              setLabel('');
            }}
          >
            <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="예: 보조배터리 충전" maxLength={200} aria-label="항목" />
            <div className="row">
              <input
                list="cats"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="분류"
                className="grow"
              />
              <datalist id="cats">{categories.map((c) => <option key={c} value={c} />)}</datalist>
              <button className="btn primary">추가</button>
            </div>
          </form>
        </section>
      </TripGate>
    </>
  );
}
