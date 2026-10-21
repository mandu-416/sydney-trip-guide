import { useEffect, useState } from 'react';
import { store } from './lib.js';

const WMO = {
  0: ['☀️', '맑음'], 1: ['🌤️', '대체로 맑음'], 2: ['⛅', '구름 조금'], 3: ['☁️', '흐림'],
  45: ['🌫️', '안개'], 48: ['🌫️', '안개'], 51: ['🌦️', '이슬비'], 53: ['🌦️', '이슬비'], 55: ['🌦️', '이슬비'],
  61: ['🌧️', '비'], 63: ['🌧️', '비'], 65: ['🌧️', '강한 비'], 80: ['🌦️', '소나기'], 81: ['🌧️', '소나기'],
  82: ['⛈️', '강한 소나기'], 95: ['⛈️', '뇌우'], 96: ['⛈️', '뇌우'], 99: ['⛈️', '뇌우'],
};

// Sydney daily forecast (Open-Meteo, no key). Only dates within the next 16 days come back.
export function useWeather(dates) {
  const [state, setState] = useState({ byDate: {}, status: 'loading' });
  useEffect(() => {
    const url =
      'https://api.open-meteo.com/v1/forecast?latitude=-33.87&longitude=151.21' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunset' +
      '&timezone=Australia%2FSydney&forecast_days=16';
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        const byDate = {};
        j.daily.time.forEach((d, i) => {
          if (!dates.includes(d)) return;
          const [icon, text] = WMO[j.daily.weather_code[i]] || ['🌡️', '-'];
          byDate[d] = {
            icon, text,
            max: Math.round(j.daily.temperature_2m_max[i]),
            min: Math.round(j.daily.temperature_2m_min[i]),
            rain: j.daily.precipitation_probability_max[i],
            sunset: j.daily.sunset[i]?.slice(11),
          };
        });
        setState({ byDate, status: 'ready' });
      })
      .catch(() => setState({ byDate: {}, status: 'error' }));
  }, [dates.join()]);
  return state;
}

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
