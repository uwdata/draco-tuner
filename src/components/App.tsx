import * as React from 'react';
import './app.css';
import { ConstraintTunerContainer, PairCollectionContainer } from './containers';

interface StateProps {}

interface DispatchProps {}

interface AppProps extends StateProps, DispatchProps {}

interface State {}

export default class App extends React.PureComponent<AppProps, State> {
  render() {
    return (
      <div styleName="app" id="app">
        <PairCollectionContainer />
        <ConstraintTunerContainer />
      </div>
    );
  }

  componentDidMount() {}
}
