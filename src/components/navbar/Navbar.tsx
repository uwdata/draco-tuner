import * as React from 'react';
import { connect } from 'react-redux';
import './navbar.css';

type StateProps = {};
type DispatchProps = {};
type NavbarProps = StateProps & DispatchProps;

type State = {};

class Navbar extends React.Component<NavbarProps, State> {
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

export default connect()(Navbar);
