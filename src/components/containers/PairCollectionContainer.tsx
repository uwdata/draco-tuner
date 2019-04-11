import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { reloadPairsThunk, setPairFilters, toggleFocusPair } from '../../actions/pair-collection-actions';
import { PairFilter, PairFilterType } from '../../model';
import { RootState } from '../../reducers';
import PairCollection, {
  PairCollectionDispatchProps,
  PairCollectionOwnProps,
  PairCollectionStoreProps,
} from '../presenters/pair-collection/PairCollection';

function mapStateToProps(state: RootState, props: PairCollectionOwnProps) {
  const unfilteredPairIds = Object.keys(state.pairCollection.pairs);
  const pairFilters = state.pairCollection.filters.map(type => PairFilter.fromType(type));

  const pairIds = pairFilters.reduce((pairIds: string[], filterFn) => {
    return pairIds.filter(pairId => {
      const pair = state.pairCollection.pairs[pairId];
      return filterFn(pair, { constraintMap: state.draco.constraintMap });
    });
  }, unfilteredPairIds);

  const finishedRunIds = state.draco.finishedRunIds;
  return {
    pairIds,
    finishedRunIds,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  props: PairCollectionOwnProps
): PairCollectionDispatchProps {
  return {
    reloadPairs: (runId: number) => dispatch(reloadPairsThunk(runId)),
    clearFocusPair: () => dispatch(toggleFocusPair(null, false)),
    setPairFilters: (filterTypes: PairFilterType[]) => dispatch(setPairFilters(filterTypes)),
  };
}

export default connect<PairCollectionStoreProps, PairCollectionDispatchProps, PairCollectionOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PairCollection);
