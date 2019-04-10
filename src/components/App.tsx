import * as React from 'react';
import SplitPane from 'react-split-pane';
import './app.css';
import { ConstraintTunerContainer, PairCollectionContainer } from './containers';
import Navbar from './presenters/navbar';

interface StateProps {}

interface DispatchProps {}

interface AppProps extends StateProps, DispatchProps {}

interface State {}

export default class App extends React.PureComponent<AppProps, State> {
  render() {
    return (
      <div styleName="app" id="app">
        <div styleName="navbar">
          <Navbar />
        </div>
        <div styleName="tuner" id="tuner">
          <SplitPane split="vertical" defaultSize={0} maxSize={600}>
            <div />
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
