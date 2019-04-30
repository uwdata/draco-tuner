import classnames from 'classnames';
import React from 'react';
import { Editor, EditorType } from '../../../reducers/text-editor-reducer';
import { AspEditorPanelContainer, VegaLiteEditorContainer } from '../../containers';
import './text-editor.css';

export interface TextEditorStoreProps {}

export interface TextEditorDispatchProps {}

export interface TextEditorOwnProps {
  editorType: EditorType;
}

export interface TextEditorProps extends TextEditorStoreProps, TextEditorDispatchProps, TextEditorOwnProps {}

export interface TextEditorState {}

export default class TextEditor extends React.PureComponent<TextEditorProps, TextEditorState> {
  render() {
    const vlStyle = classnames({ 'single-editor': true, visible: this.props.editorType === Editor.VEGA_LITE });
    const vegaLiteEditor = (
      <div key="vegalite" styleName={vlStyle}>
        <VegaLiteEditorContainer />
      </div>
    );

    const aspEditorStyle = classnames({
      'single-editor': true,
      visible: this.props.editorType === Editor.ASP,
    });
    const aspEditors = (
      <div key="asp" styleName={aspEditorStyle}>
        <AspEditorPanelContainer />
      </div>
    );

    return (
      <div styleName="text-editor">
        {vegaLiteEditor}
        {aspEditors}
      </div>
    );
  }
}
