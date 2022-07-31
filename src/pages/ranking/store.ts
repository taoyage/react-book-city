import { combineReducers, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';
import { createTempSlice } from '@/store';

import { TAB_DEFAULT_KEY } from '@/pages/ranking/constants';

interface IRankingAction {
  setTabKey: ActionCreatorWithPayload<string, string>;
  setSideKey: ActionCreatorWithPayload<string, string>;
}

export const rankingActions: IRankingAction = {
  setTabKey: createAction('INIT'),
  setSideKey: createAction('INIT'),
};

const createReducer = (key: string) => {
  const { set: setTabKey, reducer: activeTabKey } = createTempSlice<string>('activeTabKey', TAB_DEFAULT_KEY, key);
  const { set: setSideKey, reducer: activeSideKey } = createTempSlice<string>('activeSideKey', '', key);

  rankingActions.setTabKey = setTabKey;
  rankingActions.setSideKey = setSideKey;

  return {
    reducers: {
      [key]: combineReducers({
        activeTabKey,
        activeSideKey,
      }),
    },
  };
};

export default createReducer;
