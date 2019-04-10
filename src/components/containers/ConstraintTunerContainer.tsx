import { Constraint } from 'draco-vis';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setConstraintMap } from '../../actions/draco-actions';
import { ConstraintMap, ViolationMap } from '../../model';
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

    if (pair.left.sol) {
      sortBy.splice(0, 0, extractSortWeight(pair.left.sol.violations, false));
      sortBy.splice(0, 0, extractSortWeight(pair.left.sol.violations, true));
    }

    if (pair.right.sol) {
      sortBy.splice(0, 0, extractSortWeight(pair.right.sol.violations, false));
      sortBy.splice(0, 0, extractSortWeight(pair.right.sol.violations, true));
    }

    if (pair.left.sol && pair.right.sol) {
      sortBy.splice(0, 0, (c: Constraint) => {
        const leftV = pair.left.sol.violations;
        const rightV = pair.right.sol.violations;
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
    if (pair.left.sol) {
      focusLeftViolationCounts = constraints.map(c => {
        if (pair.left.sol.violations.hasOwnProperty(c.name)) {
          return pair.left.sol.violations[c.name].length;
        }
        return 0;
      });
    }

    if (pair.right.sol) {
      focusRightViolationCounts = constraints.map(c => {
        if (pair.right.sol.violations.hasOwnProperty(c.name)) {
          return pair.right.sol.violations[c.name].length;
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
