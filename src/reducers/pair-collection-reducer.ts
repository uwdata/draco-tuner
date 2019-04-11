import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { PairCollectionAction, pairCollectionActions } from '../actions';
import { EXAMPLE_PAIRS } from '../examples/pairs';
import { PairObject, SpecDictionary } from '../model';

export type PairsDictionary = { [id: string]: PairObject };

export interface PairCollectionStore {
  pairs: PairsDictionary;
  focusPair?: string;
}

const initialState: PairCollectionStore = {
  pairs: EXAMPLE_PAIRS,
};

// @ts-ignore
const pairsCollectionReducer = createReducer<PairCollectionStore, PairCollectionAction>(initialState, {
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
  const specDict = action.payload.specDict;
  const pairsDictionary = SpecDictionary.toPairsDictionary(specDict, state.pairs);
  state.pairs = pairsDictionary;
}

function toggleFocusPair(state: PairCollectionStore, action: ActionType<typeof pairCollectionActions.toggleFocusPair>) {
  if (action.payload.id === null || !action.payload.on) {
    state.focusPair = undefined;
  } else {
    state.focusPair = `${action.payload.id}`;
  }
}
