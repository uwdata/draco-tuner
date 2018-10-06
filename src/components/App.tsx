import * as React from 'react';
import { connect } from 'react-redux';
import SplitPane from "react-split-pane"; // tslint:disable-line
import { Dispatch } from 'redux';
import { RootAction } from '../actions';
import { initDraco } from '../actions/editor-actions';
import { RootState } from '../reducers';
import './app.css';
import Editor from './editor/Editor';
import Navbar from './navbar/Navbar';

interface StateProps {}

interface DispatchProps {
  onMount: () => void;
}

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
          <SplitPane split="vertical" defaultSize={400} minSize={400} maxSize={600}>
            <Editor />
            <div></div>
          </SplitPane>
        </div>
      </div>
    );
  }

  componentDidMount() {
    // this.props.onMount();
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    onMount: () => {
      dispatch(initDraco());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
