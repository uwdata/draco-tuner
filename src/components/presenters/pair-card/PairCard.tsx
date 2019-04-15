import classnames from 'classnames';
import _ from 'lodash';
import * as React from 'react';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';
import { PairEval, PairEvalType, PairObject } from '../../../model';
import VegaLiteChart from '../vega-lite-chart';
import './pair-card.css';

export interface PairCardStoreProps {
  left?: PairCardItem;
  right?: PairCardItem;
  comparator?: string;
  diffVector?: number[];
  evalType?: PairEvalType;
  focused?: boolean;
  finishedRunIds?: Set<number>;
}

export interface PairCardDispatchProps {
  solvePair: (pair: PairObject, runId: number) => void;
  toggleFocusPair: (id: string, on: boolean) => void;
}

export interface PairCardOwnProps {
  open: boolean;
  id?: string;
  selectPair?: (id: string, on: boolean) => void;
}

export interface PairCardProps extends PairCardStoreProps, PairCardDispatchProps, PairCardOwnProps {}

export interface PairCardState {
  runId?: number;
}

export interface PairCardItem {
  vlSpec: TopLevelUnitSpec;
  cost?: number;
}

class PairCard extends React.PureComponent<PairCardProps, PairCardState> {
  constructor(props: PairCardProps) {
    super(props);

    this.state = {};
  }

  render() {
    let populated;
    const style: any = { 'pair-card': true };
    if (this.props.open || this.props.focused) {
      style['open'] = true;
      let comp = this.props.comparator;
      if (comp === '<') {
        if (this.props.left.cost >= this.props.right.cost) {
          comp = '≮';
        }
      } else if (comp === '=') {
        if (this.props.left.cost !== this.props.right.cost) {
          comp = '≠';
        }
      }

      populated = (
        <div styleName="info">
          <div styleName="charts">
            <div styleName="item">
              <div styleName="chart-container">
                <VegaLiteChart spec={this.props.left.vlSpec} />
              </div>
              <div style={{ paddingTop: '16px' }}>{this.props.left.cost}</div>
            </div>
            <div styleName="comparator">{comp}</div>
            <div styleName="item">
              <div styleName="chart-container">
                <VegaLiteChart spec={this.props.right.vlSpec} />
              </div>
              <div style={{ paddingTop: '16px' }}>{this.props.right.cost}</div>
            </div>
          </div>
          <div styleName="controls">
            <div styleName="button-container">
              <button
                styleName={classnames({
                  reloading: !_.isUndefined(this.state.runId) && !this.props.finishedRunIds.has(this.state.runId),
                })}
                onClick={() => {
                  const pair: PairObject = {
                    id: +this.props.id,
                    comparator: this.props.comparator,
                    left: {
                      vlSpec: this.props.left.vlSpec,
                    },
                    right: {
                      vlSpec: this.props.right.vlSpec,
                    },
                  };

                  const runId = (window as any).runId;
                  (window as any).runId += 1;
                  this.setState({
                    runId,
                  });
                  this.props.solvePair(pair, runId);
                }}
              >
                <span className="material-icons">refresh</span>
                {this.props.evalType}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        styleName={classnames(style)}
        style={{
          borderColor: this.props.focused
            ? Splinter.BLUE
            : _.isUndefined(this.props.evalType) || this.props.evalType === PairEval.UNSAT
            ? Splinter.GREY
            : this.props.evalType === PairEval.PASS
            ? Splinter.GREEN
            : Splinter.RED,
        }}
      >
        <Splinter
          onClick={() => {
            this.props.selectPair(this.props.id, !(this.props.open || this.props.focused));
            this.props.toggleFocusPair(this.props.id, !(this.props.open || this.props.focused));
          }}
          evalType={this.props.evalType}
          vector={this.props.diffVector}
        />
        {populated}
      </div>
    );
  }
}

interface SplinterProps {
  onClick: (...args: any[]) => void;
  vector?: number[];
  evalType?: PairEvalType;
}

interface SplinterState {}

export class Splinter extends React.PureComponent<SplinterProps, SplinterState> {
  static BLUE = '#75a8f9';
  static RED = '#f97486';
  static WHITE = '#fff';
  static GREEN = '#aff7b3';
  static ORANGE = '#ffcd51';
  static LIGHTBLUE = '#eaf4ff';
  static GREY = '#d8d8d8';

  render() {
    let diffViz;

    if (this.props.vector) {
      diffViz = this.props.vector.map((val, i) => {
        const color = val === -1 ? Splinter.BLUE : val === 1 ? Splinter.RED : Splinter.WHITE;
        return <div key={i} styleName="cell" style={{ backgroundColor: color }} />;
      });
    }

    let splinterColor = Splinter.WHITE;
    if (typeof this.props.evalType !== 'undefined') {
      switch (this.props.evalType) {
        case PairEval.PASS:
          splinterColor = Splinter.GREEN;
          break;
        case PairEval.FAIL:
          splinterColor = Splinter.RED;
          break;
        case PairEval.UNSAT:
          splinterColor = Splinter.GREY;
          break;
      }
    }
    return (
      <div styleName="splinter" style={{ backgroundColor: splinterColor }} onClick={this.props.onClick}>
        {diffViz}
      </div>
    );
  }
}

export default PairCard;
