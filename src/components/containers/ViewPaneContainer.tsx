import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setViewPane } from '../../actions/app-actions';
import { RootState } from '../../reducers';
import { ViewPosition, ViewType } from '../../reducers/app-reducer';
import ViewPane, { ViewPaneDispatchProps, ViewPaneOwnProps, ViewPaneStoreProps } from '../presenters/view-pane';

function mapStateToProps(state: RootState, ownProps: ViewPaneOwnProps): ViewPaneStoreProps {
  let view: ViewType;
  switch (ownProps.position) {
    case ViewPosition.LEFT:
      view = state.app.viewLeft;
      break;
    case ViewPosition.CENTER:
      view = state.app.viewCenter;
      break;
    case ViewPosition.RIGHT:
      view = state.app.viewRight;
      break;
  }
  return {
    view,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: ViewPaneOwnProps): ViewPaneDispatchProps {
  return {
    setViewPane: (view: ViewType) => {
      dispatch(setViewPane(ownProps.position, view));
    },
  };
}

export default connect<ViewPaneStoreProps, ViewPaneDispatchProps, ViewPaneOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ViewPane);
