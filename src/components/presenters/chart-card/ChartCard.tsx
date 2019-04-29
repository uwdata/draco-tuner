import classnames from 'classnames';
import _ from 'lodash';
import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';
import { ChartObject } from '../../../model/chart';
import { Splinter } from '../pair-card/index';
import VegaLiteChart from '../vega-lite-chart';
import './chart-card.css';

export interface ChartCardStoreProps {
  vlSpec: TopLevelUnitSpec;
  cost?: number;
  finishedRunIds: Set<number>;
  focused: boolean;
}
export interface ChartCardDispatchProps {
  solveChart: (chart: ChartObject, runId: number) => void;
  toggleFocusChart: (id: string, on: boolean) => void;
}
export interface ChartCardOwnProps {
  id: string;
  expanded: boolean;
  toggleExpandChart: (id: string, on: boolean) => void;
}
export interface ChartCardProps extends ChartCardStoreProps, ChartCardDispatchProps, ChartCardOwnProps {}
export interface ChartCardState {
  visible: boolean;
  runId?: number;
}

export default class ChartCard extends React.PureComponent<ChartCardProps, ChartCardState> {
  private cardRef: React.RefObject<HTMLDivElement>;

  constructor(props: ChartCardProps) {
    super(props);

    this.state = {
      visible: false,
    };

    this.cardRef = React.createRef();
  }

  render() {
    const splinterColor =
      this.props.cost === Infinity ? Splinter.RED : _.isUndefined(this.props.cost) ? Splinter.WHITE : Splinter.GREEN;

    let borderColor;

    if (this.props.focused) {
      borderColor = Splinter.BLUE;
    } else {
      borderColor =
        this.props.cost === Infinity ? Splinter.RED : _.isUndefined(this.props.cost) ? Splinter.GREY : Splinter.GREEN;
    }

    const styleName = classnames({
      'chart-card': true,
      expanded: this.props.expanded || this.props.focused,
    });

    return (
      <div styleName={styleName} style={{ borderColor }} ref={this.cardRef}>
        <div
          styleName="splinter"
          style={{ backgroundColor: splinterColor }}
          onClick={() => {
            this.props.toggleExpandChart(this.props.id, !this.props.expanded);
            this.props.toggleFocusChart(this.props.id, !this.props.focused);
          }}
        />
        <VisibilitySensor
          partialVisibility={true}
          offset={{ top: -200, bottom: -200 }}
          onChange={isVisible => {
            if (!this.state.visible && isVisible) {
              this.setState({ visible: true });
            }
          }}
        >
          <div styleName="chart-container">
            {(this.state.visible || this.props.focused) && this.props.expanded ? (
              <VegaLiteChart spec={this.props.vlSpec} />
            ) : (
              <div styleName="loading-container">
                <div styleName="loading" />
              </div>
            )}
          </div>
        </VisibilitySensor>
        <div styleName="info-container">
          <div styleName="cost-container">{this.props.cost}</div>
          <div styleName="button-container">
            <button
              styleName={classnames({
                reloading: !_.isUndefined(this.state.runId) && !this.props.finishedRunIds.has(this.state.runId),
              })}
              onClick={() => {
                const runId = (window as any).runId;
                (window as any).runId += 1;
                this.setState({
                  runId,
                });

                const chart: ChartObject = {
                  vlSpec: this.props.vlSpec,
                  id: this.props.id,
                };
                this.props.solveChart(chart, runId);
              }}
            >
              <span className="material-icons">refresh</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
