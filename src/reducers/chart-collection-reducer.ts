import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { ChartCollectionAction, chartCollectionActions } from '../actions';
import { EXAMPLE_CHARTS } from '../examples';
import { Chart, ChartObject, SpecDictionary } from '../model';

export interface ChartDictionary {
  [id: string]: ChartObject;
}

export interface ChartCollectionStore {
  charts: ChartDictionary;
  focusChart?: string;
}

const initialState: ChartCollectionStore = {
  charts: EXAMPLE_CHARTS,
};

const chartCollectionReducer = createReducer<ChartCollectionStore, ChartCollectionAction>(initialState, {
  [getType(chartCollectionActions.setCharts)]: setCharts,
  [getType(chartCollectionActions.toggleFocusChart)]: toggleFocusChart,
  [getType(chartCollectionActions.addEmptyChart)]: addEmptyChart,
});

export default chartCollectionReducer;

function setCharts(state: ChartCollectionStore, action: ActionType<typeof chartCollectionActions.setCharts>): void {
  const specDict = action.payload.specDict;
  const chartDictionary = SpecDictionary.toChartDictionary(specDict, state.charts);
  state.charts = chartDictionary;
}

function toggleFocusChart(
  state: ChartCollectionStore,
  action: ActionType<typeof chartCollectionActions.toggleFocusChart>
): void {
  if (action.payload.on) {
    state.focusChart = action.payload.chartId;
  } else {
    state.focusChart = undefined;
  }
}

function addEmptyChart(
  state: ChartCollectionStore,
  action: ActionType<typeof chartCollectionActions.addEmptyChart>
): void {
  const maxId = Object.keys(state.charts).reduce((max, id) => {
    return +id > max ? +id : max;
  }, 0);

  const id = (maxId + 1).toString();
  state.charts[id] = Chart.getEmptyChart(id);
}
