import * as React from 'react';
import { connect } from 'react-redux';
import './navbar.css';

interface StateProps {}
interface DispatchProps {}
interface NavbarProps extends StateProps, DispatchProps {}

interface State {}

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
