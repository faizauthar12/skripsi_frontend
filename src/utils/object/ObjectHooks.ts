import {
  DependencyList,
  EffectCallback,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { ObjectMapRef } from '@/types/object';

export function useDidMount(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

export function useDidUpdate(effect: EffectCallback, deps: DependencyList) {
  const initialize = useRef(false);

  useEffect(() => {
    if (initialize.current) {
      effect();
    } else {
      initialize.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useMapRef<T extends object>(data: T) {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const refData = useRef(data);

  const handleUpdateData = useCallback(() => setLastUpdate(new Date()), []);

  const handleSetData = useCallback(
    (map: Partial<T>, update = false) => {
      for (const [key, value] of Object.entries(map)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        refData.current[key] = value;
      }

      if (update) {
        handleUpdateData();
      }
    },
    [handleUpdateData]
  );

  return useMemo<ObjectMapRef<T>>(
    () => ({
      updateMap: handleUpdateData,
      setMapValue: handleSetData,
      map: refData,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lastUpdate, handleUpdateData, handleSetData]
  );
}

export function useDebounce(
  {
    timeout,
    disabled = false,
    onDebounce,
  }: {
    timeout: number;
    onDebounce(dif: number): void;
    disabled?: boolean;
  },
  deps: DependencyList
) {
  const timestamp = useRef(new Date().getTime());

  const handler = useCallback(() => {
    if (!disabled) {
      timestamp.current = new Date().getTime();

      const handleTimeout = setTimeout(() => {
        const now = new Date().getTime();
        const dif = now - timestamp.current;

        if (dif >= timeout) {
          onDebounce(dif);
        }
      }, timeout);

      return () => clearTimeout(handleTimeout);
    }

    return undefined;
  }, [disabled, timeout, onDebounce]);

  useEffect(handler, [handler]);
  useDidUpdate(handler, deps);
}
