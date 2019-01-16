import Draco, { SolutionSet } from 'draco-vis'; // tslint:disable-line
import { none, Option, some } from "ts-option";
import { getType } from 'typesafe-actions';
import { TopLevelSpec } from 'vega-lite';
import { EditorAction, editorActions } from '../actions';
import { SCATTER, VL_HISTOGRAM } from '../examples';

export type CodeState = {
  readonly draco: string;
  readonly vegalite: string;
};

export type VegaLiteState = {
  readonly specOpt: Option<TopLevelSpec>;
};

export type DracoState = {
  readonly moduleOpt: Option<Draco>;
  readonly prevProgramOpt: Option<string>;
  readonly solutionSetOpt: Option<SolutionSet>;
};

export type InfoPaneState = {
  readonly show: boolean;
  readonly vlSpecOpt: Option<TopLevelSpec>;
  readonly aspSpecOpt: Option<string>;
  readonly dracoSpecOpt: Option<SolutionSet>;
};

export type EditorState = {
  readonly code: CodeState;
  readonly type: editorActions.EditorType;
  readonly vegalite: VegaLiteState;
  readonly draco: DracoState;
  readonly infoPane: InfoPaneState;
};

const initialState: EditorState = {
  code: {
    draco: SCATTER,
    vegalite: VL_HISTOGRAM,
  },
  type: 'draco',
  vegalite: {
    specOpt: none,
  },
  draco: {
    moduleOpt: none,
    prevProgramOpt: none,
    solutionSetOpt: none,
  },
  infoPane: {
    show: false,
    vlSpecOpt: none,
    aspSpecOpt: none,
    dracoSpecOpt: none
  },
};

const editor = (state: EditorState = initialState, action: EditorAction) => {
  switch (action.type) {
    case getType(editorActions.updateDracoEditorCode):
      return updateDracoEditorCode(state, action.payload);
    case getType(editorActions.updateVegaLiteEditorCode):
      return updateVegaLiteEditorCode(state, action.payload);
    case getType(editorActions.switchEditor):
      return switchEditor(state, action.payload);
    case getType(editorActions.updateVegaLiteSpec):
      return updateVegaLiteSpec(state);
    case getType(editorActions.setEditorDracoSolutionSet):
      return setEditorDracoSolutionSet(state, action.payload);
    case getType(editorActions.setInfoPaneDracoSolutionSet):
      return setInfoPaneDracoSolutionSet(state, action.payload);
    case getType(editorActions.setInfoPaneAsp):
      return setInfoPaneAsp(state, action.payload);
    case getType(editorActions.showInfoPane):
      return showInfoPane(state, action.payload);
    case getType(editorActions.setInfoPaneVegalite):
      return setInfoPaneVegalite(state, action.payload);
    default:
      return state;
  }
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

const switchEditor = (state: EditorState, payload: editorActions.EditorType): EditorState => {
  return {
    ...state,
    type: payload,
  };
};

const updateVegaLiteSpec = (state: EditorState): EditorState => {
  const vegalite = {
    ...state.vegalite,
    specOpt: some(JSON.parse(state.code.vegalite)),
  };
  return {
    ...state,
    vegalite,
  };
};

const setEditorDracoSolutionSet = (state: EditorState, solutionSet: SolutionSet): EditorState => {
  const draco = {
    ...state.draco,
    solutionSetOpt: some(solutionSet),
  };

  return {
    ...state,
    draco,
  };
};

const setInfoPaneDracoSolutionSet = (state: EditorState, solutionSet: SolutionSet): EditorState => {
  const infoPane = {
    ...state.infoPane,
    dracoSpecOpt: some(solutionSet),
  };

  return {
    ...state,
    infoPane,
  };
};

const setInfoPaneAsp = (state: EditorState, asp: string): EditorState => {
  const infoPane = {
    ...state.infoPane,
    aspSpecOpt: some(asp),
  };

  return {
    ...state,
    infoPane,
  };
};

const showInfoPane = (state: EditorState, show: boolean): EditorState => {
  const infoPane = {
    ...state.infoPane,
    show,
  };

  return {
    ...state,
    infoPane,
  };
};

const setInfoPaneVegalite = (state: EditorState, spec: TopLevelSpec) => {
  const infoPane = {
    ...state.infoPane,
    vlSpecOpt: some(spec),
  };

  return {
    ...state,
    infoPane,
  };
};

export default editor;
