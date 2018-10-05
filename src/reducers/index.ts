import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import editor from './editor';

export const rootReducer = combineReducers({
  editor,
});

export type RootState = StateType<typeof rootReducer>;
