import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import PairCard, { PairCardProps, PairCardStoreProps } from '../presenters/pair-card';

function mapStateToProps(rootState: RootState, props: PairCardProps): PairCardStoreProps {
  const pair = rootState.pairCollection.pairs[props.id];
  const left = pair.left;
  const right = pair.right;
  const comparator = pair.comp;

  return {
    left,
    right,
    comparator,
  };
}

export default connect(
  mapStateToProps,
  null
)(PairCard);
