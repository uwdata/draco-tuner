import Draco from 'draco-vis';
import _ from 'lodash';
import { createReducer } from 'redux-starter-kit';
import { getType } from 'typesafe-actions';
import { DracoAction, dracoActions } from '../actions/index';
import { ConstraintMap, ConstraintMapObject } from '../model/index';

interface DracoStore {
  constraintMap: ConstraintMapObject;
  finishedRunIds: Set<number>;
}

// Get constraint set (for now we grab from the draco-vis module).
const dummyDraco = new Draco();
const constraintSet = dummyDraco.getConstraintSet();
const allConstraints = _.flatMap([constraintSet.hard, constraintSet.soft], set => {
  return set.map(constraint => constraint);
});
const constraintMap: ConstraintMapObject = ConstraintMap.fromConstraintList(allConstraints);

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
