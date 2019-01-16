import { constraints } from 'draco-core';
import { getType } from 'typesafe-actions';
import { TunerAction, tunerActions } from '../actions';

export interface TunerState {
  code: string;
}

const initialState = {
  code: constraints.WEIGHTS,
};

const tuner = (state: TunerState = initialState, action: TunerAction): TunerState => {
  switch (action.type) {
    case getType(tunerActions.updateEditorCode):
      return updateEditorCode(state, action.payload);
    default:
      return state;
  }
};

export default tuner;

const updateEditorCode = (state: TunerState, code: string): TunerState => {
  return {
    ...state,
    code,
  };
};
