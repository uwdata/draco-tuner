import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { toggleShowEditor } from '../../actions/app-actions';
import { solvePairsThunk, toggleFocusPair, toggleFocusPairItem } from '../../actions/pair-collection-actions';
import { setEditorType, setVegaLiteCode } from '../../actions/text-editor-actions';
import { Pair, PairObject } from '../../model/pair';
import { RootState } from '../../reducers';
import { EditorType } from '../../reducers/text-editor-reducer';
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

  const evalType = Pair.getEval(pair, rootState.draco.constraintMap);

  const focused = rootState.pairCollection.focusPair === props.id;
  const focusItem = focused ? rootState.pairCollection.focusItem : undefined;
  const finishedRunIds = rootState.draco.finishedRunIds;

  return {
    left,
    right,
    comparator,
    evalType,
    focused,
    finishedRunIds,
    focusItem,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, AnyAction>, props: PairCardOwnProps) {
  return {
    solvePair: (pair: PairObject, runId: number) => {
      dispatch(solvePairsThunk([pair], runId));
    },
    toggleFocusPair: (id: string, on: boolean) => {
      dispatch(toggleFocusPair(id, on));
    },
    setVegaLiteEditorCode: (code: string) => {
      dispatch(setVegaLiteCode(code));
    },
    toggleFocusPairItem: (pairId: string, position: string, on: boolean) => {
      dispatch(toggleFocusPairItem(pairId, position, on));
    },
    toggleShowEditor: (show: boolean) => {
      dispatch(toggleShowEditor(show));
    },
    setEditorType: (type: EditorType) => {
      dispatch(setEditorType(type));
    },
  };
}

export default connect<PairCardStoreProps, PairCardDispatchProps, PairCardOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PairCard);
