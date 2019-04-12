import Draco from 'draco-vis';
import { createReducer } from 'redux-starter-kit';
import { getType } from 'typesafe-actions';
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

const initialState = {
  constraintMap,
  finishedRunIds: new Set(),
};

// @ts-ignore
const dracoReducer = createReducer<DracoStore, DracoAction>(initialState, {
  [getType(dracoActions.setConstraintMap)]: (state: DracoStore, action: DracoAction) => {
    state.constraintMap = action.payload;
  },
});

export default dracoReducer;
