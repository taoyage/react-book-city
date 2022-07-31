import { Reducer, Store } from '@reduxjs/toolkit';
import createReducerManager from '@/store/createReducerManager';

import { store } from '@/store';

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IReducers {
  [key: string]: Reducer;
}

export interface IStore extends Store {
  reducerManager: ReturnType<typeof createReducerManager>;
}
