import * as React from 'react';
import { default as ReactMonacoEditor } from "react-monaco-editor"; // tslint:disable-line
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootAction } from '../../../actions';
import { runDraco } from '../../../actions/draco-actions';
import { updateEditorCode } from '../../../actions/editor-actions';
import { RootState } from '../../../reducers';
import { ASP_FORMAT, ASP_THEME } from './asp';
import './monaco-editor.css';

type StateProps = {
  code: string;
};

type DispatchProps = {
  onEditorCodeChange: (code: string) => void,
};

export type MonacoEditorProps = StateProps & DispatchProps;

type State = {};

class MonacoEditor
    extends React.Component<MonacoEditorProps, State> {
  constructor(props: MonacoEditorProps) {
    super(props);

    this.editorDidMount = this.editorDidMount.bind(this);
    this.editorWillMount = this.editorWillMount.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  render() {
    return (
      <div styleName="monaco-editor">
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
      </div>
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

const mapStateToProps = (state: RootState): StateProps => {
  return {
    code: state.editor.code,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    onEditorCodeChange: (code: string) => {
      dispatch(updateEditorCode(code));
      dispatch(runDraco(code));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MonacoEditor);
