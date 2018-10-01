import * as React from 'react';
import MonacoEditor from './monaco_editor/MonacoEditor';  // tslint:disable-line

import './editor.css';

interface EditorProps {

}

interface EditorState {

}

export default class Editor extends React.Component<EditorProps, EditorState> {
  render() {
    return (
      <div styleName="editor">
        <MonacoEditor />
      </div>
    );
  }
}
