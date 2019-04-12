import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { downloadFiles } from '../../actions/app-actions';
import { RootState } from '../../reducers';
import Navbar, { NavbarDispatchProps, NavbarOwnProps, NavbarStoreProps } from '../presenters/navbar';

function mapStateToProps(state: RootState, props: NavbarOwnProps) {
  return {};
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  props: NavbarOwnProps
): NavbarDispatchProps {
  return {
    downloadFiles: () => dispatch(downloadFiles()),
  };
}

export default connect<NavbarStoreProps, NavbarDispatchProps, NavbarOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
