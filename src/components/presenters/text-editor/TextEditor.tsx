import classnames from 'classnames';
import React from 'react';
import { AspPrograms, AspProgramsType } from '../../../model/asp-program';
import { Editor, EditorType } from '../../../reducers/text-editor-reducer';
import { AspEditorContainer, VegaLiteEditorContainer } from '../../containers';
import './text-editor.css';

export interface TextEditorStoreProps {
  editorType: EditorType | AspProgramsType;
}

export interface TextEditorDispatchProps {}

export interface TextEditorOwnProps {}

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
    const aspEditors = AspPrograms.getTypes().map((type, i) => {
      const aspEditorStyle = classnames({
        'single-editor': true,
        visible: this.props.editorType === type,
      });

      return (
        <div key={type} styleName={aspEditorStyle}>
          <AspEditorContainer programType={type} />
        </div>
      );
    });

    return (
      <div styleName="text-editor">
        {vegaLiteEditor}
        {aspEditors}
      </div>
    );
  }
}
