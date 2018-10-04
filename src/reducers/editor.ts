import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { EditorAction, editorActions } from '../actions';
import { EditorType } from '../actions/editor-actions';
import { SCATTER } from '../examples';

export type CodeState = {
  readonly draco: string;
  readonly vegaLite: string;
}

export type EditorState = {
  readonly code: CodeState;
  readonly type: EditorType,
};

const initialCode: CodeState = {
  draco: SCATTER,
  vegaLite: '',
};

export default combineReducers<EditorState, EditorAction>({
  code: (state: CodeState = initialCode, action: EditorAction) => {
    switch (action.type) {
      case getType(editorActions.updateDracoEditorCode):
        return {
          ...state,
          draco: action.payload,
        };
      default:
        return state;
    }
  },
  type: (state: EditorType = 'draco', action: EditorAction) => {
    switch (action.type) {
      case getType(editorActions.switchEditor):
        return action.payload;
      default:
        return state;
    }
  },
});
