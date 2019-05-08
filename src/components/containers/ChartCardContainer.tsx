import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { toggleShowEditor } from '../../actions/app-actions';
import { solveChartsThunk, toggleFocusChart, updateCharts } from '../../actions/chart-collection-actions';
import { setEditorType, setVegaLiteCode } from '../../actions/text-editor-actions';
import { Chart, ChartDictionary, ChartObject } from '../../model/chart';
import { DracoSolution, Spec } from '../../model/spec';
import { RootState } from '../../reducers';
import { EditorType } from '../../reducers/text-editor-reducer';
import ChartCard, { ChartCardDispatchProps, ChartCardOwnProps, ChartCardStoreProps } from '../presenters/chart-card';

function mapStateToProps(state: RootState, ownProps: ChartCardOwnProps): ChartCardStoreProps {
  const chart = state.chartCollection.charts[ownProps.id];
  const vlSpec = chart.vlSpec;
  const cost = Spec.getCost(chart, state.draco.constraintMap);
  const finishedRunIds = state.draco.finishedRunIds;
  const focused = state.chartCollection.focusChart === ownProps.id;
  const comparator = chart.comparator;
  const itemEval = Chart.getEval(chart, state.draco.constraintMap);
  let facts;
  if (DracoSolution.isDefined(chart.sol)) {
    facts = chart.sol.facts;
  }

  return {
    vlSpec,
    cost,
    finishedRunIds,
    focused,
    comparator,
    itemEval,
    facts,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  ownProps: ChartCardOwnProps
): ChartCardDispatchProps {
  return {
    solveChart: (chart: ChartObject, runId: number) => {
      const chartDict: ChartDictionary = {};
      chartDict[chart.id] = chart;
      dispatch(solveChartsThunk(chartDict, runId));
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
    updateChart: (chart: ChartObject) => {
      dispatch(updateCharts({ [chart.id]: chart }));
    },
  };
}

export default connect<ChartCardStoreProps, ChartCardDispatchProps, ChartCardOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ChartCard);
