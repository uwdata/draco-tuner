import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { addCheckpoint, updateStatus } from '../../actions/app-actions';
import { addEmptyPair, reloadPairsThunk, setPairFilters, toggleFocusPair } from '../../actions/pair-collection-actions';
import { CollectionItemFilter, CollectionItemFilterObject } from '../../model';
import { RootState } from '../../reducers';
import PairCollection, {
  PairCollectionDispatchProps,
  PairCollectionOwnProps,
  PairCollectionStoreProps,
} from '../presenters/pair-collection';

function mapStateToProps(state: RootState, props: PairCollectionOwnProps) {
  const unfilteredPairIds = Object.keys(state.pairCollection.pairs).sort(id => +id);

  const pairIds = state.pairCollection.filters.reduce((pairIds: string[], filterObj) => {
    const filterFn = CollectionItemFilter.fromObj(filterObj);
    return pairIds.filter(pairId => {
      const pair = state.pairCollection.pairs[pairId];
      return filterFn(pair, { ...filterObj.opt, constraintMap: state.draco.constraintMap });
    });
  }, unfilteredPairIds);

  const finishedRunIds = state.draco.finishedRunIds;
  const pairEvalDeltaScore = state.pairCollection.pairEvalDeltaScore;
  const score = state.pairCollection.score;

  return {
    pairIds,
    finishedRunIds,
    pairEvalDeltaScore,
    score,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  props: PairCollectionOwnProps
): PairCollectionDispatchProps {
  return {
    reloadPairs: (runId: number) => dispatch(reloadPairsThunk(runId)),
    clearFocusPair: () => dispatch(toggleFocusPair(null, false)),
    setPairFilters: (filters: CollectionItemFilterObject[]) => dispatch(setPairFilters(filters)),
    addCheckpoint: () => {
      dispatch(addCheckpoint());
      dispatch(updateStatus());
    },
    addEmptyPair: () => {
      dispatch(addEmptyPair());
    },
  };
}

export default connect<PairCollectionStoreProps, PairCollectionDispatchProps, PairCollectionOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PairCollection);
