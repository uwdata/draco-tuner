import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { downloadFiles, setCollectionPane } from '../../actions/app-actions';
import { RootState } from '../../reducers';
import { CollectionType } from '../../reducers/app-reducer';
import Navbar, { NavbarDispatchProps, NavbarOwnProps, NavbarStoreProps } from '../presenters/navbar';

function mapStateToProps(state: RootState, props: NavbarOwnProps) {
  const collectionPane = state.app.collectionPane;
  return {
    collectionPane,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, AnyAction>, props: NavbarOwnProps): NavbarDispatchProps {
  return {
    downloadFiles: () => dispatch(downloadFiles()),
    setCollectionPane: (collectionType: CollectionType) => {
      dispatch(setCollectionPane(collectionType));
    },
  };
}

export default connect<NavbarStoreProps, NavbarDispatchProps, NavbarOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
