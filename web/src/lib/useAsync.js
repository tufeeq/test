// Tiny data hook: const { data, error, loading, reload, setData } = useAsync(() => api.get('/jobs'), [deps]);
import { useCallback, useEffect, useRef, useState } from 'react';

export function useAsync(fn, deps = []) {
  const [state, setState] = useState({ data: undefined, error: null, loading: true });
  const seq = useRef(0);
  const run = useCallback(async () => {
    const id = ++seq.current;
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await fn();
      if (id === seq.current) setState({ data, error: null, loading: false });
    } catch (error) {
      if (id === seq.current) setState((s) => ({ ...s, error, loading: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  useEffect(() => { run(); }, [run]);
  return { ...state, reload: run, setData: (d) => setState((s) => ({ ...s, data: typeof d === 'function' ? d(s.data) : d })) };
}
