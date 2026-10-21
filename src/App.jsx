import { useEffect, useState } from 'react';
import { sydneyNow, store } from './lib.js';
import { useTrip } from './useTrip.js';
import { useSettings } from './useSettings.js';
import { useWeather, useRate } from './useExternal.js';
import Home from './components/Home.jsx';
import Itinerary from './components/Itinerary.jsx';
import Food from './components/Food.jsx';
import Checklist from './components/Checklist.jsx';
import Expenses from './components/Expenses.jsx';
import Info from './components/Info.jsx';

const TABS = [
  ['home', '홈', '🏠'],
  ['days', '일정', '🗓️'],
  ['food', '식당', '🍜'],
  ['check', '준비물', '✅'],
  ['money', '경비', '💳'],
  ['info', '교통·정보', '🚆'],
];

function useHashTab() {
  const read = () => {
    const [tab, day] = window.location.hash.slice(1).split('/');
    return { tab: TABS.some((t) => t[0] === tab) ? tab : 'home', day: Number(day) || null };
  };
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => setRoute(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const go = (tab, day) => {
    window.location.hash = day ? `${tab}/${day}` : tab;
    window.scrollTo({ top: 0 });
  };
  return [route, go];
}

export default function App() {
  const [route, go] = useHashTab();
  const trip = useTrip();
  const plan = useSettings(trip);
  const weather = useWeather(plan.days.map((d) => d.date).filter(Boolean));
  const rate = useRate();
  const [now, setNow] = useState(() => sydneyNow());
  const [theme, setTheme] = useState(() => store.get('theme', 'auto'));

  useEffect(() => {
    const id = setInterval(() => setNow(sydneyNow()), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (theme === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', theme);
    store.set('theme', theme);
  }, [theme]);

  const todayDay = plan.days.find((d) => d.date === now.date)?.n ?? null;
  const shared = { trip, plan, weather, rate, now, todayDay, go };
  const first = plan.days[0];
  const last = plan.days[plan.days.length - 1];
  const range = plan.dated
    ? `${Number(first.date.slice(5, 7))}/${Number(first.date.slice(8))}–${Number(last.date.slice(5, 7))}/${Number(last.date.slice(8))}`
    : '여행';

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => go('home')}>🦘 시드니 {range}</button>
        <div className="topbar-right">
          <span className="clock" title="시드니 현지 시각">시드니 {now.label}</span>
          <button
            className="icon-btn"
            aria-label="테마 바꾸기"
            onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'auto' : 'dark')}
          >
            {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🌓'}
          </button>
        </div>
      </header>

      <main className="content">
        {route.tab === 'home' && <Home {...shared} />}
        {route.tab === 'days' && <Itinerary {...shared} day={Math.min(route.day ?? todayDay ?? 1, plan.days.length)} />}
        {route.tab === 'food' && <Food {...shared} />}
        {route.tab === 'check' && <Checklist {...shared} />}
        {route.tab === 'money' && <Expenses {...shared} />}
        {route.tab === 'info' && <Info {...shared} />}
      </main>

      <nav className="tabbar">
        {TABS.map(([id, label, icon]) => (
          <button key={id} className={route.tab === id ? 'on' : ''} onClick={() => go(id)}>
            <span aria-hidden>{icon}</span>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
