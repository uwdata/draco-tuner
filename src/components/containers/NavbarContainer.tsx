import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { downloadFiles, save, setCollectionPane } from '../../actions/app-actions';
import { resetCharts } from '../../actions/chart-collection-actions';
import { setConstraintMap } from '../../actions/draco-actions';
import { resetPairs } from '../../actions/pair-collection-actions';
import { ChartDictionary, ConstraintMapObject } from '../../model/index';
import { RootState } from '../../reducers';
import { CollectionType } from '../../reducers/app-reducer';
import { PairsDictionary } from '../../reducers/pair-collection-reducer';
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
    save: () => dispatch(save()),
    setConstraints: (constraintMap: ConstraintMapObject) => {
      dispatch(setConstraintMap(constraintMap));
    },
    resetPairs: (pairs: PairsDictionary) => {
      dispatch(resetPairs(pairs));
    },
    resetCharts: (charts: ChartDictionary) => {
      dispatch(resetCharts(charts));
    },
  };
}

export default connect<NavbarStoreProps, NavbarDispatchProps, NavbarOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
