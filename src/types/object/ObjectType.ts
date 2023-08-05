import React, {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
} from 'react';

export type ObjectRef<T> = RefObject<T> | null | ((instance: T | null) => void);

export type ObjectState<S> = [S, Dispatch<SetStateAction<S>>];

export type ObjectPartial<P> = { [K in keyof P]?: P[K] };

export type ObjectRecordPartial<K extends keyof any, T> = {
  [P in K]?: T;
};

export type ObjectElement =
  | React.ComponentType<any>
  | React.ReactElement
  | null;

export interface ObjectMapRef<T> {
  updateMap(): void;
  setMapValue(map: Partial<T>, update?: boolean): void;
  map: MutableRefObject<T>;
}
