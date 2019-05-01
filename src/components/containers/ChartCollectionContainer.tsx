import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { addEmptyChart, reloadChartsThunk, setChartFilters } from '../../actions/chart-collection-actions';
import { CollectionItemFilter, CollectionItemFilterObject } from '../../model/index';
import { RootState } from '../../reducers';
import ChartCollection, {
  ChartCollectionDispatchProps,
  ChartCollectionOwnProps,
  ChartCollectionStoreProps,
} from '../presenters/chart-collection';

function mapStateToProps(state: RootState, ownProps: ChartCollectionOwnProps): ChartCollectionStoreProps {
  const unfilteredChartIds = Object.keys(state.chartCollection.charts).sort(id => +id);

  const chartIds = state.chartCollection.filters.reduce((chartIds: string[], filterObj) => {
    const filterFn = CollectionItemFilter.fromObj(filterObj);
    return chartIds.filter(chartId => {
      const chart = state.chartCollection.charts[chartId];
      return filterFn(chart, { ...filterObj.opt, constraintMap: state.draco.constraintMap });
    });
  }, unfilteredChartIds);

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
    setPairFilters: (filters: CollectionItemFilterObject[]) => dispatch(setChartFilters(filters)),
  };
}

export default connect<ChartCollectionStoreProps, ChartCollectionDispatchProps, ChartCollectionOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ChartCollection);
