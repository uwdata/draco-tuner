import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { ConstraintTunerActions, constraintTunerActions } from '../actions';

export interface ConstraintTunerStore {
  focusConstraint?: string;
}

const initialState = {};

const constraintTunerReducer = createReducer<ConstraintTunerStore, ConstraintTunerActions>(initialState, {
  [getType(constraintTunerActions.toggleFocusConstraint)]: toggleFocusConstraint,
});

export default constraintTunerReducer;

function toggleFocusConstraint(
  state: ConstraintTunerStore,
  action: ActionType<typeof constraintTunerActions.toggleFocusConstraint>
): void {
  const { id, on } = action.payload;
  if (on) {
    state.focusConstraint = id;
  } else {
    state.focusConstraint = undefined;
  }
}
