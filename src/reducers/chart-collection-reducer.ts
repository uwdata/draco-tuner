import _ from 'lodash';
import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { ChartCollectionAction, chartCollectionActions } from '../actions';
import { EXAMPLE_CHARTS } from '../examples';
import { Chart, ChartDictionary, CollectionItemFilterObject, CollectionItemSortObject, SpecDictionary } from '../model';

export interface ChartCollectionStore {
  charts: ChartDictionary;
  focusChart?: string;
  filters: CollectionItemFilterObject[];
  sorts: CollectionItemSortObject[];
}

export const CHART_COLLECTION_REDUCER_INITIAL_STATE: ChartCollectionStore = {
  charts: EXAMPLE_CHARTS,
  filters: [],
  sorts: [],
};

const chartCollectionReducer = createReducer<ChartCollectionStore, ChartCollectionAction>(
  CHART_COLLECTION_REDUCER_INITIAL_STATE,
  {
    [getType(chartCollectionActions.setCharts)]: setCharts,
    [getType(chartCollectionActions.toggleFocusChart)]: toggleFocusChart,
    [getType(chartCollectionActions.addEmptyChart)]: addEmptyChart,
    [getType(chartCollectionActions.setChartFilters)]: setChartFilters,
    [getType(chartCollectionActions.addChartFilters)]: addChartFilters,
    [getType(chartCollectionActions.removeChartFilters)]: removeChartFilters,
    [getType(chartCollectionActions.setChartSorts)]: setChartSorts,
    [getType(chartCollectionActions.resetCharts)]: resetCharts,
  }
);

export default chartCollectionReducer;

function setCharts(state: ChartCollectionStore, action: ActionType<typeof chartCollectionActions.setCharts>): void {
  const specDict = action.payload.specDict;
  const chartDictionary = SpecDictionary.toChartDictionary(specDict, state.charts);
  state.charts = chartDictionary;
}

function resetCharts(state: ChartCollectionStore, action: ActionType<typeof chartCollectionActions.resetCharts>): void {
  state.charts = action.payload;
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

function removeChartFilters(
  state: ChartCollectionStore,
  action: ActionType<typeof chartCollectionActions.removeChartFilters>
): void {
  state.filters = state.filters.filter(filter => {
    action.payload.every(toRemove => {
      return !_.isEqual(toRemove, filter);
    });
  });
}

function setChartSorts(
  state: ChartCollectionStore,
  action: ActionType<typeof chartCollectionActions.setChartSorts>
): void {
  state.sorts = action.payload;
}
