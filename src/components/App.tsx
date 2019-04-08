import * as React from 'react';
import './app.css';

interface StateProps {}

interface DispatchProps {}

interface AppProps extends StateProps, DispatchProps {}

interface State {}

export default class App extends React.Component<AppProps, State> {
  render() {
    return (
      <div styleName="app" id="app">
      </div>
    );
  }

  componentDidMount() {
  }
}
