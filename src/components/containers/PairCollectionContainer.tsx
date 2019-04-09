import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { reloadPairsThunk } from '../../actions/pair-collection-actions';
import { RootState } from '../../reducers';
import PairCollection, {
  PairCollectionDispatchProps,
  PairCollectionProps,
} from '../presenters/pair-collection/PairCollection';

function mapStateToProps(rootState: RootState, props: PairCollectionProps) {
  const pairIds = Object.keys(rootState.pairCollection.pairs).map(pairId => +pairId);
  return {
    pairIds,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  props: PairCollectionProps
): PairCollectionDispatchProps {
  return {
    reloadPairs: () => dispatch(reloadPairsThunk()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PairCollection);
