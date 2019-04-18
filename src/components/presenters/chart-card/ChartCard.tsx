import React from 'react';
import ReactDOM from 'react-dom';
import VisibilitySensor from 'react-visibility-sensor';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';
import VegaLiteChart from '../vega-lite-chart';
import './chart-card.css';

const a = ReactDOM.findDOMNode;

export interface ChartCardStoreProps {
  vlSpec: TopLevelUnitSpec;
}
export interface ChartCardDispatchProps {}
export interface ChartCardOwnProps {
  id: string;
}
export interface ChartCardProps extends ChartCardStoreProps, ChartCardDispatchProps, ChartCardOwnProps {}
export interface ChartCardState {
  visible: boolean;
}

export default class ChartCard extends React.PureComponent<ChartCardProps, ChartCardState> {
  constructor(props: ChartCardProps) {
    super(props);

    this.state = {
      visible: false,
    };
  }
  render() {
    return (
      <div styleName="chart-card">
        <VisibilitySensor
          partialVisibility={true}
          offset={{ top: -200, bottom: -200 }}
          onChange={isVisible => {
            console.log(isVisible);
            this.setState({ visible: isVisible });
          }}
        >
          {this.state.visible ? (
            <VegaLiteChart spec={this.props.vlSpec} />
          ) : (
            <div styleName="loading-container">
              <div styleName="loading" />
            </div>
          )}
        </VisibilitySensor>
      </div>
    );
  }
}
