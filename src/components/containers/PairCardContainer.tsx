import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { solvePairsBegin } from '../../actions/draco-worker-actions';
import { toggleFocusPair } from '../../actions/pair-collection-actions';
import { Pair, PairObject } from '../../model/pair';
import { RootState } from '../../reducers';
import PairCard, {
  PairCardDispatchProps,
  PairCardItem,
  PairCardOwnProps,
  PairCardStoreProps,
} from '../presenters/pair-card';

function mapStateToProps(rootState: RootState, props: PairCardOwnProps): PairCardStoreProps {
  const pair = rootState.pairCollection.pairs[props.id];
  const [left, right]: PairCardItem[] = Pair.getPairCardItems(pair, rootState.draco.constraintMap);
  const comparator = pair.comparator;
  const pass = Pair.getPassFail(pair, rootState.draco.constraintMap);

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
    solvePair: (pair: PairObject, runId: number) => {
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
