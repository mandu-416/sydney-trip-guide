import { useEffect, useState } from 'react';
import { store } from './lib.js';

// AUD → KRW (ECB rates via Frankfurter), falling back to the last known or a manual rate.
export function useRate() {
  const [rate, setRate] = useState(() => store.get('audKrw', 927));
  const [source, setSource] = useState('저장된 환율');
  useEffect(() => {
    fetch('https://api.frankfurter.dev/v1/latest?from=AUD&to=KRW')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        const v = Math.round(j.rates.KRW * 100) / 100;
        setRate(v);
        store.set('audKrw', v);
        setSource(`ECB 기준 ${j.date}`);
      })
      .catch(() => {});
  }, []);
  const setManual = (v) => {
    setRate(v);
    store.set('audKrw', v);
    setSource('직접 입력');
  };
  return { rate, source, setManual };
}
