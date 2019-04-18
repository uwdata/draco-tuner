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

    return (
      <div styleName="chart-collection">
        <div styleName="controls">
          <div styleName="button-container">
            <button>
              <span className="material-icons">refresh</span>
            </button>
          </div>
          <div styleName="button-container">
            <button styleName="icon-button">
              <span className="material-icons">add</span>
            </button>
          </div>
          <div styleName="button-container">
            <button className="material-icons" styleName="icon-button">
              unfold_more
            </button>
            <button className="material-icons" styleName="icon-button">
              unfold_less
            </button>
          </div>
          <div styleName="button-container">
            <input placeholder="filter" />
          </div>
        </div>
        <div styleName="view">
          <div styleName="minimap" />
          <div styleName="charts">{charts}</div>
        </div>
      </div>
    );
  }
}
