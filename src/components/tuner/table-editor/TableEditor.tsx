import { ConstraintSet } from 'draco-vis';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Option } from 'ts-option';
import { RootAction } from '../../../actions';
import { RootState } from '../../../reducers';
import './table-editor.css';

interface StateProps {
  constraintSetOpt: Option<ConstraintSet>;
}

interface DispatchProps {
}

interface Props extends StateProps, DispatchProps {
}

class TableEditor extends React.Component<Props, any> {
  render() {
    return (
      <div styleName="table-editor">
        <table styleName="table">
          <tr key="header">
            <th>name</th>
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
    )
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    constraintSetOpt: state.collection.dracoConstraintSetOpt,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableEditor);
