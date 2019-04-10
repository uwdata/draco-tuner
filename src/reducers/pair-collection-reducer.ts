import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { pairCollectionActions } from '../actions';
import { EXAMPLE_PAIRS } from '../examples/pairs';
import { SpecDictionary, SpecObject } from '../model';

export type PairsDictionary = { [id: string]: Pair };

export interface PairCollectionStore {
  pairs: PairsDictionary;
  focusPair?: string;
}

const initialState: PairCollectionStore = {
  pairs: EXAMPLE_PAIRS,
};

// @ts-ignore
const pairsCollectionReducer = createReducer<PairCollectionStore>(initialState, {
  [getType(pairCollectionActions.setPairs)]: (
    state: PairCollectionStore,
    action: ActionType<typeof pairCollectionActions.setPairs>
  ) => {
    return setPairs(state, action);
  },
  [getType(pairCollectionActions.toggleFocusPair)]: (
    state: PairCollectionStore,
    action: ActionType<typeof pairCollectionActions.toggleFocusPair>
  ) => {
    return toggleFocusPair(state, action);
  },
});

export default pairsCollectionReducer;

function setPairs(state: PairCollectionStore, action: ActionType<typeof pairCollectionActions.setPairs>) {
  const specDict = action.payload;
  const pairsDictionary = SpecDictionary.toPairsDictionary(specDict, state.pairs);
  state.pairs = pairsDictionary;
}

function toggleFocusPair(state: PairCollectionStore, action: ActionType<typeof pairCollectionActions.toggleFocusPair>) {
  if (state.focusPair === `${action.payload}`) {
    state.focusPair = undefined;
  } else {
    state.focusPair = `${action.payload}`;
  }
}

export interface Pair {
  id: number;
  comparator: string;
  left: SpecObject;
  right: SpecObject;
}
