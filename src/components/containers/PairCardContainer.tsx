import _ from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { solvePairsBegin } from '../../actions/draco-worker-actions';
import { toggleFocusPair } from '../../actions/pair-collection-actions';
import { RootState } from '../../reducers';
import { Pair } from '../../reducers/pair-collection-reducer';
import PairCard, { PairCardDispatchProps, PairCardOwnProps, PairCardStoreProps } from '../presenters/pair-card';

function mapStateToProps(rootState: RootState, props: PairCardOwnProps): PairCardStoreProps {
  const pair = rootState.pairCollection.pairs[props.id];
  const [left, right] = [pair.left, pair.right].map(pairItem => {
    let cost;
    if (pairItem.sol) {
      cost = Object.keys(pairItem.sol.violations).reduce((c, vname) => {
        const numViolations = pairItem.sol.violations[vname].length;
        const weight = rootState.draco.constraintMap[vname].weight;
        return c + weight * numViolations;
      }, 0);
    }

    return {
      cost,
      vlSpec: pairItem.vlSpec,
    };
  });
  const comparator = pair.comparator;

  let pass;
  if (!_.isUndefined(left.cost) && _.isUndefined(right.cost)) {
    pass = true;
  } else if (!_.isUndefined(left.cost) && !_.isUndefined(right.cost)) {
    if (comparator === '<') {
      pass = left.cost < right.cost;
    } else {
      pass = left.cost === right.cost;
    }
  } else {
    pass = false;
  }

  const focused = rootState.pairCollection.focusPair === props.id;
  const finishedRunIds = rootState.draco.finishedRunIds;
  return {
    left,
    right,
    comparator,
    pass,
    focused,
    finishedRunIds,
  };
}

function mapDispatchToProps(dispatch: Dispatch, props: PairCardOwnProps) {
  return {
    solvePair: (pair: Pair, runId: number) => {
      dispatch(solvePairsBegin([pair], runId));
    },
    toggleFocusPair: (id: string, on: boolean) => {
      dispatch(toggleFocusPair(id, on));
    },
  };
}

export default connect<PairCardStoreProps, PairCardDispatchProps, PairCardOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PairCard);
