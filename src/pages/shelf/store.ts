import { combineReducers, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';
import { createTempSlice } from '@/store';

interface IActions {
  setEditMode: ActionCreatorWithPayload<boolean, string>;
}

export const shelfActions: IActions = {
  setEditMode: createAction('INIT'),
};

const createReducer = (key: string) => {
  const { set: setEditMode, reducer: editMode } = createTempSlice<boolean>('editMode', false, key);

  shelfActions.setEditMode = setEditMode;

  return {
    reducers: {
      [key]: combineReducers({
        editMode,
      }),
    },
  };
};

export default createReducer;
