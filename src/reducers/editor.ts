import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { EditorAction, editorActions } from '../actions';
import { SCATTER } from '../examples';

export type EditorState = {
  readonly code: string;
};

export default combineReducers<EditorState, EditorAction>({
  code: (state: string = SCATTER, action: EditorAction) => {
    switch (action.type) {
      case getType(editorActions.updateEditorCode):
        return action.payload;
      default:
        return state;
    }
  },
});
