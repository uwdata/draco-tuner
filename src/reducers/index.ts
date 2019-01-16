import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import collection from './collection';
import editor from './editor';
import tuner from './tuner';

export const rootReducer = combineReducers({
  editor,
  collection,
  tuner,
});

export type RootState = StateType<typeof rootReducer>;
