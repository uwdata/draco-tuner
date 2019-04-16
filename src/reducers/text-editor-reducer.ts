import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { textEditorActions } from '../actions/index';

export interface TextEditorStore {
  vegalite: string;
}

const initialState: TextEditorStore = {
  vegalite: '',
};

const textEditorReducer = createReducer(initialState, {
  [getType(textEditorActions.setVegaLiteCode)]: setVegaLiteCode,
});

function setVegaLiteCode(state: TextEditorStore, action: ActionType<typeof textEditorActions.setVegaLiteCode>) {
  state.vegalite = action.payload;
}

export default textEditorReducer;
