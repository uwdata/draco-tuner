import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { AppAction, appActions } from '../actions';

export class Collection {
  static HIDDEN: 'hidden' = 'hidden';
  static PAIRS: 'pairs' = 'pairs';
  static CHARTS: 'charts' = 'charts';
}

export type CollectionType = typeof Collection.PAIRS | typeof Collection.CHARTS | typeof Collection.HIDDEN;

export class ViewPosition {
  static LEFT: 'left' = 'left';
  static CENTER: 'center' = 'center';
  static RIGHT: 'right' = 'right';
}

export type ViewPositionType = typeof ViewPosition.LEFT | typeof ViewPosition.CENTER | typeof ViewPosition.RIGHT;

export class View {
  static COLLECTION_CHARTS: 'collection-charts' = 'collection-charts';
  static COLLECTION_PAIRS: 'collection-pairs' = 'collection-pairs';
  static CONSTRAINT_TUNER: 'constraint-tuner' = 'constraint-tuner';
  static EDITOR_VEGALITE: 'editor-vegalite' = 'editor-vegalite';
  static EDITOR_ASP: 'editor-asp' = 'editor-asp';
  static HIDDEN: 'hidden' = 'hidden';
  static NONE: 'none' = 'none';

  static types: ViewType[] = [
    View.COLLECTION_CHARTS,
    View.COLLECTION_PAIRS,
    View.CONSTRAINT_TUNER,
    View.EDITOR_VEGALITE,
    View.EDITOR_ASP,
    View.NONE,
    View.HIDDEN,
  ];

  static getDisplayName(type: ViewType): string {
    switch (type) {
      case View.COLLECTION_CHARTS:
        return 'Chart Collection';
      case View.COLLECTION_PAIRS:
        return 'Pair Collection';
      case View.CONSTRAINT_TUNER:
        return 'Constraint Tuner';
      case View.EDITOR_VEGALITE:
        return 'Vega-Lite Editor';
      case View.EDITOR_ASP:
        return 'ASP Editor';
      case View.HIDDEN:
        return 'x';
      case View.NONE:
        return 'none';
    }
  }
}

export type ViewType =
  | typeof View.COLLECTION_CHARTS
  | typeof View.COLLECTION_PAIRS
  | typeof View.CONSTRAINT_TUNER
  | typeof View.EDITOR_VEGALITE
  | typeof View.EDITOR_ASP
  | typeof View.HIDDEN
  | typeof View.NONE;

export interface AppStore {
  showEditor: boolean;
  showCollection: boolean;
  collectionPane: CollectionType;
  viewLeft: ViewType;
  viewCenter: ViewType;
  viewRight: ViewType;
}

const initialState: AppStore = {
  showEditor: false,
  showCollection: true,
  collectionPane: Collection.CHARTS,
  viewLeft: View.NONE,
  viewCenter: View.COLLECTION_CHARTS,
  viewRight: View.CONSTRAINT_TUNER,
};

const appReducer = createReducer<AppStore, AppAction>(initialState, {
  [getType(appActions.toggleShowEditor)]: toggleShowEditor,
  [getType(appActions.toggleShowCollection)]: toggleShowCollection,
  [getType(appActions.setCollectionPane)]: setCollectionPane,
  [getType(appActions.setViewPane)]: setViewPane,
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

function setViewPane(state: AppStore, action: ActionType<typeof appActions.setViewPane>): void {
  const { position, view } = action.payload;

  switch (position) {
    case ViewPosition.LEFT:
      state.viewLeft = view;
      break;
    case ViewPosition.CENTER:
      state.viewCenter = view;
      break;
    case ViewPosition.RIGHT:
      state.viewRight = view;
      break;
  }

  if (view === View.COLLECTION_CHARTS) {
    state.collectionPane === Collection.CHARTS;
  } else if (view === View.COLLECTION_PAIRS) {
    state.collectionPane === Collection.PAIRS;
  }
}
