import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import './editor.css';
import MonacoEditor from './monaco-editor/MonacoEditor'; // tslint:disable-line

type StateProps = {
  code: string;
};

type DispatchProps = {};

type EditorProps = StateProps & DispatchProps;

type State = {};

class Editor extends React.Component<EditorProps, State> {
  render() {
    return (
      <div styleName="editor">
        <div styleName="display" />
        <MonacoEditor />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    code: state.editor.code,
  };
};

export default connect(mapStateToProps)(Editor);
