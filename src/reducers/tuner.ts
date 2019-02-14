import { constraints } from 'draco-core';
import Draco from 'draco-vis';
import { none, Option, some } from 'ts-option';
import { getType } from 'typesafe-actions';
import { TunerAction, tunerActions } from '../actions';

export interface TunerState {
  dracoOpt: Option<Draco>;
  code: string;
  editor: EditorType;
}

const initialState = {
  dracoOpt: none,
  code: constraints.WEIGHTS,
  editor: 'table' as EditorType,
};

export type EditorType = 'table' | 'asp';

const tuner = (state: TunerState = initialState, action: TunerAction): TunerState => {
  switch (action.type) {
    case getType(tunerActions.setDraco):
      return setDraco(state, action.payload);
    case getType(tunerActions.updateEditorCode):
      return updateEditorCode(state, action.payload);
    case getType(tunerActions.switchEditor):
      return switchEditor(state, action.payload);
    default:
      return state;
  }
};

export default tuner;

const setDraco = (state: TunerState, dracoStringified: string): TunerState => {
  return {
    ...state,
    dracoOpt: some(JSON.parse(dracoStringified))
  }
}

const updateEditorCode = (state: TunerState, code: string): TunerState => {
  return {
    ...state,
    code,
  };
};

const switchEditor = (state: TunerState, editor: EditorType): TunerState => {
  return {
    ...state,
    editor,
  }
}
