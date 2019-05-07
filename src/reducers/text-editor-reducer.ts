import { constraints } from 'draco-vis';
import { TopLevelUnitSpec } from 'draco-vis/node_modules/vega-lite/build/src/spec/unit';
import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { TextEditorAction, textEditorActions } from '../actions/index';
import { AspPrograms, AspProgramsObject, AspProgramsType } from '../model/asp-program';
import { ConstraintMap, isValidJSON, Spec } from '../model/index';
import { constraintMap } from './draco-reducer';

export interface TextEditorStore {
  vegalite: VegaLiteStore;
  asp: AspProgramsObject;
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
  parsedVlSpec: TopLevelUnitSpec;
  status: VegaLiteStatus;
}

export class VegaLiteStatus {
  static OK: 'ok' = 'ok';
  static INVALID_JSON: 'invalid json' = 'invalid json';
  static INVALID_VEGALITE: 'invalid vegalite' = 'invalid vegalite';
}

export type VegaLiteStatusType =
  | typeof VegaLiteStatus.OK
  | typeof VegaLiteStatus.INVALID_JSON
  | typeof VegaLiteStatus.INVALID_VEGALITE;

const constraintAspPrograms = ConstraintMap.toAspPrograms(constraintMap);

export const TEXT_EDITOR_REDUCER_INITIAL_STATE: TextEditorStore = {
  vegalite: {
    code: '',
    parsedVlSpec: null,
    status: VegaLiteStatus.INVALID_VEGALITE,
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

export const textEditorReducer = createReducer<TextEditorStore, TextEditorAction>(TEXT_EDITOR_REDUCER_INITIAL_STATE, {
  [getType(textEditorActions.setVegaLiteCode)]: setVegaLiteCode,
  [getType(textEditorActions.setEditorType)]: setEditorType,
  [getType(textEditorActions.setAspEditorProgram)]: setAspEditorProgram,
  [getType(textEditorActions.setAspCode)]: setAspCode,
});

export default textEditorReducer;

function setVegaLiteCode(state: TextEditorStore, action: ActionType<typeof textEditorActions.setVegaLiteCode>): void {
  const code = action.payload;

  state.vegalite.code = code;

  if (isValidJSON(code)) {
    const potentialSpec = JSON.parse(code);
    if (Spec.isVlSpecValid(potentialSpec)) {
      state.vegalite.parsedVlSpec = potentialSpec;
      state.vegalite.status = VegaLiteStatus.OK;
    } else {
      state.vegalite.status = VegaLiteStatus.INVALID_VEGALITE;
    }
  } else {
    state.vegalite.status = VegaLiteStatus.INVALID_JSON;
  }
}

function setEditorType(state: TextEditorStore, action: ActionType<typeof textEditorActions.setEditorType>): void {
  state.selectedEditor = action.payload;
}

function setAspEditorProgram(
  state: TextEditorStore,
  action: ActionType<typeof textEditorActions.setAspEditorProgram>
): void {
  state.aspProgram = action.payload;
}

function setAspCode(state: TextEditorStore, action: ActionType<typeof textEditorActions.setAspCode>): void {
  state.asp = AspPrograms.setProgramWithType(state.asp, action.payload.programType, action.payload.code);
}
