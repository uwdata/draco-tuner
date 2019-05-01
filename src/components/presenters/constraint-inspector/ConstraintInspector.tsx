import React from 'react';
import { ConstraintInspectorAspEditorContainer } from '../../containers/index';
import './constraint-inspector.css';

export interface ConstraintInspectorStoreProps {
  aspClauseIds: string[];
}

export interface ConstraintInspectorDispatchProps {
  addAspClause: () => void;
}

export interface ConstraintInspectorOwnProps {}

export interface ConstraintInspectorProps
  extends ConstraintInspectorStoreProps,
    ConstraintInspectorDispatchProps,
    ConstraintInspectorOwnProps {}

export interface ConstraintInspectorState {}

export default class ConstraintInspector extends React.PureComponent<
  ConstraintInspectorProps,
  ConstraintInspectorState
> {
  render() {
    return (
      <div styleName="constraint-inspector">
        <div styleName="section">
          {this.props.aspClauseIds.map(id => {
            return (
              <div styleName="clause" key={id}>
                <div styleName="subsection-title">{`Clause ${+id + 1}`}</div>
                <div styleName="editor" key={id}>
                  <ConstraintInspectorAspEditorContainer id={id} />
                </div>
              </div>
            );
          })}
          <div styleName="button-container">
            <button
              styleName="icon-button"
              onClick={() => {
                this.props.addAspClause();
              }}
            >
              <span className="material-icons">add</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
