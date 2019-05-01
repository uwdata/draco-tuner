import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { ChartCollectionAction, chartCollectionActions } from '../actions';
import { EXAMPLE_CHARTS } from '../examples';
import { Chart, ChartObject, CollectionItemFilterObject, SpecDictionary } from '../model';

export interface ChartDictionary {
  [id: string]: ChartObject;
}

export interface ChartCollectionStore {
  charts: ChartDictionary;
  focusChart?: string;
  filters: CollectionItemFilterObject[];
}

const initialState: ChartCollectionStore = {
  charts: EXAMPLE_CHARTS,
  filters: [],
};

const chartCollectionReducer = createReducer<ChartCollectionStore, ChartCollectionAction>(initialState, {
  [getType(chartCollectionActions.setCharts)]: setCharts,
  [getType(chartCollectionActions.toggleFocusChart)]: toggleFocusChart,
  [getType(chartCollectionActions.addEmptyChart)]: addEmptyChart,
  [getType(chartCollectionActions.setChartFilters)]: setChartFilters,
  [getType(chartCollectionActions.addChartFilters)]: addChartFilters,
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

function setChartFilters(
  state: ChartCollectionStore,
  action: ActionType<typeof chartCollectionActions.setChartFilters>
): void {
  state.filters = action.payload;
}

function addChartFilters(
  state: ChartCollectionStore,
  action: ActionType<typeof chartCollectionActions.addChartFilters>
): void {
  state.filters = state.filters.concat(action.payload);
}
