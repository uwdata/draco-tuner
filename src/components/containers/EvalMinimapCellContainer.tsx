import _ from 'lodash';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { toggleFocusPair } from '../../actions/pair-collection-actions';
import { Pair } from '../../model/pair';
import { RootState } from '../../reducers';
import EvalMinimapCell, {
  EvalMinimapCellDispatchProps,
  EvalMinimapCellOwnProps,
  EvalMinimapCellStoreProps,
} from '../presenters/eval-minimap-cell';

function mapStateToProps(state: RootState, props: EvalMinimapCellOwnProps): EvalMinimapCellStoreProps {
  const pair = state.pairCollection.pairs[props.pairId];
  const evalType = Pair.getEval(pair, state.draco.constraintMap);
  const focused = state.pairCollection.focusPair === props.pairId;
  let important = false;
  const pairEvalDeltaMap = state.pairCollection.pairEvalDeltaMap;
  if (!_.isUndefined(pairEvalDeltaMap)) {
    if (pairEvalDeltaMap.hasOwnProperty(props.pairId)) {
      important = true;
    }
  }
  return {
    evalType,
    focused,
    important,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  props: EvalMinimapCellOwnProps
): EvalMinimapCellDispatchProps {
  return {
    toggleFocusPair: (pairId: string, on: boolean) => dispatch(toggleFocusPair(pairId, on)),
  };
}

export default connect<EvalMinimapCellStoreProps, EvalMinimapCellDispatchProps, EvalMinimapCellOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(EvalMinimapCell);
