import React from 'react';
import { View, ViewPositionType, ViewType } from '../../../reducers/app-reducer';
import { Editor } from '../../../reducers/text-editor-reducer';
import {
  ChartCollectionContainer,
  ConstraintTunerContainer,
  PairCollectionContainer,
  TextEditorContainer,
} from '../../containers';
import './view-pane.css';

export interface ViewPaneStoreProps {
  view: ViewType;
}

export interface ViewPaneDispatchProps {
  setViewPane: (view: ViewType) => void;
}

export interface ViewPaneOwnProps {
  position: ViewPositionType;
}

export interface ViewPaneProps extends ViewPaneStoreProps, ViewPaneDispatchProps, ViewPaneOwnProps {}

export interface ViewPaneState {
  dropdown: boolean;
}

export default class ViewPane extends React.PureComponent<ViewPaneProps, ViewPaneState> {
  constructor(props: ViewPaneProps) {
    super(props);

    this.state = {
      dropdown: false,
    };
  }

  render() {
    const view = getComponentFromViewType(this.props.view);
    let currViewName = View.getDisplayName(this.props.view);
    if (this.props.view === View.HIDDEN) {
      currViewName = '↔';
    }
    return (
      <div styleName="pane-view">
        <div styleName="bar">
          <button
            styleName="curr"
            onClick={() => {
              if (this.props.view === View.HIDDEN) {
                this.props.setViewPane(View.NONE);
              }
              this.setState({ dropdown: !this.state.dropdown });
            }}
          >
            {currViewName}
          </button>
          {this.state.dropdown ? (
            <div styleName="options">
              {View.types
                .filter(type => View.getDisplayName(type) !== currViewName)
                .map((type, i) => {
                  return (
                    <button
                      key={i}
                      styleName="option"
                      onClick={() => {
                        this.props.setViewPane(type);
                        this.setState({ dropdown: false });
                      }}
                    >
                      {View.getDisplayName(type)}
                    </button>
                  );
                })}
            </div>
          ) : null}
        </div>
        <div styleName="view">{view}</div>
      </div>
    );
  }
}

function getComponentFromViewType(type: ViewType) {
  switch (type) {
    case View.COLLECTION_CHARTS:
      return <ChartCollectionContainer />;
    case View.COLLECTION_PAIRS:
      return <PairCollectionContainer />;
    case View.CONSTRAINT_TUNER:
      return <ConstraintTunerContainer />;
    case View.EDITOR_VEGALITE:
      return <TextEditorContainer editorType={Editor.VEGA_LITE} />;
    case View.EDITOR_ASP:
      return <TextEditorContainer editorType={Editor.ASP} />;
    default:
      return undefined;
  }
}
