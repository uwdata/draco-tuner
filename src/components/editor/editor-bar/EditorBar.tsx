import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootAction } from '../../../actions';
import { EditorType, switchEditor } from '../../../actions/editor-actions';
import { RootState } from '../../../reducers';
import './editor-bar.css';

interface PassedProps {
}

interface StateProps {
  editorType: EditorType;
}

interface DispatchProps {
  onEditorSelect: (editorType: EditorType) => void;
}

interface EditorBarProps extends PassedProps, StateProps, DispatchProps {}

const EditorBar = (props: EditorBarProps) => {  // tslint:disable-line
  return (
    <div
      styleName="editor-bar"
    >
      <button
        styleName={ classnames({ option: true, selected: props.editorType === 'draco' })}
        onClick={() => {
          props.onEditorSelect('draco');
        }}
      >
        Draco
      </button>
      <button
        styleName={ classnames({ option: true, selected: props.editorType === 'vega-lite' })}
        onClick={() => {
          props.onEditorSelect('vega-lite');
        }}
      >
        Vega-Lite
      </button>
      <button
        styleName={ classnames({ option: true, selected: props.editorType === 'pairs' })}
        onClick={() => {
          props.onEditorSelect('pairs');
        }}
      >
        Pairs
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    editorType: state.editor.type,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    onEditorSelect: (editorType: EditorType) => {
      dispatch(switchEditor(editorType));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditorBar);
