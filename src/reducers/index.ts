import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import draco from './draco';
import editor from './editor';

export const rootReducer = combineReducers({
  editor,
  draco,
});

export type RootState = StateType<typeof rootReducer>;
