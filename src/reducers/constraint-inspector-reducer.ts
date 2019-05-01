import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { ConstraintInspectorAction, constraintInspectorActions } from '../actions';

export interface ConstraintInspectorStore {
  aspClauses: { [id: string]: AspEditorStore };
}

export interface AspEditorStore {
  code: string;
  id: string;
}

const initialState = {
  aspClauses: {
    '0': {
      id: '0',
      code: '',
    },
  },
};

const cosntraintInspectorReducer = createReducer<ConstraintInspectorStore, ConstraintInspectorAction>(initialState, {
  [getType(constraintInspectorActions.setAspClause)]: setAspClause,
  [getType(constraintInspectorActions.addAspClause)]: addAspClause,
});

export default cosntraintInspectorReducer;

function setAspClause(
  state: ConstraintInspectorStore,
  action: ActionType<typeof constraintInspectorActions.setAspClause>
): void {
  const { code, id } = action.payload;
  state.aspClauses[id].code = code;
}

function addAspClause(
  state: ConstraintInspectorStore,
  action: ActionType<typeof constraintInspectorActions.addAspClause>
): void {
  const nextId = (
    Object.keys(state.aspClauses).reduce((max, id) => {
      return +id > max ? +id : max;
    }, 0) + 1
  ).toString();

  state.aspClauses[nextId] = {
    id: nextId,
    code: '',
  };
}
