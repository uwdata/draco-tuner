import classnames from 'classnames';
import * as React from 'react';
import { Collection, CollectionType } from '../../../reducers/app-reducer';
import './navbar.css';

export interface NavbarStoreProps {
  collectionPane: CollectionType;
}
export interface NavbarDispatchProps {
  downloadFiles: () => void;
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
              save
            </button>
          </div>
          <div styleName="button-container">
            <button
              styleName={classnames({ focused: this.props.collectionPane === Collection.CHARTS })}
              onClick={() => {
                if (this.props.collectionPane === Collection.CHARTS) {
                  this.props.setCollectionPane(Collection.HIDDEN);
                } else {
                  this.props.setCollectionPane(Collection.CHARTS);
                }
              }}
            >
              charts
            </button>
          </div>
          <div styleName="button-container">
            <button
              styleName={classnames({ focused: this.props.collectionPane === Collection.PAIRS })}
              onClick={() => {
                if (this.props.collectionPane === Collection.PAIRS) {
                  this.props.setCollectionPane(Collection.HIDDEN);
                } else {
                  this.props.setCollectionPane(Collection.PAIRS);
                }
              }}
            >
              pairs
            </button>
          </div>
        </div>
      </div>
    );
  }
}
