import React from 'react';
import './chart-card.css';

export interface ChartCardStoreProps {}
export interface ChartCardDispatchProps {}
export interface ChartCardOwnProps {}
export interface ChartCardProps extends ChartCardStoreProps, ChartCardDispatchProps, ChartCardOwnProps {}
export interface ChartCardState {}

export default class ChartCard extends React.PureComponent<ChartCardProps, ChartCardState> {
  render() {
    return <div styleName="chart-card" />;
  }
}
