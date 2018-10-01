import * as React from 'react';
import { default as ReactMonacoEditor } from "react-monaco-editor";  // tslint:disable-line

import { updateEditorCode } from '../../../actions';

import { ASP_FORMAT, ASP_THEME }  from './asp';
import { connect } from 'react-redux';

interface MonacoEditorProps {
  onEditorCodeChange: any;
  code: string;
}

interface MonacoEditorState {

}

class MonacoEditor
    extends React.Component<MonacoEditorProps, MonacoEditorState> {
  constructor(props: MonacoEditorProps) {
    super(props);

    this.editorDidMount = this.editorDidMount.bind(this);
    this.editorWillMount = this.editorWillMount.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  render() {
    return (
      <ReactMonacoEditor
        ref="monaco"
        options={{
          automaticLayout: true,
          cursorBlinking: 'smooth',
          wordWrap: 'on',
          wrappingIndent: 'same',
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false,
          },
        }}
        language="asp"
        value={this.props.code}
        theme="draco-light"
        editorDidMount={this.editorDidMount}
        editorWillMount={this.editorWillMount}
        onChange={this.handleEditorChange}
      />
    );
  }

  private handleEditorChange(newValue: string, e: any) {
    this.props.onEditorCodeChange(newValue);
  }

  public editorDidMount(editor: any) {
    editor.focus();
  }

  public editorWillMount(monaco: any) {
    monaco.languages.register({ id: 'asp' });
    monaco.languages.setMonarchTokensProvider('asp', ASP_FORMAT);
    monaco.editor.defineTheme('draco-light', ASP_THEME);
  }
}

const mapStateToProps = (state: any) => {
  return {
    code: state.code,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onEditorCodeChange: (code: string) => dispatch(updateEditorCode(code)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonacoEditor);
