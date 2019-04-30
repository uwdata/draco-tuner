import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleShowEditor } from '../../actions/app-actions';
import { toggleFocusChart } from '../../actions/chart-collection-actions';
import { solveChartsBegin } from '../../actions/draco-worker-actions';
import { setEditorType, setVegaLiteCode } from '../../actions/text-editor-actions';
import { ChartObject } from '../../model/chart';
import { Spec } from '../../model/spec';
import { RootState } from '../../reducers';
import { ChartDictionary } from '../../reducers/chart-collection-reducer';
import { EditorType } from '../../reducers/text-editor-reducer';
import ChartCard, { ChartCardDispatchProps, ChartCardOwnProps, ChartCardStoreProps } from '../presenters/chart-card';

function mapStateToProps(state: RootState, ownProps: ChartCardOwnProps): ChartCardStoreProps {
  const chart = state.chartCollection.charts[ownProps.id];
  const vlSpec = chart.vlSpec;
  const cost = Spec.getCost(chart, state.draco.constraintMap);
  const finishedRunIds = state.draco.finishedRunIds;
  const focused = state.chartCollection.focusChart === ownProps.id;
  return {
    vlSpec,
    cost,
    finishedRunIds,
    focused,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: ChartCardOwnProps): ChartCardDispatchProps {
  return {
    solveChart: (chart: ChartObject, runId: number) => {
      const chartDict: ChartDictionary = {};
      chartDict[chart.id] = chart;
      dispatch(solveChartsBegin(chartDict, runId));
    },
    toggleFocusChart: (id: string, on: boolean) => {
      dispatch(toggleFocusChart(id, on));
    },
    setVegaLiteEditorCode: (code: string) => {
      dispatch(setVegaLiteCode(code));
    },
    setEditorType: (type: EditorType) => {
      dispatch(setEditorType(type));
    },
    toggleShowEditor: (show: boolean) => {
      dispatch(toggleShowEditor(show));
    },
  };
}

export default connect<ChartCardStoreProps, ChartCardDispatchProps, ChartCardOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ChartCard);
