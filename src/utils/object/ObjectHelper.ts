import * as React from 'react';

import { ObjectState } from '@/types/object';

export function getMultiformData(data: object) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  return formData;
}

export function useDefaultState<S>(value: S, state?: ObjectState<S>) {
  const defaultState = React.useState(value);

  return state || defaultState;
}
