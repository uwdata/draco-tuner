import Draco from 'draco-vis';
import _ from 'lodash';
import { createReducer } from 'redux-starter-kit';
import { ActionType, getType } from 'typesafe-actions';
import { DracoAction, dracoActions } from '../actions/index';
import {
  CheckpointMapObject,
  ConstraintEdit,
  ConstraintEditObject,
  ConstraintMap,
  ConstraintMapObject,
} from '../model/index';

export interface DracoStore {
  constraintMap: ConstraintMapObject;
  finishedRunIds: Set<number>;
  edits: ConstraintEditObject[];
  editIndex: number;
  checkpointMap: CheckpointMapObject;
  nextCheckpointId: number;
}

// Get constraint set (for now we grab from the draco-vis module).
const dummyDraco = new Draco();
const constraintMap = ConstraintMap.fromConstraintSet(dummyDraco.getConstraintSet());

const initialState: DracoStore = {
  constraintMap,
  finishedRunIds: new Set(),
  edits: [],
  editIndex: 0,
  checkpointMap: {},
  nextCheckpointId: 0,
};

// @ts-ignore
const dracoReducer = createReducer<DracoStore, DracoAction>(initialState, {
  [getType(dracoActions.setConstraintMap)]: setConstraintMap,
  [getType(dracoActions.addConstraintEdit)]: addConstraintEdit,
  [getType(dracoActions.revertToEdit)]: revertToEdit,
  [getType(dracoActions.moveEditIndex)]: moveEditIndex,
  [getType(dracoActions.deleteCurrentEdit)]: deleteCurrentEdit,
});

function setConstraintMap(state: DracoStore, action: ActionType<typeof dracoActions.setConstraintMap>): void {
  state.constraintMap = action.payload;
}

function addConstraintEdit(state: DracoStore, action: ActionType<typeof dracoActions.addConstraintEdit>): void {
  const edit = action.payload;

  if (state.edits.length > 0) {
    const prevEdit = state.edits[state.editIndex];
    if (prevEdit.type === edit.type) {
      if (
        !ConstraintEdit.isCheckpoint(prevEdit) &&
        !ConstraintEdit.isCheckpoint(edit) &&
        prevEdit.targetId === edit.targetId
      ) {
        prevEdit.after = edit.after;
      } else {
        state.edits.splice(state.editIndex, 0, edit);
      }
    } else {
      state.edits.splice(state.editIndex, 0, edit);
    }
  } else {
    state.edits.splice(state.editIndex, 0, edit);
  }

  updateConstraintMap(state);
}

function revertToEdit(state: DracoStore, action: ActionType<typeof dracoActions.revertToEdit>): void {
  const editIndex = action.payload;
  if (editIndex >= state.edits.length || editIndex < 0) {
    return;
  }
  state.editIndex = editIndex;

  updateConstraintMap(state);
}

function moveEditIndex(state: DracoStore, action: ActionType<typeof dracoActions.moveEditIndex>): void {
  const moveBy = action.payload;
  const newEditIndex = state.editIndex + moveBy;
  if (newEditIndex >= state.edits.length || newEditIndex < 0) {
    return;
  }

  state.editIndex = newEditIndex;
  updateConstraintMap(state);
}

function deleteCurrentEdit(state: DracoStore, action: ActionType<typeof dracoActions.deleteCurrentEdit>): void {
  state.edits.splice(state.editIndex, 1);
  updateConstraintMap(state);
}

function updateConstraintMap(state: DracoStore): void {
  const editIndex = state.editIndex;

  state.edits.slice(0, editIndex).forEach(edit => {
    if (ConstraintEdit.isCostEdit(edit)) {
      state.constraintMap[edit.targetId].weight = edit.before;
    }
  });

  _.reverse(state.edits.slice(editIndex, state.edits.length)).forEach(edit => {
    if (ConstraintEdit.isCostEdit(edit)) {
      state.constraintMap[edit.targetId].weight = edit.after;
    }
  });
}
export default dracoReducer;
