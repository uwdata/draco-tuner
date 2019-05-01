import classnames from 'classnames';
import _ from 'lodash';
import * as React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';
import { CollectionItem, CollectionItemEval, CollectionItemEvalType, PairObject } from '../../../model';
import { Editor, EditorType } from '../../../reducers/text-editor-reducer';
import VegaLiteChart from '../vega-lite-chart';
import './pair-card.css';

export interface PairCardStoreProps {
  left?: PairCardItem;
  right?: PairCardItem;
  comparator?: string;
  diffVector?: number[];
  evalType?: CollectionItemEvalType;
  focused?: boolean;
  finishedRunIds?: Set<number>;
  focusItem?: string;
}

export interface PairCardDispatchProps {
  solvePair: (pair: PairObject, runId: number) => void;
  toggleFocusPair: (id: string, on: boolean) => void;
  setVegaLiteEditorCode: (code: string) => void;
  toggleFocusPairItem: (pairId: string, position: string, on: boolean) => void;
  toggleShowEditor: (show: boolean) => void;
  setEditorType: (type: EditorType) => void;
}

export interface PairCardOwnProps {
  open: boolean;
  id?: string;
  selectPair?: (id: string, on: boolean) => void;
}

export interface PairCardProps extends PairCardStoreProps, PairCardDispatchProps, PairCardOwnProps {}

export interface PairCardState {
  runId?: number;
  visible: boolean;
}

export interface PairCardItem {
  vlSpec: TopLevelUnitSpec;
  cost?: number;
}

class PairCard extends React.PureComponent<PairCardProps, PairCardState> {
  constructor(props: PairCardProps) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  static getDerivedStateFromProps(props: PairCardProps, state: PairCardState) {
    if (!props.open && state.visible) {
      return {
        visible: false,
      };
    }

    return state;
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
        <VisibilitySensor
          partialVisibility={true}
          offset={{ top: -600, bottom: -600 }}
          onChange={isVisible => {
            if (!this.state.visible && isVisible) {
              this.setState({ visible: true });
            }
          }}
        >
          <div styleName="info">
            <div styleName="charts">
              <div styleName="item">
                <div
                  styleName={classnames({
                    'chart-container': true,
                    focused: this.props.focused && this.props.focusItem === 'left',
                  })}
                  onClick={() => {
                    if (this.props.focused && this.props.focusItem === 'left') {
                      this.props.toggleFocusPairItem(this.props.id, 'left', false);
                      this.props.toggleShowEditor(false);
                    } else {
                      this.props.toggleFocusPairItem(this.props.id, 'left', true);
                      this.props.setVegaLiteEditorCode(JSON.stringify(this.props.left.vlSpec, null, 2));
                      this.props.setEditorType(Editor.VEGA_LITE);
                      this.props.toggleShowEditor(true);
                    }
                  }}
                >
                  {this.state.visible || this.props.focused ? (
                    <VegaLiteChart spec={this.props.left.vlSpec} />
                  ) : (
                    <div styleName="loading-container">
                      <div styleName="loading" />
                    </div>
                  )}
                </div>
                <div style={{ paddingTop: '16px' }}>{this.props.left.cost}</div>
              </div>
              <div styleName="comparator">{comp}</div>
              <div styleName="item">
                <div
                  styleName={classnames({
                    'chart-container': true,
                    focused: this.props.focused && this.props.focusItem === 'right',
                  })}
                  onClick={() => {
                    if (this.props.focused && this.props.focusItem === 'right') {
                      this.props.toggleFocusPairItem(this.props.id, 'right', false);
                      this.props.toggleShowEditor(false);
                    } else {
                      this.props.toggleFocusPairItem(this.props.id, 'right', true);
                      this.props.setVegaLiteEditorCode(JSON.stringify(this.props.right.vlSpec, null, 2));
                      this.props.setEditorType(Editor.VEGA_LITE);
                      this.props.toggleShowEditor(true);
                    }
                  }}
                >
                  {this.state.visible ? (
                    <VegaLiteChart spec={this.props.right.vlSpec} />
                  ) : (
                    <div styleName="loading-container">
                      <div styleName="loading" />
                    </div>
                  )}
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
                      type: CollectionItem.PAIR,
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
        </VisibilitySensor>
      );
    }

    return (
      <div
        styleName={classnames(style)}
        style={{
          borderColor: this.props.focused
            ? Splinter.BLUE
            : _.isUndefined(this.props.evalType) || this.props.evalType === CollectionItemEval.UNSAT
            ? Splinter.GREY
            : this.props.evalType === CollectionItemEval.PASS
            ? Splinter.GREEN
            : Splinter.RED,
        }}
      >
        <Splinter
          onClick={() => {
            this.props.selectPair(this.props.id, !(this.props.open || this.props.focused));
            this.props.toggleFocusPair(this.props.id, !(this.props.open || this.props.focused));
            if (!!this.props.focused) {
              this.props.toggleFocusPairItem(null, null, false);
            }
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
  evalType?: CollectionItemEval;
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
        case CollectionItemEval.PASS:
          splinterColor = Splinter.GREEN;
          break;
        case CollectionItemEval.FAIL:
          splinterColor = Splinter.RED;
          break;
        case CollectionItemEval.UNSAT:
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
