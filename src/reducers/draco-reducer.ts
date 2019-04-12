import Draco from 'draco-vis';
import { createReducer } from 'redux-starter-kit';
import { getType, ActionType } from 'typesafe-actions';
import { DracoAction, dracoActions } from '../actions/index';
import { ConstraintMap, ConstraintMapObject, ConstraintEdit } from '../model/index';

interface DracoStore {
  constraintMap: ConstraintMapObject;
  finishedRunIds: Set<number>;
  edits: ConstraintEdit[];
}

// Get constraint set (for now we grab from the draco-vis module).
const dummyDraco = new Draco();
const constraintMap = ConstraintMap.fromConstraintSet(dummyDraco.getConstraintSet());

const initialState: DracoStore = {
  constraintMap,
  finishedRunIds: new Set(),
  edits: [],
};

// @ts-ignore
const dracoReducer = createReducer<DracoStore, DracoAction>(initialState, {
  [getType(dracoActions.setConstraintMap)]: setConstraintMap,
  [getType(dracoActions.addConstraintEdit)]: addConstraintEdit
});

function setConstraintMap(state: DracoStore, action: ActionType<typeof dracoActions.setConstraintMap>) {
  state.constraintMap = action.payload;
}

function addConstraintEdit(state: DracoStore, action: ActionType<typeof dracoActions.addConstraintEdit>) {
  const edit = action.payload;
  state.edits.push(edit);

  if (ConstraintEdit.isCostEdit(edit)) {
    state.constraintMap[edit.targetId].weight = edit.after;
  }
}

export default dracoReducer;
