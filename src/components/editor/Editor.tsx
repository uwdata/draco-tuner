import * as React from 'react';
import MonacoEditor from './monaco_editor/MonacoEditor';  // tslint:disable-line

import './editor.css';
import { connect } from 'react-redux';

interface EditorProps {

}

interface EditorState {

}

class Editor extends React.Component<EditorProps, EditorState> {
  render() {
    return (
      <div styleName="editor">
        <MonacoEditor />
      </div>
    );
  }
}

export default connect()(Editor);
