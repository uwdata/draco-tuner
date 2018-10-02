import * as React from 'react';
import { connect } from 'react-redux';
import SplitPane from "react-split-pane"; // tslint:disable-line
import { Dispatch } from 'redux';
import { RootAction } from '../actions';
import { initDraco } from '../actions/draco-actions';
import { RootState } from '../reducers';
import './app.css';
import Editor from './editor/Editor';
import Navbar from './navbar/Navbar';

type StateProps = {};

type DispatchProps = {
  onMount: () => void,
};

type AppProps =  StateProps & DispatchProps;

type State = {};

class App extends React.Component<AppProps, State> {
  render() {
    return (
      <div styleName="app">
        <Navbar />
        <div styleName="tuner">
          <SplitPane split="vertical" defaultSize={400} /*minSize={256} maxSize={-800}*/>
            <Editor />
            <div></div>
          </SplitPane>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.onMount();
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
