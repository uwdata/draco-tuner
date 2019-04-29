import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { toggleFocusChart } from '../../actions/chart-collection-actions';
import { Chart } from '../../model/chart';
import { RootState } from '../../reducers';
import EvalMinimapCell, {
  EvalMinimapCellDispatchProps,
  EvalMinimapCellOwnProps,
  EvalMinimapCellStoreProps,
} from '../presenters/eval-minimap-cell';

function mapStateToProps(state: RootState, props: EvalMinimapCellOwnProps): EvalMinimapCellStoreProps {
  const chart = state.chartCollection.charts[props.id];

  const evalType = Chart.getEval(chart, state.draco.constraintMap);
  const focused = state.chartCollection.focusChart === props.id;
  const important = false;
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
    toggleFocusPair: (id: string, on: boolean) => dispatch(toggleFocusChart(id, on)),
  };
}

export default connect<EvalMinimapCellStoreProps, EvalMinimapCellDispatchProps, EvalMinimapCellOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(EvalMinimapCell);
