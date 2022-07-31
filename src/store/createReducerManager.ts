import { Reducer, combineReducers, AnyAction, CombinedState } from '@reduxjs/toolkit';
import { IReducers, AppState } from '@/store/types';

const createReducerManager = (initialReducers: IReducers) => {
  const reducers = { ...initialReducers };
  let rootReducers = combineReducers(reducers);

  let keysToRemove: Array<string> = [];

  return {
    // 获取所有reducer
    getReducers: () => reducers,
    reduce: (state: AppState, action: AnyAction) => {
      let newState = state;
      if (keysToRemove.length > 0) {
        newState = { ...state };
        for (let key of keysToRemove) {
          delete state[key];
        }
        keysToRemove = [];
      }
      return rootReducers(newState, action);
    },
    // 添加新的reducer
    addReducers: (newReducers: IReducers) => {
      Object.keys(newReducers).forEach((key: string) => {
        if (reducers[key]) {
          console.warn(
            `A duplicated reducer ${key} has alreay been combined! Please confirm whether to reuse the same reducer ${key}!`
          );
        } else {
          reducers[key] = newReducers[key];
        }
      });
      rootReducers = combineReducers(reducers);
    },
    // 删除reducer
    removeReducers: (keys: string[]) => {
      keys.forEach((key) => {
        if (reducers[key]) {
          delete reducers[key];
        }
      });
      rootReducers = combineReducers(reducers);
    },
  };
};

export default createReducerManager;
