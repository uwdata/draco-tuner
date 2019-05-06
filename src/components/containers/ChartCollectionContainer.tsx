import _ from 'lodash';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  addEmptyChart,
  reloadChartsThunk,
  setChartFilters,
  setChartSorts,
} from '../../actions/chart-collection-actions';
import {
  CollectionItemFilter,
  CollectionItemFilterObject,
  CollectionItemSort,
  CollectionItemSortObject,
} from '../../model/index';
import { RootState } from '../../reducers';
import ChartCollection, {
  ChartCollectionDispatchProps,
  ChartCollectionOwnProps,
  ChartCollectionStoreProps,
} from '../presenters/chart-collection';

function mapStateToProps(state: RootState, ownProps: ChartCollectionOwnProps): ChartCollectionStoreProps {
  const unfilteredChartIds = Object.keys(state.chartCollection.charts).sort(id => +id);

  let chartIds = state.chartCollection.filters.reduce((chartIds: string[], filterObj) => {
    const filterFn = CollectionItemFilter.fromObj(filterObj);
    return chartIds.filter(chartId => {
      const chart = state.chartCollection.charts[chartId];
      return filterFn(chart, { ...filterObj.opt, constraintMap: state.draco.constraintMap });
    });
  }, unfilteredChartIds);

  const sortObjects = state.chartCollection.sorts.concat([{ type: CollectionItemSort.BY_ID_ASC }]);
  const sortBy = sortObjects.map(sortObj => {
    return (chartId: string) => {
      const chart = state.chartCollection.charts[chartId];
      const sortFn = CollectionItemSort.fromObj(sortObj);
      return sortFn(chart, { constraintMap: state.draco.constraintMap });
    };
  });
  chartIds = _.sortBy(chartIds, sortBy);

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
    setChartFilters: (filters: CollectionItemFilterObject[]) => dispatch(setChartFilters(filters)),
    setChartSorts: (sorts: CollectionItemSortObject[]) => dispatch(setChartSorts(sorts)),
  };
}

export default connect<ChartCollectionStoreProps, ChartCollectionDispatchProps, ChartCollectionOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ChartCollection);
