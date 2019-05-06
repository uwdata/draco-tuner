import * as React from 'react';
import { CollectionType } from '../../../reducers/app-reducer';
import './navbar.css';

export interface NavbarStoreProps {
  collectionPane: CollectionType;
}
export interface NavbarDispatchProps {
  downloadFiles: () => void;
  save: () => void;
  setCollectionPane: (collectionType: CollectionType) => void;
}
export interface NavbarOwnProps {}
export interface NavbarProps extends NavbarStoreProps, NavbarDispatchProps, NavbarOwnProps {}

export interface NavbarState {}

export default class Navbar extends React.Component<NavbarProps, NavbarState> {
  render() {
    return (
      <div styleName="navbar">
        <div styleName="content">
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
          <div styleName="button-container">
            <button
              className="material-icons"
              styleName="icon-button"
              onClick={() => {
                this.props.save();
              }}
            >
              save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
