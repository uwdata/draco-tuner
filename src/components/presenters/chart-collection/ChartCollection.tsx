import React from 'react';
import './chart-collection.css';

export interface ChartCollectionStoreProps {}
export interface ChartCollectionDispatchProps {}
export interface ChartCollectionOwnProps {}
export interface ChartCollectionProps
  extends ChartCollectionStoreProps,
    ChartCollectionDispatchProps,
    ChartCollectionOwnProps {}
export interface ChartCollectionState {}

export default class ChartCollection extends React.PureComponent<ChartCollectionProps, ChartCollectionState> {
  render() {
    return <div styleName="chart-collection" />;
  }
}
