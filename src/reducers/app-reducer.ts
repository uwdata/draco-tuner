import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { AppAction, appActions } from '../actions';

export class Collection {
  static HIDDEN: 'hidden' = 'hidden';
  static PAIRS: 'pairs' = 'pairs';
  static CHARTS: 'charts' = 'charts';
}

export type CollectionType = typeof Collection.PAIRS | typeof Collection.CHARTS | typeof Collection.HIDDEN;

export interface AppStore {
  showEditor: boolean;
  showCollection: boolean;
  collectionPane: CollectionType;
}

const initialState: AppStore = {
  showEditor: false,
  showCollection: true,
  collectionPane: Collection.PAIRS,
};

const appReducer = createReducer<AppStore, AppAction>(initialState, {
  [getType(appActions.toggleShowEditor)]: toggleShowEditor,
  [getType(appActions.toggleShowCollection)]: toggleShowCollection,
  [getType(appActions.setCollectionPane)]: setCollectionPane,
});

export default appReducer;

function toggleShowEditor(state: AppStore, action: ActionType<typeof appActions.toggleShowEditor>): void {
  state.showEditor = action.payload;
}

function toggleShowCollection(state: AppStore, action: ActionType<typeof appActions.toggleShowCollection>): void {
  state.showCollection = action.payload;
}

function setCollectionPane(state: AppStore, action: ActionType<typeof appActions.setCollectionPane>): void {
  state.collectionPane = action.payload;
}
