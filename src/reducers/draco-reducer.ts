import Draco, { Constraint } from 'draco-vis';
import _ from 'lodash';
import { createReducer } from 'redux-starter-kit';

interface DracoStore {
  constraintMap: ConstraintMap;
}

interface ConstraintMap {
  [name: string]: Constraint;
}

// Get constraint set (for now we grab from the draco-vis module).
const dummyDraco = new Draco();
const constraintSet = dummyDraco.getConstraintSet();
const constraintMap: ConstraintMap =
  _.flatMap([constraintSet.hard, constraintSet.soft], (set) => {
    return set.map(constraint => constraint)
  }).reduce((dict, curr) => {
    dict[curr.name] = curr;
    return dict;
  }, {} as ConstraintMap);

const initialState = {
  constraintMap
};

const dracoReducer = createReducer(initialState, {});

export default dracoReducer;
