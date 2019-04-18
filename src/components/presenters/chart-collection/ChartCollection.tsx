import React from 'react';
import { ChartCardContainer } from '../../containers/index';
import './chart-collection.css';

export interface ChartCollectionStoreProps {
  chartIds: string[];
}
export interface ChartCollectionDispatchProps {}
export interface ChartCollectionOwnProps {}
export interface ChartCollectionProps
  extends ChartCollectionStoreProps,
    ChartCollectionDispatchProps,
    ChartCollectionOwnProps {}
export interface ChartCollectionState {}

export default class ChartCollection extends React.PureComponent<ChartCollectionProps, ChartCollectionState> {
  render() {
    const charts = this.props.chartIds.map(id => {
      return <ChartCardContainer key={id} id={id} />;
    });

    return <div styleName="chart-collection">{charts}</div>;
  }
}
