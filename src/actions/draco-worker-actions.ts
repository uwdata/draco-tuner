import { createAction } from 'typesafe-actions';
import { PairObject, SpecDictionary } from '../model';
import { PairsDictionary } from '../reducers/pair-collection-reducer';

export const reloadPairsBegin = createAction('draco-worker/RELOAD_PAIRS_BEGIN', action => {
  return (pairs: PairsDictionary, runId: number) => {
    const specDict = SpecDictionary.fromPairsDictionary(pairs);
    return action({ specDict, runId }, { WebWorker: true });
  };
});

export const solvePairsBegin = createAction('draco-worker/SOLVE_PAIRS_BEGIN', action => {
  return (pairs: PairObject[], runId: number) => {
    const specDict = SpecDictionary.fromPairs(pairs);
    return action({ specDict, runId }, { WebWorker: true });
  };
});
