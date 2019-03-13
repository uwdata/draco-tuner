import { Constraint, ConstraintSet, Violation } from 'draco-vis';
import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Option } from 'ts-option';
import { RootAction } from '../../../actions';
import { setConstraintSet } from '../../../actions/draco-actions';
import { RootState } from '../../../reducers';
import './table-editor.css';

interface StateProps {
  constraintSetOpt: Option<ConstraintSet>;
  violationsToMatch: Violation[][];
}

interface DispatchProps {
  setConstraintSet: (constraintSet: ConstraintSet) => void;
}

interface Props extends StateProps, DispatchProps {
}

interface ViolationCount extends Violation {
  count: number;
}

class TableEditor extends React.Component<Props, any> {
  render() {
    if (typeof this.props.constraintSetOpt === 'undefined') {
      return null;
    }

    let violationsToMatch = this.props.violationsToMatch.filter(_ => _ !== null);
    if (violationsToMatch.length > 0 && this.props.constraintSetOpt.isDefined) {
      const violationsToMatchMaps: { [s: string]: ViolationCount }[] = violationsToMatch
        .map(violations => violations.reduce((dict, curr) => {
          if (!dict.hasOwnProperty(curr.name)) {
            dict[curr.name] = {...curr, count: 0 }
          }
          dict[curr.name].count += 1;

          return dict;
        }, {} as { [s: string]: ViolationCount }));

      const allConstraints = this.props.constraintSetOpt.get.soft.concat(this.props.constraintSetOpt.get.hard)
      const sameCountsAndConstraints = allConstraints.map(c => {
        const countSame = violationsToMatchMaps.reduce((count, vs, i) => {
          const exp = Math.pow(-1, i);
          count += vs.hasOwnProperty(c.name) ? vs[c.name].count * exp : 0;
          return count;
        }, 0);

        if (countSame !== 0) {
          let count;
          if (countSame < 0) {
            count = countSame * 10000;
          } else {
            count = -countSame;
          }
          return [count, c]
        }
        const counted: number = 0.001 * violationsToMatchMaps.reduce((curr, vs) => {
          if (vs.hasOwnProperty(c.name)) {
            return curr + vs[c.name].count;
          }
          return curr;
        }, 0);

        if (counted !== 0) {
          return [-counted, c];
        }

        return [Number.POSITIVE_INFINITY, c];
      });

      const constraintsOrdered = _.sortBy(sameCountsAndConstraints,
        ([countA, cA])  => {
          return countA as number;
        })
        .map(([count, c]) => c) as Constraint[];
      
      return (
        <div styleName="table-editor">
          <table styleName="table">
            <tbody key="content">
              <tr key="header">
                <th key="constraint">constraint</th>
                <th key="cost">cost</th>
                {violationsToMatch.map((violations, i) => {
                  return <th key={i}>{i === 0 ? 'left' : 'right'}</th>
                })}
              </tr>
              {/* <tr>
                <td styleName="add-constraint" colSpan={4}>
                  +
                </td>
              </tr> */}
              {
                constraintsOrdered.map((c, i) => {
                  return (
                    <tr key={i}>
                      <td styleName="name" key="name">{c.name}</td>
                      <td key="weight">
                      <input styleName="cost-input"
                          pattern="[0-9]*"
                          value={typeof c.weight !== 'undefined' ? c.weight : 'inf'}
                          onChange={(event) => {
                            let value;
                            if (event.target.value !== '') {
                              value = parseInt(event.target.value);
                            } else {
                              value = '';
                            }
                            const constraint = { ...c, weight: value } as Constraint;
                            this.updateConstraint(constraint);
                          }}
                        />
                      </td>
                      {violationsToMatch.map((violations, i) => {
                        let numViolations = 0;
                        if (violationsToMatchMaps[i].hasOwnProperty(c.name)) {
                          numViolations = violationsToMatchMaps[i][c.name].count;
                        }
                        return <td key={i}>{numViolations}</td>
                      })}
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>       
      )
    } else {
      return (
        <div styleName="table-editor">
          <table styleName="table">
            <tbody key="content">
              <tr key="header">
                <th key="constraint">constraint</th>
                <th key="cost">cost</th>
              </tr>
              {/* <tr>
                <td  styleName="add-constraint" colSpan={2}>
                  +
                </td>
              </tr> */}
              {
                this.props.constraintSetOpt.isEmpty ?
                null :
                this.props.constraintSetOpt.get.soft.map((c) => {
                  return (
                    <tr key={c.name}>
                      <td styleName="name" key="name">{c.name}</td>
                      <td key="weight">
                        <input styleName="cost-input"
                          pattern="[0-9]*"
                          value={typeof c.weight !== 'undefined' ? c.weight : 'inf'}
                          onChange={(event) => {
                            let value;
                            if (event.target.value !== '') {
                              value = parseInt(event.target.value);
                            } else {
                              value = '';
                            }
                            const constraint = { ...c, weight: value } as Constraint;
                            this.updateConstraint(constraint);
                          }}
                        />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      );
    }
  }

  updateConstraint(constraint: Constraint) {
    if (this.props.constraintSetOpt.isDefined) {
      const constraintSet = this.props.constraintSetOpt.get;
      const soft = constraintSet.soft.map(c => {
        if (c.name === constraint.name) {
          return constraint;
        }
        return c;
      });

      constraintSet.soft = soft;

      this.props.setConstraintSet(constraintSet);
    }
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    constraintSetOpt: state.collection.dracoConstraintSetOpt,
    violationsToMatch: state.tuner.violationsToMatch,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    setConstraintSet: (constraintSet: ConstraintSet) => {
      dispatch(setConstraintSet(constraintSet));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableEditor);
