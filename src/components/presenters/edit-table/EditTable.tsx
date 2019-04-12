import React from 'react';
import { PairEval, PairEvalType } from '../../../model/pair';
import { Splinter } from '../pair-card/index';
import './edit-table.css';
import classnames from 'classnames';
import { ConstraintEditObject, ConstraintEdit } from '../../../model/index';

export interface EditTableStoreProps {
  edits: ConstraintEditObject[];
}

export interface EditTableDispatchProps {}

export interface EditTableOwnProps {}

export interface EditTableProps
  extends EditTableStoreProps,
    EditTableDispatchProps,
    EditTableOwnProps {}

export interface EditTableState {}

export default class EditTable extends React.PureComponent<EditTableProps, EditTableState> {
  render() {
    const edits = this.props.edits.map((edit, i) => {
      const styleNames = classnames({});

      if (ConstraintEdit.isCostEdit(edit)) {
        return (
          <tr key={i} styleName={styleNames}>
            <td>{edit.type}</td>
            <td>{edit.targetId}</td>
            <td>{edit.before}</td>
            <td>{edit.after}</td>
            <td>{edit.after - edit.before}</td>
          </tr>
        );
      }
    });

    return (
      <div styleName="edit-table">
        <table styleName="table">
          <tbody>
            <tr key="header">
              <th>type</th>
              <th>constraint</th>
              <th>before</th>
              <th>after</th>
              <th>delta</th>
            </tr>
            {edits}
          </tbody>
        </table>
      </div>
    );
  }
}
