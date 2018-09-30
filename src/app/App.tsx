import * as React from 'react';
import './App.css';

interface AppState {
  status: string;
}

interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}
