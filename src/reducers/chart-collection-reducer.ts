import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { ChartCollectionAction, chartCollectionActions } from '../actions';
import { EXAMPLE_CHARTS } from '../examples';
import { ChartObject, SpecDictionary } from '../model';

export interface ChartDictionary {
  [id: string]: ChartObject;
}

export interface ChartCollectionStore {
  charts: ChartDictionary;
}

const initialState: ChartCollectionStore = {
  charts: EXAMPLE_CHARTS,
};

const chartCollectionReducer = createReducer<ChartCollectionStore, ChartCollectionAction>(initialState, {
  [getType(chartCollectionActions.setCharts)]: setCharts,
});

export default chartCollectionReducer;

function setCharts(state: ChartCollectionStore, action: ActionType<typeof chartCollectionActions.setCharts>): void {
  const specDict = action.payload.specDict;
  const chartDictionary = SpecDictionary.toChartDictionary(specDict, state.charts);
  state.charts = chartDictionary;
}
