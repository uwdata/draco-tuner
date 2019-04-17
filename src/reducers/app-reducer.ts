import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { AppAction, appActions } from '../actions';

export interface AppStore {
  showEditor: boolean;
  showCollection: boolean;
}

const initialState: AppStore = {
  showEditor: false,
  showCollection: true,
};

const appReducer = createReducer<AppStore, AppAction>(initialState, {
  [getType(appActions.toggleShowEditor)]: toggleShowEditor,
  [getType(appActions.toggleShowCollection)]: toggleShowCollection,
});

export default appReducer;

function toggleShowEditor(state: AppStore, action: ActionType<typeof appActions.toggleShowEditor>): void {
  state.showEditor = action.payload;
}

function toggleShowCollection(state: AppStore, action: ActionType<typeof appActions.toggleShowCollection>): void {
  state.showCollection = action.payload;
}
