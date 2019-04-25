import classnames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { ChartCardContainer } from '../../containers/index';
import './chart-collection.css';

export interface ChartCollectionStoreProps {
  chartIds: string[];
  finishedRunIds: Set<number>;
}
export interface ChartCollectionDispatchProps {
  reloadCharts: (runId: number) => void;
}
export interface ChartCollectionOwnProps {}
export interface ChartCollectionProps
  extends ChartCollectionStoreProps,
    ChartCollectionDispatchProps,
    ChartCollectionOwnProps {}
export interface ChartCollectionState {
  runId?: number;
  expandedCharts: Set<string>;
}

export default class ChartCollection extends React.PureComponent<ChartCollectionProps, ChartCollectionState> {
  constructor(props: ChartCollectionProps) {
    super(props);
    this.state = {
      expandedCharts: new Set(),
    };

    this.toggleExpandChart = this.toggleExpandChart.bind(this);
  }

  render() {
    const charts = this.props.chartIds.map(id => {
      return (
        <ChartCardContainer
          expanded={this.state.expandedCharts.has(id)}
          key={id}
          id={id}
          toggleExpandChart={this.toggleExpandChart}
        />
      );
    });

    const reloadButtonStyle = classnames({
      reloading: !_.isUndefined(this.state.runId) && !this.props.finishedRunIds.has(this.state.runId),
    });

    return (
      <div styleName="chart-collection">
        <div styleName="controls">
          <div styleName="button-container">
            <button
              styleName={reloadButtonStyle}
              onClick={() => {
                const runId = (window as any).runId;
                (window as any).runId += 1;

                this.setState({
                  runId,
                });
                this.props.reloadCharts(runId);
              }}
            >
              <span className="material-icons">refresh</span>
            </button>
          </div>
          <div styleName="button-container">
            <button styleName="icon-button">
              <span className="material-icons">add</span>
            </button>
          </div>
          <div styleName="button-container">
            <button
              onClick={() => {
                const expandedCharts = _.clone(this.state.expandedCharts);
                this.props.chartIds.forEach(c => expandedCharts.add(c));
                this.setState({ expandedCharts });
              }}
              className="material-icons"
              styleName="icon-button"
            >
              unfold_more
            </button>
            <button
              className="material-icons"
              styleName="icon-button"
              onClick={() => {
                this.setState({ expandedCharts: new Set() });
              }}
            >
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

  toggleExpandChart(id: string, on: boolean) {
    const expandedCharts = _.clone(this.state.expandedCharts);
    if (on) {
      expandedCharts.add(id);
    } else {
      expandedCharts.delete(id);
    }
    this.setState({ expandedCharts });
  }
}
