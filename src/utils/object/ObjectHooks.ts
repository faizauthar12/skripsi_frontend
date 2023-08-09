import * as React from 'react';

import { ObjectMapRef } from '@/types/object';

export function useDidMount(effect: React.EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(effect, []);
}

export function useDidUpdate(
  effect: React.EffectCallback,
  deps: React.DependencyList
) {
  const initialize = React.useRef(false);

  React.useEffect(() => {
    if (initialize.current) {
      effect();
    } else {
      initialize.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useMapRef<T extends object>(data: T) {
  const [lastUpdate, setLastUpdate] = React.useState(new Date());
  const refData = React.useRef(data);

  const handleUpdateData = React.useCallback(
    () => setLastUpdate(new Date()),
    []
  );

  const handleSetData = React.useCallback(
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

  return React.useMemo<ObjectMapRef<T>>(
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
  deps: React.DependencyList
) {
  const timestamp = React.useRef(new Date().getTime());

  const handler = React.useCallback(() => {
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

  React.useEffect(handler, [handler]);
  useDidUpdate(handler, deps);
}
