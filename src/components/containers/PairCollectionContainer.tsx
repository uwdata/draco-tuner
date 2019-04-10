import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { reloadPairsThunk, toggleFocusPair } from '../../actions/pair-collection-actions';
import { RootState } from '../../reducers';
import PairCollection, { PairCollectionDispatchProps, PairCollectionOwnProps, PairCollectionStoreProps } from '../presenters/pair-collection/PairCollection';

function mapStateToProps(rootState: RootState, props: PairCollectionOwnProps) {
  const pairIds = Object.keys(rootState.pairCollection.pairs);
  return {
    pairIds,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  props: PairCollectionOwnProps
): PairCollectionDispatchProps {
  return {
    reloadPairs: () => dispatch(reloadPairsThunk()),
    clearFocusPair: () => dispatch(toggleFocusPair(null, false)),
  };
}

export default connect<PairCollectionStoreProps, PairCollectionDispatchProps, PairCollectionOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PairCollection);
