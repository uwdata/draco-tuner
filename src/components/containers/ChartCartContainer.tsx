import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Spec } from '../../model/spec';
import { RootState } from '../../reducers';
import ChartCard, { ChartCardDispatchProps, ChartCardOwnProps, ChartCardStoreProps } from '../presenters/chart-card';

function mapStateToProps(state: RootState, ownProps: ChartCardOwnProps): ChartCardStoreProps {
  const chart = state.chartCollection.charts[ownProps.id];
  const vlSpec = chart.vlSpec;
  const cost = Spec.getCost(chart, state.draco.constraintMap);
  return {
    vlSpec,
    cost,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: ChartCardOwnProps): ChartCardDispatchProps {
  return {};
}

export default connect<ChartCardStoreProps, ChartCardDispatchProps, ChartCardOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ChartCard);
