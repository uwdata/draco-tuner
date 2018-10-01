import * as React from 'react';
import './app.css';

import Navbar from './navbar/Navbar';

interface AppState {
  status: string;
}

interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div styleName="app">
        <Navbar />
      </div>
    );
  }
}
