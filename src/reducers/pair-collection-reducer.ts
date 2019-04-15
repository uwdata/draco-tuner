import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { PairCollectionAction, pairCollectionActions } from '../actions';
import { EXAMPLE_PAIRS } from '../examples';
import { PairEvalDeltaMapObject, PairEvalMapObject, PairFilterType, PairObject, SpecDictionary } from '../model';

export type PairsDictionary = { [id: string]: PairObject };

export interface PairCollectionStore {
  pairs: PairsDictionary;
  filters: PairFilterType[];
  focusPair?: string;
  hoverPair?: string;
  currPairEvalMap?: PairEvalMapObject;
  pairEvalDeltaMap?: PairEvalDeltaMapObject;
  pairEvalDeltaScore?: number;
  score: number;
}

const initialState: PairCollectionStore = {
  pairs: EXAMPLE_PAIRS,
  filters: [],
  score: 0,
};

// @ts-ignore
const pairsCollectionReducer = createReducer<PairCollectionStore, PairCollectionAction>(initialState, {
  [getType(pairCollectionActions.setPairs)]: setPairs,
  [getType(pairCollectionActions.toggleFocusPair)]: toggleFocusPair,
  [getType(pairCollectionActions.setPairFilters)]: setPairFilters,
  [getType(pairCollectionActions.toggleHoverPair)]: toggleHoverPair,
});

export default pairsCollectionReducer;

function setPairs(state: PairCollectionStore, action: ActionType<typeof pairCollectionActions.setPairs>): void {
  const specDict = action.payload.specDict;
  const pairsDictionary = SpecDictionary.toPairsDictionary(specDict, state.pairs);
  state.pairs = pairsDictionary;
}

function toggleFocusPair(
  state: PairCollectionStore,
  action: ActionType<typeof pairCollectionActions.toggleFocusPair>
): void {
  if (action.payload.id === null || !action.payload.on) {
    state.focusPair = undefined;
  } else {
    state.focusPair = action.payload.id;
  }
}

function toggleHoverPair(
  state: PairCollectionStore,
  action: ActionType<typeof pairCollectionActions.toggleHoverPair>
): void {
  if (action.payload.id === null || !action.payload.on) {
    state.hoverPair = undefined;
  } else {
    state.hoverPair = action.payload.id;
  }
}

function setPairFilters(
  state: PairCollectionStore,
  action: ActionType<typeof pairCollectionActions.setPairFilters>
): void {
  state.filters = action.payload;
}
