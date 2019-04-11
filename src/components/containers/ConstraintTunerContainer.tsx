import { Constraint } from 'draco-vis';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setConstraintMap } from '../../actions/draco-actions';
import { ConstraintMap, DracoSolution, ViolationMap } from '../../model';
import { RootState } from '../../reducers';
import ConstraintTuner, {
  ConstraintTunerDispatchProps,
  ConstraintTunerOwnProps,
  ConstraintTunerStoreProps,
} from '../presenters/constraint-tuner';

function mapStateToProps(state: RootState, props: ConstraintTunerOwnProps): ConstraintTunerStoreProps {
  const sortBy: any = [(c: Constraint) => (c.type === 'soft' ? 0 : 1), (c: Constraint) => c.name];

  if (state.pairCollection.focusPair) {
    const pair = state.pairCollection.pairs[state.pairCollection.focusPair];

    function extractSortWeight(violations: ViolationMap, multiplier: boolean) {
      return (c: Constraint) => {
        if (violations.hasOwnProperty(c.name)) {
          return -violations[c.name].length * (multiplier ? c.weight : 1);
        }
        return 0;
      };
    }

    const leftSol = pair.left.sol;
    if (DracoSolution.isDefined(leftSol)) {
      sortBy.splice(0, 0, extractSortWeight(leftSol.violations, false));
      sortBy.splice(0, 0, extractSortWeight(leftSol.violations, true));
    }

    const rightSol = pair.right.sol;
    if (DracoSolution.isDefined(rightSol)) {
      sortBy.splice(0, 0, extractSortWeight(rightSol.violations, false));
      sortBy.splice(0, 0, extractSortWeight(rightSol.violations, true));
    }

    if (DracoSolution.isDefined(leftSol) && DracoSolution.isDefined(rightSol)) {
      sortBy.splice(0, 0, (c: Constraint) => {
        const leftV = leftSol.violations;
        const rightV = rightSol.violations;
        const numLeft = leftV.hasOwnProperty(c.name) ? leftV[c.name].length : 0;
        const numRight = rightV.hasOwnProperty(c.name) ? rightV[c.name].length : 0;

        if (numLeft === 0 && numRight === 0) {
          return Number.MAX_VALUE;
        }
        return -(numLeft - numRight);
      });
    }
  }
  const constraints = ConstraintMap.toConstraintList(state.draco.constraintMap, sortBy);

  let focusLeftViolationCounts: number[];
  let focusRightViolationCounts: number[];

  if (state.pairCollection.focusPair) {
    const pair = state.pairCollection.pairs[state.pairCollection.focusPair];
    const leftSol = pair.left.sol;
    if (DracoSolution.isDefined(leftSol)) {
      focusLeftViolationCounts = constraints.map(c => {
        if (leftSol.violations.hasOwnProperty(c.name)) {
          return leftSol.violations[c.name].length;
        }
        return 0;
      });
    }

    const rightSol = pair.right.sol;
    if (DracoSolution.isDefined(rightSol)) {
      focusRightViolationCounts = constraints.map(c => {
        if (rightSol.violations.hasOwnProperty(c.name)) {
          return rightSol.violations[c.name].length;
        }
        return 0;
      });
    }
  }

  return {
    constraints,
    focusLeftViolationCounts,
    focusRightViolationCounts,
  };
}

function mapDispatchToProps(dispatch: Dispatch, props: ConstraintTunerOwnProps): ConstraintTunerDispatchProps {
  return {
    updateConstraints: (constraints: Constraint[]): void => {
      const constraintMap = ConstraintMap.fromConstraintList(constraints);
      dispatch(setConstraintMap(constraintMap));
    },
  };
}

export default connect<ConstraintTunerStoreProps, ConstraintTunerDispatchProps, ConstraintTunerOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ConstraintTuner);
