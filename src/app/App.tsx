import * as React from 'react';
import './app.css';

interface AppState {
  status: string;
}

interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div className="app">
      </div>
    );
  }
}
