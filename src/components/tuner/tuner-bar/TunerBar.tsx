import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootAction } from '../../../actions';
import { switchEditor } from '../../../actions/tuner-actions';
import { RootState } from '../../../reducers';
import { EditorType } from '../../../reducers/tuner';
import './tuner-bar.css';

interface PassedProps {
}

interface StateProps {
  editorType: EditorType;
}

interface DispatchProps {
  onEditorSelect: (editorType: EditorType) => void;
}

interface TunerBarProps extends PassedProps, StateProps, DispatchProps {}

const TunerBar = (props: TunerBarProps) => {  // tslint:disable-line
  return (
    <div
      styleName="tuner-bar"
    >
      <button
        styleName={ classnames({ option: true, selected: props.editorType === 'table' })}
        onClick={() => {
          props.onEditorSelect('table');
        }}
      >
        Table
      </button>
      <button
        styleName={ classnames({ option: true, selected: props.editorType === 'asp' })}
        onClick={() => {
          props.onEditorSelect('asp');
        }}
      >
        ASP
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => {
  return {
    editorType: state.tuner.editor,
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
)(TunerBar);
