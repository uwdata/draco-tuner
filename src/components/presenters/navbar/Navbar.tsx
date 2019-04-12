import * as React from 'react';
import './navbar.css';

export interface NavbarStoreProps {}
export interface NavbarDispatchProps {
  downloadFiles: () => void;
}
export interface NavbarOwnProps {}
export interface NavbarProps extends NavbarStoreProps, NavbarDispatchProps, NavbarOwnProps {}

export interface NavbarState {}

export default class Navbar extends React.Component<NavbarProps, NavbarState> {
  render() {
    return (
      <div styleName="navbar">
        <div styleName="content">
          <h1>Draco Tuner</h1>
          <div styleName="button-container">
            <button
              className="material-icons"
              styleName="icon-button"
              onClick={() => {
                this.props.downloadFiles();
              }}
            >
              get_app
            </button>
          </div>
        </div>
      </div>
    );
  }
}
