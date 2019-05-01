import { Constraint } from 'draco-vis';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleShowEditor, updateStatus } from '../../actions/app-actions';
import { addChartFilters, removeChartFilters } from '../../actions/chart-collection-actions';
import { toggleFocusConstraint } from '../../actions/constraint-tuner-actions';
import { addConstraintEdit } from '../../actions/draco-actions';
import { addPairFilters, removePairFilters } from '../../actions/pair-collection-actions';
import { setEditorType } from '../../actions/text-editor-actions';
import {
  CollectionItemFilterObject,
  ConstraintEditObject,
  ConstraintMap,
  DracoSolution,
  ViolationMap,
} from '../../model';
import { RootState } from '../../reducers';
import { Collection } from '../../reducers/app-reducer';
import { Editor, EditorType } from '../../reducers/text-editor-reducer';
import ConstraintTuner, {
  ConstraintTunerDispatchProps,
  ConstraintTunerOwnProps,
  ConstraintTunerStoreProps,
} from '../presenters/constraint-tuner';

function mapStateToProps(state: RootState, props: ConstraintTunerOwnProps): ConstraintTunerStoreProps {
  const sortBy: any = [(c: Constraint) => (c.type === 'soft' ? 0 : 1), (c: Constraint) => c.name];

  if (!!state.pairCollection.focusPair && state.app.collectionPane === Collection.PAIRS) {
    const pair = state.pairCollection.pairs[state.pairCollection.focusPair];

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
  } else if (!_.isUndefined(state.chartCollection.focusChart) && state.app.collectionPane === Collection.CHARTS) {
    const chart = state.chartCollection.charts[state.chartCollection.focusChart];
    if (DracoSolution.isDefined(chart.sol)) {
      sortBy.splice(0, 0, extractSortWeight(chart.sol.violations, false));
      sortBy.splice(0, 0, extractSortWeight(chart.sol.violations, true));
    }
  }

  const constraints = ConstraintMap.toConstraintList(state.draco.constraintMap, sortBy);

  let focusLeftViolationCounts: number[];
  let focusRightViolationCounts: number[];

  if (!!state.pairCollection.focusPair && state.app.collectionPane === Collection.PAIRS) {
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
  } else if (!_.isUndefined(state.chartCollection.focusChart) && state.app.collectionPane === Collection.CHARTS) {
    const chart = state.chartCollection.charts[state.chartCollection.focusChart];
    const leftSol = chart.sol;
    if (DracoSolution.isDefined(leftSol)) {
      focusLeftViolationCounts = constraints.map(c => {
        if (leftSol.violations.hasOwnProperty(c.name)) {
          return leftSol.violations[c.name].length;
        }
        return 0;
      });
    }
  }

  const focusConstraint = state.constraintTuner.focusConstraint;

  return {
    constraints,
    focusLeftViolationCounts,
    focusRightViolationCounts,
    focusConstraint,
  };
}

function mapDispatchToProps(dispatch: Dispatch, props: ConstraintTunerOwnProps): ConstraintTunerDispatchProps {
  return {
    addConstraintEdit: (edit: ConstraintEditObject): void => {
      dispatch(addConstraintEdit(edit));
      dispatch(updateStatus());
    },
    switchToAspEditor: (editorType?: EditorType): void => {
      dispatch(setEditorType(Editor.ASP));
    },
    toggleShowEditor: (show: boolean): void => {
      dispatch(toggleShowEditor(show));
    },
    toggleFocusConstraint: (id: string, on: boolean) => {
      dispatch(toggleFocusConstraint(id, on));
    },
    addFilters: (filters: CollectionItemFilterObject[]) => {
      dispatch(addChartFilters(filters));
      dispatch(addPairFilters(filters));
    },
    removeFilters: (filters: CollectionItemFilterObject[]) => {
      dispatch(removeChartFilters(filters));
      dispatch(removePairFilters(filters));
    },
  };
}

export default connect<ConstraintTunerStoreProps, ConstraintTunerDispatchProps, ConstraintTunerOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ConstraintTuner);

function extractSortWeight(violations: ViolationMap, multiplier: boolean) {
  return (c: Constraint) => {
    if (violations.hasOwnProperty(c.name)) {
      return -violations[c.name].length * (multiplier ? c.weight : 1);
    }
    return 0;
  };
}
