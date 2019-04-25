import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createAction } from 'typesafe-actions';
import { SpecDictionaryObject } from '../model/index';
import { RootState } from '../reducers/index';
import { solveChartsBegin } from './draco-worker-actions';

export const toggleFocusChart = createAction('chart-collection/TOGGLE_FOCUS_CHART', action => {
  return (chartId: string, on: boolean) => action({ chartId, on });
});

export const reloadChartsThunk = (runId: number): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => RootState) => {
    const charts = getState().chartCollection.charts;
    dispatch(solveChartsBegin(charts, runId));
  };
};

export const setCharts = createAction('chart-collection/SET_CHARTS', action => {
  return (specDict: SpecDictionaryObject, runId: number) => action({ specDict, runId });
});
