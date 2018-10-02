import * as React from 'react';
import MonacoEditor from './monaco-editor/MonacoEditor';  // tslint:disable-line

import './editor.css';
import { connect } from 'react-redux';

interface EditorProps {
  code: string;
}

interface EditorState {

}

class Editor extends React.Component<EditorProps, EditorState> {
  render() {
    return (
      <div styleName="editor">
        <div styleName="display" />
        <MonacoEditor />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    code: state.editor.code,
  };
};

export default connect(mapStateToProps)(Editor);
