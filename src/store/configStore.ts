import { configureStore, Middleware, AnyAction, combineReducers } from '@reduxjs/toolkit';

import createReducerManager from '@/store/createReducerManager';

import { IReducers, IStore } from '@/store/types';

const configStore = (reducers: IReducers, middleware: Middleware[]) => {
  // 创建一个增删改查 reducer的函数
  const reducerManager = createReducerManager({ ...reducers });

  // 初始化store
  const store = configureStore({
    reducer: reducerManager.reduce,
    middleware: middleware,
  }) as IStore;

  store.reducerManager = reducerManager;

  return store;
};

export default configStore;
