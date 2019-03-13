import * as React from 'react';
import { connect } from 'react-redux';
import SplitPane from "react-split-pane"; // tslint:disable-line
import { Dispatch } from 'redux';
import { RootAction } from '../actions';
import { RootState } from '../reducers';
import './app.css';
import CollectionPane from './collection-pane/CollectionPane';
import Editor from './editor/Editor';
import InfoPane from './info-pane/InfoPane';
import Navbar from './navbar/Navbar';
import Tuner from './tuner/Tuner';

interface StateProps {}

interface DispatchProps {}

interface AppProps extends StateProps, DispatchProps {}

interface State {}

class App extends React.Component<AppProps, State> {
  render() {
    return (
      <div styleName="app" id="app">
        <div styleName="navbar">
          <Navbar />
        </div>
        <div styleName="tuner" id="tuner">
          <SplitPane split="vertical" defaultSize={400} maxSize={600}>
            <Editor />
            <div style={{ width: '100%', height: '100%' }}>
              <InfoPane />
              <SplitPane split="vertical" primary="first" minSize={200} defaultSize="60%">
                <CollectionPane />
                <Tuner />
              </SplitPane>
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }

  componentDidMount() {
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
