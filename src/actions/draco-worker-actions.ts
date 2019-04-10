import { createAction } from 'typesafe-actions';
import { SpecDictionary } from '../model';
import { Pair, PairsDictionary } from '../reducers/pair-collection-reducer';

export const reloadPairsBegin = createAction('draco-worker/RELOAD_PAIRS_BEGIN', action => {
  return (pairs: PairsDictionary) => {
    const specDict = SpecDictionary.fromPairsDictionary(pairs);
    return action(specDict, { WebWorker: true });
  };
});

export const solvePairsBegin = createAction('draco-worker/SOLVE_PAIRS_BEGIN', action => {
  return (pairs: Pair[]) => {
    const specDict = SpecDictionary.fromPairs(pairs);
    return action(specDict, { WebWorker: true });
  };
});
