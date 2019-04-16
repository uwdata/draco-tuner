import * as React from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import { Dispatch } from 'redux';
import { RootState } from '../reducers/index';
import './app.css';
import {
  ConstraintTunerContainer,
  NavbarContainer,
  PairCollectionContainer,
  VegaLiteEditorContainer,
} from './containers';

interface StateProps {
  editorPane: string;
}

interface DispatchProps {}

interface OwnProps {}

interface AppProps extends StateProps, DispatchProps, OwnProps {}

interface State {}

export class App extends React.PureComponent<AppProps, State> {
  render() {
    const openEditor = !!this.props.editorPane;

    return (
      <div styleName="app" id="app">
        <div styleName="navbar">
          <NavbarContainer />
        </div>
        <div styleName="tuner" id="tuner">
          <SplitPane split="vertical" defaultSize={openEditor ? 400 : 0} maxSize={600}>
            <VegaLiteEditorContainer />
            <div style={{ width: '100%', height: '100%' }}>
              <SplitPane split="vertical" primary="first" minSize={200} defaultSize="60%">
                <PairCollectionContainer />
                <ConstraintTunerContainer />
              </SplitPane>
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }

  componentDidMount() {}
}

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
  let editorPane;
  if (!!state.pairCollection.focusPair && !!state.pairCollection.focusItem) {
    editorPane = 'vegalite';
  }

  return {
    editorPane,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
  return {};
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
