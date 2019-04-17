import { constraints } from 'draco-vis';
import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { TextEditorAction, textEditorActions } from '../actions/index';
import { AspPrograms, AspProgramsObject, AspProgramsType } from '../model/asp-program';
import { ConstraintMap } from '../model/index';
import { constraintMap } from './draco-reducer';

export interface TextEditorStore {
  vegalite: VegaLiteStore;
  asp: AspStore;
  selectedEditor: EditorType;
  aspProgram: AspProgramsType;
}

export class Editor {
  static VEGA_LITE: 'vegalite' = 'vegalite';
  static ASP: 'asp' = 'asp';
}

export type EditorType = typeof Editor.VEGA_LITE | typeof Editor.ASP;

export interface VegaLiteStore {
  code: string;
}

export interface AspStore extends AspProgramsObject {}

const constraintAspPrograms = ConstraintMap.toAspPrograms(constraintMap);

const initialState: TextEditorStore = {
  vegalite: {
    code: '',
  },
  asp: {
    ...constraintAspPrograms,
    hardIntegrity: constraints.HARD_INTEGRITY,
    define: constraints.DEFINE,
    optimize: constraints.OPTIMIZE,
    output: constraints.OUTPUT,
    generate: constraints.GENERATE,
    topkLua: constraints.TOPK_LUA,
  },
  selectedEditor: Editor.VEGA_LITE,
  aspProgram: AspPrograms.SOFT_DEFINE,
};

const textEditorReducer = createReducer<TextEditorStore, TextEditorAction>(initialState, {
  [getType(textEditorActions.setVegaLiteCode)]: setVegaLiteCode,
  [getType(textEditorActions.setEditorType)]: setEditorType,
  [getType(textEditorActions.setAspProgram)]: setAspProgram,
});

export default textEditorReducer;

function setVegaLiteCode(state: TextEditorStore, action: ActionType<typeof textEditorActions.setVegaLiteCode>): void {
  state.vegalite.code = action.payload;
}

function setEditorType(state: TextEditorStore, action: ActionType<typeof textEditorActions.setEditorType>): void {
  state.selectedEditor = action.payload;
}

function setAspProgram(state: TextEditorStore, action: ActionType<typeof textEditorActions.setAspProgram>): void {
  state.aspProgram = action.payload;
}
