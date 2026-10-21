import { useCallback, useEffect, useState } from 'react';
import { rpc, store } from './lib.js';

const EMPTY = { name: '', checklist: [], expenses: [], progress: {}, notes: {} };

// Shared trip data (checklist, expenses, visited stops, notes) behind a trip code.
export function useTrip() {
  const [code, setCode] = useState(() => store.get('tripCode', ''));
  const [data, setData] = useState(EMPTY);
  const [status, setStatus] = useState(code ? 'loading' : 'locked');
  const [error, setError] = useState('');

  const load = useCallback(async (c = code) => {
    if (!c) return;
    try {
      const d = await rpc('trip_load', { p_code: c });
      setData({ ...EMPTY, ...d });
      setStatus('ready');
      setError('');
      return true;
    } catch (e) {
      setError(e.message);
      setStatus('locked');
      return false;
    }
  }, [code]);

  useEffect(() => {
    load();
    // pick up companions' changes when coming back to the tab
    const onFocus = () => document.visibilityState === 'visible' && load();
    document.addEventListener('visibilitychange', onFocus);
    return () => document.removeEventListener('visibilitychange', onFocus);
  }, [load]);

  const unlock = async (c) => {
    const trimmed = c.trim().toUpperCase();
    setStatus('loading');
    if (await load(trimmed)) {
      setCode(trimmed);
      store.set('tripCode', trimmed);
    }
  };

  const lock = () => {
    store.set('tripCode', '');
    setCode('');
    setData(EMPTY);
    setStatus('locked');
  };

  // optimistic update, then reload on failure
  const run = async (optimistic, fn, args) => {
    if (optimistic) setData(optimistic);
    try {
      return await rpc(fn, { p_code: code, ...args });
    } catch (e) {
      setError(e.message);
      load();
    }
  };

  const actions = {
    toggleStop: (key, done) =>
      run({ ...data, progress: { ...data.progress, [key]: done } }, 'trip_progress_set', { p_key: key, p_done: done }),
    saveNote: (day, body) =>
      run({ ...data, notes: { ...data.notes, [day]: body } }, 'trip_note_set', { p_day: day, p_body: body }),
    addItem: async (category, label) => {
      const row = await run(null, 'trip_checklist_add', { p_category: category, p_label: label });
      if (row) setData((d) => ({ ...d, checklist: [...d.checklist, row] }));
    },
    toggleItem: (id, done) =>
      run({ ...data, checklist: data.checklist.map((i) => (i.id === id ? { ...i, done } : i)) },
        'trip_checklist_toggle', { p_id: id, p_done: done }),
    deleteItem: (id) =>
      run({ ...data, checklist: data.checklist.filter((i) => i.id !== id) }, 'trip_checklist_delete', { p_id: id }),
    addExpense: async (e) => {
      const row = await run(null, 'trip_expense_add', {
        p_day: e.day, p_category: e.category, p_title: e.title, p_amount: e.amount, p_paid_by: e.paidBy,
      });
      if (row) setData((d) => ({ ...d, expenses: [...d.expenses, row] }));
    },
    deleteExpense: (id) =>
      run({ ...data, expenses: data.expenses.filter((x) => x.id !== id) }, 'trip_expense_delete', { p_id: id }),
  };

  return { code, data, status, error, unlock, lock, reload: load, actions };
}
