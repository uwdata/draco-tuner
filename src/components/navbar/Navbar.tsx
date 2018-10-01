import * as React from 'react';
import './navbar.css';

interface NavbarProps {

}

interface NavbarState {

}

export default class Navbar extends React.Component<NavbarProps, NavbarState> {
  render() {
    return (
      <div styleName="navbar">
        <div styleName="content">
          <h1>Draco Tuner</h1>
        </div>
      </div>
    );
  }
}
