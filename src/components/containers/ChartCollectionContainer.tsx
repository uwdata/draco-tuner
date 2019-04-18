import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import ChartCollection, {
  ChartCollectionDispatchProps,
  ChartCollectionOwnProps,
  ChartCollectionStoreProps,
} from '../presenters/chart-collection';

function mapStateToProps(state: RootState, ownProps: ChartCollectionOwnProps): ChartCollectionStoreProps {
  const chartIds = Object.keys(state.chartCollection.charts).sort(id => +id);
  return {
    chartIds,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: ChartCollectionOwnProps): ChartCollectionDispatchProps {
  return {};
}

export default connect<ChartCollectionStoreProps, ChartCollectionDispatchProps, ChartCollectionOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ChartCollection);
