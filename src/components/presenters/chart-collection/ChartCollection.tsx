import classnames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { CollectionItemFilter, CollectionItemFilterObject } from '../../../model/index';
import { ChartCardContainer, ChartEvalMinimapContainer } from '../../containers/index';
import './chart-collection.css';

export interface ChartCollectionStoreProps {
  chartIds: string[];
  finishedRunIds: Set<number>;
}
export interface ChartCollectionDispatchProps {
  reloadCharts: (runId: number) => void;
  addEmptyChart: () => void;
  setPairFilters: (filters: CollectionItemFilterObject[]) => void;
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
  private prevFilters: CollectionItemFilterObject[];

  constructor(props: ChartCollectionProps) {
    super(props);
    this.state = {
      expandedCharts: new Set(),
    };

    this.toggleExpandChart = this.toggleExpandChart.bind(this);

    this.prevFilters = [];
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
            <button styleName="icon-button" onClick={() => this.props.addEmptyChart()}>
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
            <input
              placeholder="filter"
              onChange={event => {
                const val = event.target.value;
                const filters = CollectionItemFilter.getObjectsFromString(val);

                if (!_.isEqual(this.prevFilters, filters)) {
                  this.prevFilters = filters;
                  this.props.setPairFilters(filters);
                }
              }}
            />
          </div>
        </div>
        <div styleName="view">
          <div styleName="minimap">
            <ChartEvalMinimapContainer ids={this.props.chartIds} />
          </div>
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
