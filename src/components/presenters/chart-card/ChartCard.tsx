import React from 'react';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';
import VegaLiteChart from '../vega-lite-chart';
import './chart-card.css';

export interface ChartCardStoreProps {
  vlSpec: TopLevelUnitSpec;
}
export interface ChartCardDispatchProps {}
export interface ChartCardOwnProps {
  id: string;
}
export interface ChartCardProps extends ChartCardStoreProps, ChartCardDispatchProps, ChartCardOwnProps {}
export interface ChartCardState {}

export default class ChartCard extends React.PureComponent<ChartCardProps, ChartCardState> {
  render() {
    return (
      <div styleName="chart-card">
        <VegaLiteChart spec={this.props.vlSpec} />
      </div>
    );
  }
}
