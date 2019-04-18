import classnames from 'classnames';
import React from 'react';
import { AspPrograms, AspProgramsType } from '../../../model';
import { AspEditorContainer } from '../../containers';
import './asp-editor-panel.css';

export interface AspEditorPanelStoreProps {
  focusedFile: AspProgramsType;
}

export interface AspEditorPanelDispatchProps {
  setAspEditorProgram: (programType: AspProgramsType) => void;
}

export interface AspEditorPanelOwnProps {}

export interface AspEditorPanelProps
  extends AspEditorPanelStoreProps,
    AspEditorPanelDispatchProps,
    AspEditorPanelOwnProps {}

export interface AspEditorPanelState {}

export default class AspEditorPanel extends React.PureComponent<AspEditorPanelProps, AspEditorPanelState> {
  static FILES = AspPrograms.getTypes();

  render() {
    const tabs = AspEditorPanel.FILES.map(file => {
      const styleName = classnames({
        tab: true,
        focused: this.props.focusedFile === file,
      });

      return (
        <div
          styleName={styleName}
          onClick={() => {
            this.props.setAspEditorProgram(file);
          }}
        >
          {file}
        </div>
      );
    });
    const fileEditors = AspEditorPanel.FILES.map(file => {
      const styleName = classnames({
        'editor-container': true,
        focused: this.props.focusedFile === file,
      });

      return (
        <div styleName={styleName} key={file}>
          <AspEditorContainer programType={file} />
        </div>
      );
    });

    return (
      <div styleName="asp-editor-panel">
        <div styleName="tabs">{tabs}</div>
        <div styleName="editors">{fileEditors}</div>
      </div>
    );
  }
}
