import classnames from 'classnames';
import React from 'react';
import { ConstraintEdit, ConstraintEditObject } from '../../../model/index';
import './edit-table.css';

export interface EditTableStoreProps {
  edits: ConstraintEditObject[];
  editIndex: number;
}

export interface EditTableDispatchProps {
  revertToEdit: (editIndex: number) => void;
  deleteCurrentEdit: () => void;
  prevEdit: () => void;
  nextEdit: () => void;
}

export interface EditTableOwnProps {}

export interface EditTableProps extends EditTableStoreProps, EditTableDispatchProps, EditTableOwnProps {}

export interface EditTableState {}

export default class EditTable extends React.PureComponent<EditTableProps, EditTableState> {
  render() {
    const edits = this.props.edits.map((edit, i) => {
      const styleNames = classnames({
        focused: i === this.props.editIndex,
        unfocused: i < this.props.editIndex,
      });

      if (ConstraintEdit.isCostEdit(edit)) {
        return (
          <tr
            key={i}
            styleName={styleNames}
            onClick={() => {
              this.props.revertToEdit(i);
            }}
          >
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
      <div
        styleName="edit-table"
        onKeyDown={event => {
          switch (event.key) {
            case 'Backspace':
              this.props.deleteCurrentEdit();
              break;
            case 'ArrowUp':
              this.props.prevEdit();
              break;
            case 'ArrowDown':
              this.props.nextEdit();
              break;
          }
        }}
        tabIndex={0}
      >
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
