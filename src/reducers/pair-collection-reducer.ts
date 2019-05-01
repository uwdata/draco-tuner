import _ from 'lodash';
import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { PairCollectionAction, pairCollectionActions } from '../actions';
import { EXAMPLE_PAIRS } from '../examples';
import {
  CollectionItemFilterObject,
  Pair,
  PairEvalDeltaMapObject,
  PairEvalMapObject,
  PairObject,
  SpecDictionary,
} from '../model';

export type PairsDictionary = { [id: string]: PairObject };

export interface PairCollectionStore {
  pairs: PairsDictionary;
  filters: CollectionItemFilterObject[];
  focusPair?: string;
  focusItem?: string;
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
  [getType(pairCollectionActions.addPairFilters)]: addPairFilters,
  [getType(pairCollectionActions.removePairFilters)]: removePairFilters,
  [getType(pairCollectionActions.toggleHoverPair)]: toggleHoverPair,
  [getType(pairCollectionActions.addEmptyPair)]: addEmptyPair,
  [getType(pairCollectionActions.toggleFocusPairItem)]: toggleFocusPairItem,
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

function addPairFilters(
  state: PairCollectionStore,
  action: ActionType<typeof pairCollectionActions.setPairFilters>
): void {
  state.filters = state.filters.concat(action.payload);
}

function addEmptyPair(state: PairCollectionStore, action: ActionType<typeof pairCollectionActions.addEmptyPair>): void {
  const nextId =
    Object.keys(state.pairs).reduce((max, id) => {
      if (+id > max) {
        return +id;
      }

      return max;
    }, 0) + 1;

  state.pairs[nextId.toString()] = Pair.getEmptyPair(nextId);
  state.focusPair = nextId.toString();
  state.focusItem = 'left';
}

function toggleFocusPairItem(
  state: PairCollectionStore,
  action: ActionType<typeof pairCollectionActions.toggleFocusPairItem>
): void {
  if (!action.payload.on) {
    state.focusItem = undefined;
  } else {
    state.focusPair = action.payload.pairId;
    state.focusItem = action.payload.position;
  }
}

function removePairFilters(
  state: PairCollectionStore,
  action: ActionType<typeof pairCollectionActions.removePairFilters>
): void {
  state.filters = state.filters.filter(filter => {
    action.payload.every(toRemove => {
      return !_.isEqual(toRemove, filter);
    });
  });
}
