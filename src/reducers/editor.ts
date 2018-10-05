import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { TopLevelSpec } from 'vega-lite';
import { EditorAction, editorActions } from '../actions';
import { EditorType } from '../actions/editor-actions';
import { SCATTER, VL_HISTOGRAM } from '../examples';

export type CodeState = {
  readonly draco: string;
  readonly vegalite: string;
};

export type EditorState = {
  readonly code: CodeState;
  readonly type: EditorType,
  readonly vlSpec: TopLevelSpec,
};

const initialCode: CodeState = {
  draco: SCATTER,
  vegalite: VL_HISTOGRAM,
};

export default combineReducers<EditorState, EditorAction>({
  code: (state: CodeState = initialCode, action: EditorAction) => {
    switch (action.type) {
      case getType(editorActions.updateDracoEditorCode):
        return {
          ...state,
          draco: action.payload,
        };
      case getType(editorActions.updateVegaLiteEditorCode):
        return {
          ...state,
          vegalite: action.payload,
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
  vlSpec: (state: TopLevelSpec = null, action: EditorAction) => {
    switch (action.type) {
      case getType(editorActions.updateVegaLiteSpec):
        return JSON.parse(action.payload);
      default:
        return state;
    }
  },
});
