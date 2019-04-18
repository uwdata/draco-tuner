import * as React from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import { Dispatch } from 'redux';
import { RootState } from '../reducers/index';
import './app.css';
import { ConstraintTunerContainer, NavbarContainer, PairCollectionContainer, TextEditorContainer } from './containers';

interface StateProps {
  showEditorPane: boolean;
}

interface DispatchProps {}

interface OwnProps {}

interface AppProps extends StateProps, DispatchProps, OwnProps {}

interface State {}

export class App extends React.PureComponent<AppProps, State> {
  render() {
    const openEditor = this.props.showEditorPane;

    return (
      <div styleName="app" id="app">
        <div styleName="navbar">
          <NavbarContainer />
        </div>
        <div styleName="tuner" id="tuner">
          <SplitPane split="vertical" defaultSize={openEditor ? 400 : 0} maxSize={600}>
            <div style={{ width: '100%', height: '100%', visibility: openEditor ? 'visible' : 'hidden' }}>
              <TextEditorContainer />
            </div>
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
  const showEditorPane = state.app.showEditor;

  return {
    showEditorPane,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
  return {};
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
