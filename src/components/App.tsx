import * as React from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import { Dispatch } from 'redux';
import { save } from '../actions/app-actions';
import { View, ViewPosition } from '../reducers/app-reducer';
import { RootState } from '../reducers/index';
import './app.css';
import { NavbarContainer, ViewPaneContainer } from './containers';

interface StateProps {
  showLeft: boolean;
  showCenter: boolean;
  showRight: boolean;
}

interface DispatchProps {
  save: () => void;
}

interface OwnProps {}

interface AppProps extends StateProps, DispatchProps, OwnProps {}

interface State {}

export class App extends React.PureComponent<AppProps, State> {
  constructor(props: AppProps) {
    super(props);
  }

  render() {
    const leftStoredSize = localStorage.getItem('left-pane-size');
    let leftSize = this.props.showLeft ? (leftStoredSize ? +leftStoredSize : '25%') : 24;
    const onLeftChange = (size: number) => localStorage.setItem('left-pane-size', size.toString());

    const centerStoredSize = localStorage.getItem('center-pane-size');
    let centerSize = centerStoredSize ? +centerStoredSize : '66%';
    const onCenterChange = (size: number) => localStorage.setItem('center-pane-size', size.toString());

    if (!this.props.showCenter) {
      centerSize = 24;
      if (!this.props.showRight) {
        leftSize = 'calc(100% - 24px - 24px)';
      }
    } else {
      if (!this.props.showRight) {
        centerSize = 'calc(100% - 24px)';
      }
    }

    if (!this.props.showCenter && !this.props.showLeft && !this.props.showRight) {
      leftSize = '33%';
      centerSize = '50%';
    }

    return (
      <div
        styleName="app"
        id="app"
        tabIndex={0}
        onKeyDown={event => {
          if (event.metaKey && event.key === 's') {
            event.preventDefault();
            this.props.save();
          }
        }}
      >
        <div styleName="navbar">
          <NavbarContainer />
        </div>
        <div styleName="tuner" id="tuner">
          <SplitPane split="vertical" defaultSize={leftSize} onChange={onLeftChange}>
            <ViewPaneContainer position={ViewPosition.LEFT} />
            <div style={{ width: '100%', height: '100%' }}>
              <SplitPane split="vertical" primary="first" defaultSize={centerSize} onChange={onCenterChange}>
                <ViewPaneContainer position={ViewPosition.CENTER} />
                <div style={{ width: '100%', height: '100%' }}>
                  <ViewPaneContainer position={ViewPosition.RIGHT} />
                </div>
              </SplitPane>
            </div>
          </SplitPane>
        </div>
      </div>
    );
  }

  componentDidMount() {}
}

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
  const showLeft = state.app.viewLeft !== View.HIDDEN;
  const showCenter = state.app.viewCenter !== View.HIDDEN;
  const showRight = state.app.viewRight !== View.HIDDEN;

  return {
    showLeft,
    showCenter,
    showRight,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
  return {
    save: () => {
      dispatch(save());
    },
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(App);
