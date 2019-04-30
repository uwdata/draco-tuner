import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { addEmptyChart, reloadChartsThunk } from '../../actions/chart-collection-actions';
import { RootState } from '../../reducers';
import ChartCollection, {
  ChartCollectionDispatchProps,
  ChartCollectionOwnProps,
  ChartCollectionStoreProps,
} from '../presenters/chart-collection';

function mapStateToProps(state: RootState, ownProps: ChartCollectionOwnProps): ChartCollectionStoreProps {
  const chartIds = Object.keys(state.chartCollection.charts).sort(id => +id);
  const finishedRunIds = state.draco.finishedRunIds;

  return {
    chartIds,
    finishedRunIds,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  ownProps: ChartCollectionOwnProps
): ChartCollectionDispatchProps {
  return {
    reloadCharts: (runId: number) => dispatch(reloadChartsThunk(runId)),
    addEmptyChart: () => dispatch(addEmptyChart()),
  };
}

export default connect<ChartCollectionStoreProps, ChartCollectionDispatchProps, ChartCollectionOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ChartCollection);
