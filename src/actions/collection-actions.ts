import { createAction } from 'typesafe-actions';
import { Pair, PairItem } from '../reducers/collection';

export const addPair = createAction('collection/ADD_PAIR', (resolve) => {
  return (pair: Pair) => {
    return resolve(pair);
  };
});

export const updatePairItem = createAction('collection/UPDATE_PAIR_ITEM', (resolve) => {
  return (pairItem: PairItem) => {
    return resolve(pairItem);
  };
});
