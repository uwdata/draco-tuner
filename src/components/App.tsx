import * as React from 'react';
import SplitPane from "react-split-pane";  // tslint:disable-line

import './app.css';

import Navbar from './navbar/Navbar';
import Editor from './editor/Editor';
import { connect } from 'react-redux';

interface AppState {
  status: string;
}

interface AppProps {

}

class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div styleName="app">
        <Navbar />
        <div styleName="tuner">
          <SplitPane split="vertical" defaultSize={344} minSize={256} maxSize={-800}>
            <Editor />
            <div></div>
          </SplitPane>
        </div>
      </div>
    );
  }
}

export default connect()(App);
