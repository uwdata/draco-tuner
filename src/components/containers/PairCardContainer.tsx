import _ from 'lodash';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import PairCard, { PairCardProps, PairCardStoreProps } from '../presenters/pair-card';

function mapStateToProps(rootState: RootState, props: PairCardProps): PairCardStoreProps {
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
    }
  });
  const comparator = pair.comp;
  
  let pass;
  if (!_.isUndefined(left.cost) && _.isUndefined(right.cost)) {
    pass = true;
  } else if (!_.isUndefined(left.cost) && !_.isUndefined(right.cost)) {
    if (comparator === '<') {
      pass = left.cost < right.cost;
    } else {
      pass = left.cost === right.cost;
    }
  }

  return {
    left,
    right,
    comparator,
    pass
  };
}

export default connect(
  mapStateToProps,
  null
)(PairCard);
