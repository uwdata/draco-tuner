import { createAction } from 'typesafe-actions';
import { SpecDictionary } from '../model';
import { PairsDictionary } from '../reducers/pair-collection-reducer';

export const reloadPairsBegin = createAction('draco-worker/RELOAD_PAIRS_BEGIN', action => {
  return (pairs: PairsDictionary) => {
    const specDict = SpecDictionary.fromPairsDictionary(pairs);
    return action(specDict, { WebWorker: true });
  };
});
