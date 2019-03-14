import classnames from 'classnames';
import { vl2asp } from 'draco-core';
import { Violation } from 'draco-vis';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { none, Option, some } from 'ts-option';
import { getType } from 'typesafe-actions';
import { TopLevelFacetedUnitSpec } from 'vega-lite/build/src/spec';
import { collectionActions, RootAction } from '../../../actions';
import { deletePair, updatePair } from '../../../actions/collection-actions';
import { runDraco } from '../../../actions/draco-actions';
import { bindPairItem, switchEditor, updateVegaLiteEditorCode, updateVegaLiteSpec } from '../../../actions/editor-actions';
import { addViolationsToMatch, removeViolationsToMatch } from '../../../actions/tuner-actions';
import { RootState } from '../../../reducers';
import { ConstraintSetMap, Pair, PairItem, PairItemId } from '../../../reducers/collection';
import VegaLiteChart from '../../vega-lite-chart/VegaLiteChart';
import './pair-card.css';

interface StateProps {
  constraintSetMapOpt: Option<ConstraintSetMap>;
}

interface DispatchProps {
  updatePairItem: (pairItem: PairItem) => void;
  updatePair: (pair: Pair) => void;
  deletePair: (pairId: number) => void;
  addViolationsToMatch: (violations: Violation[]) => void;
  removeViolationsToMatch: () => void;
  editVegaLiteSpec: (vlSpec: TopLevelFacetedUnitSpec) => void;
  bindPairItem: (pairItemId: PairItemId) => void;
}

interface Props extends StateProps, DispatchProps {
  number: number;
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
    this.delete = this.delete.bind(this);
    this.editLeft = this.editLeft.bind(this);
    this.editRight = this.editRight.bind(this); 
    this.changeComp = this.changeComp.bind(this);
    this.reload = this.reload.bind(this);
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

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // console.log(nextProps);
    // console.log(this.props);

    // if (this.props.pair.id === 118 ) {
    //   console.log(JSON.stringify(this.props));
    //   console.log(JSON.stringify(nextProps));
    //   console.log(this.props === nextProps);
    // }
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) || this.state !== nextState;
    return this.props !== nextProps || this.state !== nextState;
    if (nextProps === this.props) {
      if (nextProps.pair.fingerprint !== this.props.pair.fingerprint) {
        return true;
      }

      if (nextProps.open !== this.props.open) {
        return true;
      }

      if (nextProps.vectorsOpt !== this.props.vectorsOpt) {
        return true;
      }

      if (nextProps.diffVectorOpt !== this.props.diffVectorOpt) {
        return true;
      }

      if (nextProps.constraintSetMapOpt !== this.props.constraintSetMapOpt) {
        return true;
      }

      if (nextProps.colorScale !== this.props.colorScale) {
        return true;
      }
    }

    if (this.state !== nextState) {
      return true;
    }
    
    return false;
  }

  render() {
    console.log('render');
    let leftCost;
    if (this.props.pair.left.solutionOpt.isDefined && this.props.constraintSetMapOpt.isDefined) {
      const hardConstraints = this.props.constraintSetMapOpt.get.hard;
      const softConstraints = this.props.constraintSetMapOpt.get.soft;

      leftCost =
        this.props.pair.left.solutionOpt.get.models[0].violations
          .map(v => {
            if (hardConstraints.hasOwnProperty(v.name)) {
              return hardConstraints[v.name];
            } else if (softConstraints.hasOwnProperty(v.name)) {
              return softConstraints[v.name];
            }
          })
          .reduce((sum, c) => {
            if (typeof c.weight === 'undefined') {
              return sum + 1000000;
            }
            return sum + c.weight;
          }, 0);   
    }

    let rightCost;
    if (this.props.pair.right.solutionOpt.isDefined && this.props.constraintSetMapOpt.isDefined) {
      const hardConstraints = this.props.constraintSetMapOpt.get.hard;
      const softConstraints = this.props.constraintSetMapOpt.get.soft;

      rightCost =
        this.props.pair.right.solutionOpt.get.models[0].violations
          .map(v => {
            if (hardConstraints.hasOwnProperty(v.name)) {
              return hardConstraints[v.name];
            } else if (softConstraints.hasOwnProperty(v.name)) {
              return softConstraints[v.name];
            }
          })
          .reduce((sum, c) => {
            if (typeof c.weight === 'undefined') {
              return sum + 1000000;
            }
            return sum + c.weight;
          }, 0);   
    }

    let canComp = typeof leftCost !== 'undefined' && typeof rightCost !== 'undefined';

    if (canComp) {
      if (leftCost >= 1000000 || rightCost >= 1000000) { canComp = false; }
    }

    const comp = this.props.pair.comp === '<' ?
      (a: number, b: number) => a < b : (a: number, b: number) => a === b;

    const pass = canComp && comp(leftCost, rightCost);
    const invalid = !canComp;
    const invalidPass = !canComp && (typeof leftCost !== 'undefined' && leftCost < 1000000 && this.props.pair.comp === '<');
    const className = classnames({
      pair: true,
      collapsed: !this.props.open,
      showInfo: this.state.showInfo && this.props.open,
      pass: pass,
    });

    return (
      <div styleName={className} ref={this.component} >
        <Splinter
          id={this.props.number}
          invalid={invalid}
          invalidPass={invalidPass}
          pass={pass}
          colorScale={this.props.colorScale}
          diffVectorOpt={this.props.diffVectorOpt}
          unitWidth={this.state.unitWidth}
          onClick={() => {
            if (!this.props.open) {
              this.props.removeViolationsToMatch()
              this.props.addViolationsToMatch(this.props.pair.left.solutionOpt.map(_ => _.models[0].violations).orNull)
              this.props.addViolationsToMatch(this.props.pair.right.solutionOpt.map(_ => _.models[0].violations).orNull)
            } else {
              this.props.removeViolationsToMatch()
            }
            
            this.props.expandFunction(this.props.pair.id);
          }}
        />
        <div styleName="split">
          <div styleName="left">
            <div styleName="chart">
              <VegaLiteChart
                vlSpec={this.props.pair.left.vlSpec}
                renderer="canvas"
                actions={false}/>
            </div>
            { typeof leftCost !== 'undefined' ? <div styleName="cost">{leftCost < 1000000 ? leftCost: 'inf'}</div> : null }
          </div>
          <div styleName="comp">
            <button styleName="button" onClick={this.changeComp}>{this.props.pair.comp}</button>
          </div>
          <div styleName="right">
            <div styleName="chart">
              <VegaLiteChart
                vlSpec={this.props.pair.right.vlSpec}
                renderer="canvas"
                actions={false}/>
            </div>
            { typeof rightCost !== 'undefined' ? <div styleName="cost">{rightCost < 1000000 ? rightCost: 'inf'}</div> : null }
          </div>
        </div>
        <div styleName="options">
          <button styleName="button" onClick={this.reload}>reload</button>
          <button styleName="button" onClick={this.editLeft}>edit left</button>
          <button styleName="button" onClick={this.swap}>swap</button>
          <button styleName="button" onClick={this.editRight}>edit right</button>
          <button styleName="button" onClick={this.delete}>delete</button>
        </div>
        {/* <div>
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
        </div> */}
      </div>
    );
  }

  reload() {
    this.props.updatePairItem(this.props.pair.left);
    this.props.updatePairItem(this.props.pair.right);
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

    const newPair = {
      ...this.props.pair,
      left: newLeft,
      right: newRight,
    };
    this.props.updatePair(newPair);
  }

  delete() {
    this.props.deletePair(this.props.pair.id);
  }

  editLeft() {
    this.props.editVegaLiteSpec(this.props.pair.left.vlSpec);
    this.props.bindPairItem(this.props.pair.left.id);
  }

  editRight() {
    this.props.editVegaLiteSpec(this.props.pair.right.vlSpec);
    this.props.bindPairItem(this.props.pair.right.id);
  }

  changeComp() {
    const newPair = {
      ...this.props.pair,
      comp: this.props.pair.comp === '<' ? '=' : '<',
    } as Pair;
    this.props.updatePair(newPair);
  }
}

interface SplinterProps {
  id: number;
  diffVectorOpt: Option<number[]>;
  colorScale: any;
  unitWidth: number;
  onClick: any;
  pass: boolean;
  invalidPass: boolean;
  invalid: boolean;
}

const Splinter = (props: SplinterProps) => {
  if (props.invalid) {
  const color = props.invalidPass ? 'green' : 'red';
    return (
      <div styleName={`splinter ${color}`} onClick={props.onClick}>
        <div styleName="id">{props.id}</div>
      </div>
    );
  }

  const color = props.pass ? 'green' : 'red';
  return (
    <div styleName={`splinter ${color}`} onClick={props.onClick}>
      <div styleName="id">{props.id}</div>
      {
        props.diffVectorOpt.get.map((n: number, i: number) => {
          const color = n === 0 ? '#fff' : props.colorScale(2 * -n);
          return (
            <div key={i} styleName="vector-unit" style={{ 'backgroundColor': color }} />
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
      <tbody>
        <tr key="header">
          <th>constraint</th>
          <th>cost</th>
          <th>constraint</th>
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
                <td style={leftStyle}> {leftWitnessOpt.orNull}</td>
                <td styleName="cost"
                  style={leftStyle}>
                  {leftCostOpt.orNull}
                </td>
                <td style={rightStyle}>{rightWitnessOpt.orNull}</td>
              </tr>
            );
          })
        }
      </tbody>
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
  return {
    constraintSetMapOpt: state.collection.dracoConstraintSetMapOpt
  };
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
    updatePair: (pair: Pair) => {
      dispatch(updatePair(pair));
    },
    deletePair: (pairId: number) => {
      dispatch(deletePair(pairId));
    },
    addViolationsToMatch: (violations: Violation[]) => {
      dispatch(
        addViolationsToMatch(violations),
      );
    },
    removeViolationsToMatch: () => {
      dispatch(removeViolationsToMatch());
    },
    editVegaLiteSpec: (vlSpec: TopLevelFacetedUnitSpec) => {
      dispatch(updateVegaLiteEditorCode(JSON.stringify(vlSpec, null, 2)));
      dispatch(switchEditor('vega-lite'));
      dispatch(updateVegaLiteSpec());
    },
    bindPairItem: (pairItemId: PairItemId) => {
      dispatch(bindPairItem(pairItemId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PairCard);
