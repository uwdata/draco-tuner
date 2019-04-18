import { createReducer } from 'redux-starter-kit';
import { ChartCollectionAction } from '../actions';
import { EXAMPLE_CHARTS } from '../examples';
import { ChartObject } from '../model';

export interface ChartDictionary {
  [id: string]: ChartObject;
}

export interface ChartCollectionStore {
  charts: ChartDictionary;
}

const initialState: ChartCollectionStore = {
  charts: EXAMPLE_CHARTS,
};

const chartCollectionReducer = createReducer<ChartCollectionStore, ChartCollectionAction>(initialState, {});

export default chartCollectionReducer;
