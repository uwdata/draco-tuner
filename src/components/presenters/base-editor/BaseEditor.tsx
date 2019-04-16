import _ from 'lodash';
import * as React from 'react';
import { default as ReactMonacoEditor } from 'react-monaco-editor'; // tslint:disable-line
import './base-editor.css';

export interface BaseStoreProps {
  code: string;
}

export interface BaseDispatchProps {
  updateStoreCode: (code: string, opt?: any) => void;
}

export interface BaseOwnProps {}

export interface BaseEditorProps extends BaseStoreProps, BaseDispatchProps, BaseOwnProps {}

export interface BaseEditorState {
  code: string;
  updateTimeoutId?: number;
}

export default abstract class BaseEditor<
  P extends BaseEditorProps,
  S extends BaseEditorState
> extends React.PureComponent<P, S> {
  abstract language: string;

  static DEBOUNCE_DURATION = 100;

  constructor(props: P) {
    super(props);

    this.editorDidMount = this.editorDidMount.bind(this);
    this.editorWillMount = this.editorWillMount.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  static getDerivedStateFromProps(props: BaseEditorProps, state: BaseEditorState) {
    if (!_.isUndefined(state.updateTimeoutId)) {
      return state;
    }

    return {
      ...state,
      code: props.code,
    };
  }

  render() {
    return (
      <div styleName="base-editor">
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
          language={this.language}
          value={this.state.code}
          theme="draco-light"
          editorDidMount={this.editorDidMount}
          editorWillMount={this.editorWillMount}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }

  protected handleEditorChange(newValue: string, e: any) {
    this.props.updateStoreCode(newValue);
    this.setState({ updateTimeoutId: undefined });
  }

  protected editorDidMount(editor: any) {
    this.onEditorMount();
  }

  protected editorWillMount(monaco: any) {
    this.defineEditor(monaco);
  }

  abstract defineEditor(monaco: any): void;

  abstract onEditorMount(): void;
}
