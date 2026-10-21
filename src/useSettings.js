import { useMemo, useState } from 'react';
import { store } from './lib.js';
import { buildDays, EMPTY_SETTINGS, settingsValid } from './plan.js';

// Flight schedule + day order. Shared through the trip code when unlocked,
// otherwise kept in this browser only.
export function useSettings(trip) {
  const [local, setLocal] = useState(() => ({ ...EMPTY_SETTINGS, ...store.get('tripSettings', {}) }));
  const shared = trip.status === 'ready' && trip.data.settings?.arriveDate ? trip.data.settings : null;
  const settings = shared ? { ...EMPTY_SETTINGS, ...shared } : local;

  const save = (next) => {
    const clean = { ...EMPTY_SETTINGS, ...next };
    setLocal(clean);
    store.set('tripSettings', clean);
    if (trip.status === 'ready') trip.actions.saveSettings(clean);
  };

  const days = useMemo(() => buildDays(settings), [JSON.stringify(settings)]);
  return { settings, save, days, dated: settingsValid(settings), shared: !!shared };
}
