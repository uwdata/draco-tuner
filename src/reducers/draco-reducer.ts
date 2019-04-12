import Draco from 'draco-vis';
import { createReducer } from 'redux-starter-kit';
import { getType, ActionType } from 'typesafe-actions';
import { DracoAction, dracoActions } from '../actions/index';
import { ConstraintMap, ConstraintMapObject, ConstraintEdit, ConstraintEditObject } from '../model/index';

interface DracoStore {
  constraintMap: ConstraintMapObject;
  finishedRunIds: Set<number>;
  edits: ConstraintEditObject[];
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
  [getType(dracoActions.addConstraintEdit)]: addConstraintEdit,
});

function setConstraintMap(state: DracoStore, action: ActionType<typeof dracoActions.setConstraintMap>) {
  state.constraintMap = action.payload;
}

function addConstraintEdit(state: DracoStore, action: ActionType<typeof dracoActions.addConstraintEdit>) {
  const edit = action.payload;

  if (state.edits.length > 0) {
    const prevEdit = state.edits[0];
    if (prevEdit.type === edit.type) {
      if (
        !ConstraintEdit.isCheckpoint(prevEdit) &&
        !ConstraintEdit.isCheckpoint(edit) &&
        prevEdit.targetId === edit.targetId
      ) {
        prevEdit.after = edit.after;
      } else {
        state.edits.splice(0, 0, edit);
      }
    } else {
      state.edits.splice(0, 0, edit);
    }
  } else {
    state.edits.splice(0, 0, edit);
  }

  if (ConstraintEdit.isCostEdit(edit)) {
    state.constraintMap[edit.targetId].weight = edit.after;
  }
}

export default dracoReducer;
