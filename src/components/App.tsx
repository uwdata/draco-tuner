import * as React from 'react';
import SplitPane from 'react-split-pane';
import './app.css';
import {
  ConstraintTunerContainer,
  NavbarContainer,
  PairCollectionContainer,
  VegaLiteEditorContainer,
} from './containers';

interface StateProps {}

interface DispatchProps {}

interface AppProps extends StateProps, DispatchProps {}

interface State {}

export default class App extends React.PureComponent<AppProps, State> {
  render() {
    return (
      <div styleName="app" id="app">
        <div styleName="navbar">
          <NavbarContainer />
        </div>
        <div styleName="tuner" id="tuner">
          <SplitPane split="vertical" defaultSize={200} maxSize={400}>
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
