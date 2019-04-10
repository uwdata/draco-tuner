import { createReducer } from 'redux-starter-kit';
import { getType } from 'typesafe-actions';
import { PairCollectionAction, pairCollectionActions } from '../actions';
import { EXAMPLE_PAIRS } from '../examples/pairs';
import { SpecDictionary, SpecObject } from '../model';

export type PairsDictionary = { [id: string]: Pair };

export interface PairCollectionStore {
  pairs: PairsDictionary;
}
const initialState: PairCollectionStore = {
  pairs: EXAMPLE_PAIRS
};

// @ts-ignore
const pairsCollectionReducer = createReducer(initialState, {
  [getType(pairCollectionActions.reloadPairsEnd)]: (state: PairCollectionStore, action: PairCollectionAction) => {
    return reloadPairsEnd(state, action);
  },
});

export default pairsCollectionReducer;

function reloadPairsEnd(state: PairCollectionStore, action: PairCollectionAction) {
  const specDict = action.payload;
  const pairsDictionary = SpecDictionary.toPairsDictionary(specDict, state.pairs);
  state.pairs = pairsDictionary;
}

export interface Pair {
  id: number;
  comparator: string;
  left: SpecObject;
  right: SpecObject;
}
