import { ConstraintSet, Violation } from 'draco-vis';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Option } from 'ts-option';
import { RootAction } from '../../../actions';
import { RootState } from '../../../reducers';
import './table-editor.css';

interface StateProps {
  constraintSetOpt: Option<ConstraintSet>;
  violationsToMatch: Violation[][];
}

interface DispatchProps {
}

interface Props extends StateProps, DispatchProps {
}

class TableEditor extends React.Component<Props, any> {
  render() {
    const violationsToMatch = this.props.violationsToMatch.filter(_ => _ !== null);
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
      
      return (
        <div styleName="table-editor">
          <table styleName="table">
            <tr key="header">
              <th>constraint</th>
              <th>cost</th>
              {violationsToMatch.map((violations, i) => {
                return <th>{i}</th>
              })}
            </tr>
            {
              namesList.map((name) => {
                const c = namesToMatch[name];
                return (
                  <tr key={name}>
                    <td>{c.name}</td>
                    <td>{c.weight}</td>
                    {violationsToMatch.map(violations => {
                      const numViolations = violations.filter(d => d.name === name).length;
                      return <td>{numViolations}</td>
                    })}
                  </tr>
                )
              })
            }
          </table>
        </div>       
      )
    } else {
      return (
        <div styleName="table-editor">
          <table styleName="table">
            <tr key="header">
              <th>constraint</th>
              <th>cost</th>
            </tr>
            {
              this.props.constraintSetOpt.isEmpty ?
              null :
              this.props.constraintSetOpt.get.soft.map((c) => {
                return (
                  <tr key={c.name}>
                    <td>{c.name}</td>
                    <td>{c.weight}</td>
                  </tr>
                )
              })
            }
          </table>
        </div>
      );
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableEditor);
