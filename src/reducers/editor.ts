import Draco, { SolutionSet } from 'draco-vis'; // tslint:disable-line
import { getType } from 'typesafe-actions';
import { TopLevelSpec } from 'vega-lite';
import Worker from 'worker-loader!../worker/Worker'; // tslint:disable-line
import { EditorAction, editorActions } from '../actions';
import { EditorType } from '../actions/editor-actions';
import { SCATTER, VL_HISTOGRAM } from '../examples';

const worker = new Worker();

export type CodeState = {
  readonly draco: string;
  readonly vegalite: string;
};

export type VegaLiteState = {
  readonly spec: TopLevelSpec | null;
};

export type DracoState = {
  readonly module: Draco | null;
  readonly prevProgram: string | null;
  readonly solutionSet: SolutionSet | null;
};

export type InfoPaneState = {
  readonly vlSpec: TopLevelSpec;
  readonly aspSpec: string;
  readonly dracoSpec: SolutionSet;
};

export type EditorState = {
  readonly code: CodeState;
  readonly type: EditorType;
  readonly vegalite: VegaLiteState;
  readonly draco: DracoState;
};

const initialState: EditorState = {
  code: {
    draco: SCATTER,
    vegalite: VL_HISTOGRAM,
  },
  type: 'draco',
  vegalite: {
    spec: null,
  },
  draco: {
    module: null,
    prevProgram: null,
    solutionSet: null,
  },
};

const editor = (state: EditorState = initialState, action: EditorAction) => {
  switch (action.type) {
    case getType(editorActions.initDraco):
      return initDraco(state);
    case getType(editorActions.updateDracoEditorCode):
      return updateDracoEditorCode(state, action.payload);
    case getType(editorActions.updateVegaLiteEditorCode):
      return updateVegaLiteEditorCode(state, action.payload);
    case getType(editorActions.switchEditor):
      return switchEditor(state, action.payload);
    case getType(editorActions.updateVegaLiteSpec):
      return updateVegaLiteSpec(state);
    case getType(editorActions.updateDracoSolutionSet):
      return updateDracoSolutionSet(state, action.payload);
    default:
      return state;
  }
};

const initDraco = (state: EditorState) => {
  const module = new Draco('static', (status: string) => { console.debug(status); });
  module.init();

  const draco: DracoState = {
    ...state.draco,
    module,
  };

  return {
    ...state,
    draco,
  };
};

const updateDracoEditorCode = (state: EditorState, payload: string): EditorState => {
  const code = {
    ...state.code,
    draco: payload,
  };
  return {
    ...state,
    code,
  };
};

const updateVegaLiteEditorCode = (state: EditorState, payload: string): EditorState => {
  const code = {
    ...state.code,
    vegalite: payload,
  };
  return {
    ...state,
    code,
  };
};

const switchEditor = (state: EditorState, payload: EditorType): EditorState => {
  return {
    ...state,
    type: payload,
  };
};

const updateVegaLiteSpec = (state: EditorState): EditorState => {
  const vegalite = {
    ...state.vegalite,
    spec: JSON.parse(state.code.vegalite),
  };
  return {
    ...state,
    vegalite,
  };
};

const updateDracoSolutionSet = (state: EditorState, solutionSet: SolutionSet): EditorState => {
  const draco = {
    ...state.draco,
    solutionSet,
  };

  return {
    ...state,
    draco,
  };
};

export default editor;
