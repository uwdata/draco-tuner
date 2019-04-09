import * as classnames from 'classnames';
import * as React from 'react';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';
import VegaLiteChart from '../vega-lite-chart';
import './pair-card.css';

export interface PairCardStoreProps {
  left?: PairCardItem;
  right?: PairCardItem;
  comparator?: string;
  diffVector?: number[];
  pass?: boolean;
}

export interface PairCardProps extends PairCardStoreProps {
  id?: number;
  open: boolean;
}

export interface PairCardState {}

export interface PairCardItem {
  vlSpec: TopLevelUnitSpec;
  cost?: number;
}

class PairCard extends React.PureComponent<PairCardProps, PairCardState> {
  render() {
    let populated;
    const style = { 'pair-card': true };
    if (this.props.open) {
      style['open'] = true;

      populated = (
        <div styleName="info">
          <div styleName="charts">
            <div styleName="item">
              <VegaLiteChart spec={this.props.left.vlSpec} />
              <div style={{ paddingTop: '16px' }}>{this.props.left.cost}</div>
            </div>
            <div styleName="comparator">{this.props.comparator}</div>
            <div styleName="item">
              <VegaLiteChart spec={this.props.right.vlSpec} />
              <div style={{ paddingTop: '16px' }}>{this.props.right.cost}</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div styleName={classnames(style)}>
        <Splinter pass={this.props.pass} vector={this.props.diffVector} />
        {populated}
      </div>
    );
  }
}

interface SplinterProps {
  vector?: number[];
  pass?: boolean;
}

interface SplinterState {}

class Splinter extends React.PureComponent<SplinterProps, SplinterState> {
  static BLUE = '#75a8f9';
  static RED = '#f97486';
  static WHITE = '#fff';
  static GREEN = '#c9ffcc';

  render() {
    let diffViz;

    if (this.props.vector) {
      diffViz = this.props.vector.map((val, i) => {
        const color = val === -1 ? Splinter.BLUE : val === 1 ? Splinter.RED : Splinter.WHITE;
        return <div key={i} styleName="cell" style={{ backgroundColor: color }} />;
      });
    }

    let splinterColor = Splinter.WHITE;
    if (typeof this.props.pass !== 'undefined') {
      splinterColor = this.props.pass ? Splinter.GREEN : Splinter.RED;
    }
    return (
      <div styleName="splinter" style={{ backgroundColor: splinterColor }}>
        {diffViz}
      </div>
    );
  }
}

export default PairCard;
