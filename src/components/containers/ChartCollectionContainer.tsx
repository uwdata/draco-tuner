import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import ChartCollection, {
  ChartCollectionDispatchProps,
  ChartCollectionOwnProps,
  ChartCollectionStoreProps,
} from '../presenters/chart-collection';

function mapStateToProps(state: RootState, ownProps: ChartCollectionOwnProps): ChartCollectionStoreProps {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: ChartCollectionOwnProps): ChartCollectionDispatchProps {
  return {};
}

export default connect<ChartCollectionStoreProps, ChartCollectionDispatchProps, ChartCollectionOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ChartCollection);
