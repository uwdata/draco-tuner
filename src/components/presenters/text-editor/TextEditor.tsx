import classnames from 'classnames';
import { TopLevelUnitSpec } from 'draco-vis/node_modules/vega-lite/build/src/spec/unit';
import React from 'react';
import { Editor, EditorType, VegaLiteStatus } from '../../../reducers/text-editor-reducer';
import { AspEditorPanelContainer, VegaLiteEditorContainer } from '../../containers';
import VegaLiteChart from '../vega-lite-chart/index';
import './text-editor.css';

export interface TextEditorStoreProps {
  vlSpec: TopLevelUnitSpec;
  vlStatus: VegaLiteStatus;
}

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
        <div styleName="render">
          <VegaLiteChart spec={this.props.vlSpec} renderer="svg" />
        </div>
        <VegaLiteEditorContainer />
        <div
          styleName={classnames({
            log: true,
            pass: this.props.vlStatus === VegaLiteStatus.OK,
          })}
        >
          {this.props.vlStatus}
        </div>
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
