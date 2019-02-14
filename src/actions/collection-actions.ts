import { ConstraintSet } from 'draco-vis';
import { createAction } from 'typesafe-actions';
import { Pair, PairItemFromWorker, PairItemId } from '../reducers/collection';

export const addPair = createAction('collection/ADD_PAIR', (resolve) => {
  return (pair: Pair) => {
    return resolve(pair);
  };
});

export const updatePairItem = createAction('collection/UPDATE_PAIR_ITEM', (resolve) => {
  return (pairItem: PairItemFromWorker) => {
    return resolve(pairItem);
  };
});

export const updatePair = createAction('collection/UPDATE_PAIR', (resolve) => {
  return (pair: Pair) => resolve(pair);
})

export const updatePairItemVegaLite = createAction('collection/UPDATE_PAIR_ITEM_VEGALITE', (resolve) => {
  return (pairItemId: PairItemId, code: string) => resolve({pairItemId, code});
})

export const setDracoConstraintSet = createAction('collection/SET_DRACO_CONSTRAINT_SET', (resolve) => {
  return (constraintSet: ConstraintSet) => { return resolve(constraintSet)}
});

export const loadCollection = createAction('collection/LOAD', (resolve) => {
  return () => { return resolve(); }
});

export const saveCollection = createAction('collection/SAVE', (resolve) => {
  return () => resolve();
});

export const addPairs = createAction('collection/ADD_PAIRs', (resolve) => {
  return (pairs: Pair[]) => {
    return resolve(pairs);
  }
})

export const deletePair = createAction('collection/DELETE_PAIR', (resolve) => {
  return (id: number) => resolve(id);
})
