import { createAction } from 'typesafe-actions';
import { PairObject, SpecDictionary } from '../model';
import { ChartDictionary } from '../reducers/chart-collection-reducer';
import { PairsDictionary } from '../reducers/pair-collection-reducer';

export const reloadPairsBegin = createAction('draco-worker/RELOAD_PAIRS_BEGIN', action => {
  return (pairs: PairsDictionary, runId: number, aspProgramStrings: { [s: string]: string }) => {
    const specDict = SpecDictionary.fromPairsDictionary(pairs);
    return action({ specDict, runId, aspProgramStrings }, { WebWorker: true });
  };
});

export const solvePairsBegin = createAction('draco-worker/SOLVE_PAIRS_BEGIN', action => {
  return (pairs: PairObject[], runId: number, aspProgramStrings: { [s: string]: string }) => {
    const specDict = SpecDictionary.fromPairs(pairs);
    return action({ specDict, runId, aspProgramStrings }, { WebWorker: true });
  };
});

export const solveChartsBegin = createAction('draco-worker/SOLVE_CHARTS_BEGIN', action => {
  return (charts: ChartDictionary, runId: number, aspProgramStrings: { [s: string]: string }) => {
    const specDict = SpecDictionary.fromCharts(charts);
    return action({ specDict, runId, aspProgramStrings }, { WebWorker: true });
  };
});
