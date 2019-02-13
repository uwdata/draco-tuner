import classnames from 'classnames';
import { vl2asp } from 'draco-core';
import { Violation } from 'draco-vis';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { none, Option, some } from 'ts-option';
import { getType } from 'typesafe-actions';
import { collectionActions, RootAction } from '../../../actions';
import { runDraco } from '../../../actions/draco-actions';
import { RootState } from '../../../reducers';
import { Pair, PairItem } from '../../../reducers/collection';
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
  vectorsOpt: Option<Vector[]>;
  diffVectorOpt: Option<number[]>;
  colorScale: any;
  expandFunction: (i: number) => void;
}

interface State {
  showInfo: boolean;
  unitWidth: number;
}

export type Vector = VectorUnit[];

export interface VectorUnit {
  name: string;
  count: number;
  weight: number;
}

class PairCard extends React.Component<Props, State> {
  private component: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      showInfo: false,
      unitWidth: 0,
    };

    this.component = React.createRef();

    this.update = this.update.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.swap = this.swap.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.diffVectorOpt !== this.props.diffVectorOpt) {
      if (this.props.diffVectorOpt.isDefined) {
        this.setState({ unitWidth: (this.component.current.offsetWidth - 20) / (this.props.diffVectorOpt.get.length) })
      } else {
        this.setState({ unitWidth: 0 })
      }
    }
  }

  render() {
    const costs = [this.props.pair.left, this.props.pair.right].map((pairItem) => {
      return pairItem.solutionOpt.isDefined ? some(pairItem.solutionOpt.get.models[0].costs[0]) : none;
    });

    const canComp = costs[0].isDefined && costs[1].isDefined;

    const comp = this.props.pair.comp === '<' ?
      (a: number, b: number) => a < b : (a: number, b: number) => a === b;

    const className = classnames({
      pair: true,
      collapsed: !this.props.open,
      showInfo: this.state.showInfo && this.props.open,
      pass: canComp && comp(costs[0].get, costs[1].get),
      fail: canComp && !comp(costs[0].get, costs[1].get),
    });

    return (
      <div styleName={className} ref={this.component} >
        <Splinter
          colorScale={this.props.colorScale}
          diffVectorOpt={this.props.diffVectorOpt}
          unitWidth={this.state.unitWidth}
          onClick={() => this.props.expandFunction(this.props.pair.id)}
        />
        <div styleName="split">
          <div styleName="left">
            <div styleName="chart">
              <VegaLiteChart
                vlSpec={this.props.pair.left.vlSpec}
                renderer="canvas"
                actions={false}/>
            </div>
            { costs[0].isDefined ? <div styleName="cost">{costs[0].get}</div> : null }
          </div>
          <div styleName="comp">
            {this.props.pair.comp}
            <button styleName="swap" onClick={this.swap}>swap</button>
          </div>
          <div styleName="right">
            <div styleName="chart">
              <VegaLiteChart
                vlSpec={this.props.pair.right.vlSpec}
                renderer="canvas"
                actions={false}/>
            </div>
            { costs[1].isDefined ? <div styleName="cost">{costs[1].get}</div> : null }
          </div>
        </div>
        <div>
          <button styleName="expand" onClick={this.showInfo}>
            {this.state.showInfo ? '-' : '+'}
          </button>
          <div styleName="info">
            <Diff
              left={this.props.pair.left.solutionOpt.map(_ => _.models[0].violations)}
              right={this.props.pair.right.solutionOpt.map(_ => _.models[0].violations)}
              getKey={(d: Violation) => d.witness}
              colorScale={this.props.colorScale}/>
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
    this.setState({ showInfo: !this.state.showInfo });
  }

  swap() {
    const newLeft = {
      ...this.props.pair.right,
      id: {
        ...this.props.pair.right.id
      },
    };
    const newRight = {
      ...this.props.pair.left,
      id: {
        ...this.props.pair.left.id
      },
    };

    newLeft.id.position = 'left';
    newRight.id.position = 'right';

    console.log('left');
    console.log(newLeft);
    console.log('right');
    console.log(newRight);


    console.log('swapping left');
    console.log(newLeft);
    this.props.updatePairItem(newLeft);

    console.log('swapping right');
    console.log(newRight);
    this.props.updatePairItem(newRight);
  }
}

interface SplinterProps {
  diffVectorOpt: Option<number[]>;
  colorScale: any;
  unitWidth: number;
  onClick: any;
}

const Splinter = (props: SplinterProps) => {
  if (props.diffVectorOpt.isEmpty) {
    return <div styleName="splinter red" onClick={props.onClick}/>
  }

  return (
    <div styleName="splinter" onClick={props.onClick}>
      {
        props.diffVectorOpt.get.map((n: number, i: number) => {
          const color = n === 0 ? '#fff' : props.colorScale(2 * -n);
          return (
            <div key={i} styleName="vector-unit" style={{ 'backgroundColor': color, 'width': props.unitWidth }} />
          )
        })
      }
    </div>
  );
}

interface DiffProps {
  left: Option<any[]>;
  right: Option<any[]>;
  getKey: (d: any) => any;
  colorScale: any;
}

const Diff = (props: DiffProps) => {
  if (props.left.isEmpty || props.right.isEmpty) {
    return null;
  }

  const [leftDict, rightDict] =
    [props.left.get, props.right.get]
      .map((items) => {
        return (
          items
            .reduce((dict, curr) => {
              dict[props.getKey(curr)] = curr;
              return dict;
            }, {})
        );
      });
      
  const [leftKeys, rightKeys] =
    [props.left.get, props.right.get]
      .map((items) => {
        return items.map(item => props.getKey(item));
      })
      .sort();

  const merged = merge(leftKeys, rightKeys);
  
  const same = new Set(leftKeys.filter((key) => {
    return rightDict.hasOwnProperty(key);
  }));

  const leftSorted = merged.map((key) => {
    if (leftDict.hasOwnProperty(key)) {
      return some(leftDict[key]);
    }
    return none;
  });

  const rightSorted = merged.map((key) => {
    if (rightDict.hasOwnProperty(key)) {
      return some(rightDict[key]);
    }
    return none;
  });

  return (
    <table styleName="diff-table">
      <tr key="header">
        <th>cost</th>
        <th>constraint</th>
        <th>constraint</th>
        <th>cost</th>
      </tr>
      {
        merged.map((_: any, i: number) => {
          const leftCostOpt = leftSorted[i].map((_: Violation) => _.weight);
          const leftWitnessOpt = leftSorted[i].map(_ => props.getKey(_));
          const rightWitnessOpt = rightSorted[i].map(_ => props.getKey(_));
          const rightCostOpt = rightSorted[i].map((_: Violation) => _.weight);

          let leftColor = leftCostOpt.match({
            some: n => n === 0 ? '#fff' : props.colorScale(-n),
            none: () => '#fff'
          });
          let rightColor = rightCostOpt.match({
            some: n => n === 0 ? '#fff' : props.colorScale(n),
            none: () => '#fff'
          });

          leftColor = leftCostOpt.isEmpty ? rightColor : leftColor;
          rightColor = rightCostOpt.isEmpty ? leftColor : rightColor;


          const leftStyle = { backgroundColor: leftColor };
          const rightStyle = { backgroundColor: rightColor };

          return (
            <tr key={i}>
              <td styleName="cost"
                style={leftStyle}>
                {leftCostOpt.orNull}
              </td>
              <td style={leftStyle}> {leftWitnessOpt.orNull}</td>
              <td style={rightStyle}>{rightWitnessOpt.orNull}</td>
              <td styleName="cost" style={rightStyle}>
                {rightCostOpt.orNull}
              </td>
            </tr>
          );
        })
      }
    </table>
  );
}

function merge(a: string[], b: string[]) {
  const seen = new Set();
  const merged = [];
  let l = 0, r = 0;
  while (l < a.length || r < b.length) {
    if (l == a.length) { merged.push(b[r++]); continue; }
    if (r == b.length) { merged.push(a[l++]); continue; }

    if (a[l] <= b[r]) {
      if (seen.has(a[l])) { l++; continue; }
      seen.add(a[l]);
      merged.push(a[l]);
      l++;
    } else {
      if (seen.has(a[r])) { r++; continue }
      seen.add(a[r]);
      merged.push(b[l]);
      r++;
    }
  }

  return merged;
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
