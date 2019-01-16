import classnames from 'classnames';
import { vl2asp } from 'draco-core';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { none, some } from 'ts-option';
import { getType } from 'typesafe-actions';
import { collectionActions, RootAction } from '../../../actions';
import { runDraco } from '../../../actions/draco-actions';
import { RootState } from '../../../reducers';
import { Pair, PairItem } from '../../../reducers/collection';
import { ViolationTable } from '../../info-pane/InfoPane';
import VegaLiteChart from '../../vega-lite-chart/VegaLiteChart';
import './pair-card.css';

interface StateProps {
}

interface DispatchProps {
  updatePairItem: (pairItem: PairItem) => void;
}

interface Props extends StateProps, DispatchProps {
  pair: Pair;
  open: boolean;
}

interface State {
  showInfo: boolean;
}

class PairCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showInfo: false,
    };

    this.update = this.update.bind(this);
    this.showInfo = this.showInfo.bind(this);
  }

  render() {
    const costs = [this.props.pair.left, this.props.pair.right].map((pairItem) => {
      return pairItem.solution ? pairItem.solution.models[0].costs[0] : undefined;
    });

    const canComp = typeof costs[0] !== 'undefined' && typeof costs[1] !== 'undefined';

    const comp = this.props.pair.comp === '<' ?
      (a: number, b: number) => a < b : (a: number, b: number) => a === b;

    const className = classnames({
      pair: true,
      collapsed: !this.props.open,
      showInfo: this.state.showInfo,
      pass: canComp && comp(costs[0], costs[1]),
      fail: canComp && !comp(costs[0], costs[1]),
    });

    return (
      <div styleName={className}>
        <Splinter leftVector={[]} rightVector={[]} />
        <div styleName="split">
          <div styleName="left">
            <div styleName="chart">
              <VegaLiteChart
                vlSpec={this.props.pair.left.vlSpec}
                renderer="canvas"
                actions={false}/>
            </div>
            { costs[0] ? <div styleName="cost">{costs[0]}</div> : null }
          </div>
          <div styleName="comp">
            {this.props.pair.comp}
          </div>
          <div styleName="right">
            <div styleName="chart">
              <VegaLiteChart
                vlSpec={this.props.pair.right.vlSpec}
                renderer="canvas"
                actions={false}/>
            </div>
            { costs[1] ? <div styleName="cost">{costs[1]}</div> : null }
          </div>
        </div>
        <div>
          <button styleName="expand" onClick={this.showInfo}>
          </button>
          <div styleName={classnames({ info: true, expanded: this.state.showInfo })}>
            <div styleName="left">
              <ViolationTable violations={
                this.props.pair.left.solution ? some(this.props.pair.left.solution.models[0].violations)
                : none} />
              <pre styleName="code">
                {
                  this.props.pair.left.solution ?
                  this.props.pair.left.solution.models[0].facts
                  .filter(c => !c.startsWith('soft')).join('\n') : null
                }
              </pre>
            </div>
            <div styleName="right">
              <ViolationTable violations={
                  this.props.pair.right.solution ?
                  some(this.props.pair.right.solution.models[0].violations)
                  : none} />
              <pre styleName="code">
                {
                  this.props.pair.right.solution ?
                  this.props.pair.right.solution.models[0].facts
                  .filter(c => !c.startsWith('soft')).join('\n') : null
                }
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  update() {
    this.props.updatePairItem(this.props.pair.left);
    this.props.updatePairItem(this.props.pair.right);
  }

  showInfo() {
    this.setState({ showInfo: true });
  }
}

interface SplinterProps {
  leftVector: any[],
  rightVector: any[]
}

const Splinter = (props: SplinterProps) => {
  return (
    <div styleName="splinter">
    </div>
  );
}

const mapStateToProps = (state: RootState): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    updatePairItem: (pairItem: PairItem) => {
      dispatch(
        runDraco(
          vl2asp(pairItem.vlSpec).join('\n'),
          getType(collectionActions.updatePairItem),
          pairItem,
        ),
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PairCard);
