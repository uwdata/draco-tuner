import { Constraint, ConstraintSet, Violation } from 'draco-vis';
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

class TableEditor extends React.Component<Props, any> {
  render() {
    if (typeof this.props.constraintSetOpt === 'undefined') {
      return null;
    }

    let violationsToMatch = this.props.violationsToMatch.filter(_ => _ !== null);
    if (violationsToMatch.length > 0 && this.props.constraintSetOpt.isDefined) {

      const namesToMatch: { [s: string]: Violation } =
        violationsToMatch.reduce((dict: { [s: string]: Violation }, violations) => {
          violations.forEach(c => dict[c.name] = c);
          return dict;
        }, {});

      const namesList = [];
      for (const name in namesToMatch) {
        namesList.push(name);
      }

      // set violations to global props
      const constraintsToMatch: { [s: string]: Constraint } =
        this.props.constraintSetOpt.get.soft.concat(this.props.constraintSetOpt.get.hard).reduce((dict: { [s: string]: Constraint }, c) => {
          if (namesToMatch.hasOwnProperty(c.name)) {
            dict[c.name] = c;
          }
          return dict;
        }, {});
      
      return (
        <div styleName="table-editor">
          <table styleName="table">
            <tbody key="content">
              <tr key="header">
                <th key="constraint">constraint</th>
                <th key="cost">cost</th>
                {violationsToMatch.map((violations, i) => {
                  return <th key={i}>{i}</th>
                })}
              </tr>
              {
                namesList.map((name, i) => {
                  const c = constraintsToMatch[name];
                  return (
                    <tr key={i}>
                      <td key="name">{c.name}</td>
                      <td key="weight">
                      <input pattern="[0-9]*"
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
                        const numViolations = violations.filter(d => d.name === name).length;
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
              {
                this.props.constraintSetOpt.isEmpty ?
                null :
                this.props.constraintSetOpt.get.soft.map((c) => {
                  return (
                    <tr key={c.name}>
                      <td key="name">{c.name}</td>
                      <td key="weight">
                        <input pattern="[0-9]*"
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
