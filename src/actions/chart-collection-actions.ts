import { createAction } from 'typesafe-actions';

export const toggleFocusChart = createAction('chart-collection/TOGGLE_FOCUS_CHART', action => {
  return (chartId: string, on: boolean) => action({ chartId, on });
});
