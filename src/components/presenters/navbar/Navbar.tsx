import * as React from 'react';
import { ChartDictionary, ConstraintMapObject } from '../../../model/index';
import { CollectionType } from '../../../reducers/app-reducer';
import { PairsDictionary } from '../../../reducers/pair-collection-reducer';
import './navbar.css';

export interface NavbarStoreProps {
  collectionPane: CollectionType;
}
export interface NavbarDispatchProps {
  downloadFiles: () => void;
  setConstraints: (constraintMap: ConstraintMapObject) => void;
  resetPairs: (pairs: PairsDictionary) => void;
  resetCharts: (charts: ChartDictionary) => void;
  save: () => void;
  setCollectionPane: (collectionType: CollectionType) => void;
}
export interface NavbarOwnProps {}
export interface NavbarProps extends NavbarStoreProps, NavbarDispatchProps, NavbarOwnProps {}

export interface NavbarState {}

export default class Navbar extends React.Component<NavbarProps, NavbarState> {
  private fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: NavbarProps) {
    super(props);

    this.fileInput = React.createRef();
  }
  render() {
    return (
      <div styleName="navbar">
        <div styleName="content">
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
            <button styleName="icon-button">
              <label
                htmlFor="file-upload"
                className="material-icons"
                styleName="icon-button"
                onChange={e => {
                  const fileList = this.fileInput.current.files;
                  for (let i = 0; i < fileList.length; i += 1) {
                    const fileReader = new FileReader();
                    const file = fileList.item(i);

                    fileReader.onload = (ev: ProgressEvent) => {
                      const result = JSON.parse(fileReader.result as string);
                      switch (file.name) {
                        case 'constraints.json':
                          this.props.setConstraints(result);
                          break;
                        case 'pairs.json':
                          this.props.resetPairs(result);
                          break;
                        case 'charts.json':
                          this.props.resetCharts(result);
                          break;
                      }

                      fileReader.readAsText(file);
                    };
                  }
                }}
              >
                <input id="file-upload" type="file" ref={this.fileInput} />
                publish
              </label>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
