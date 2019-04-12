import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Pair } from '../../model/pair';
import { RootState } from '../../reducers';
import EditTable, { EditTableDispatchProps, EditTableOwnProps, EditTableStoreProps } from '../presenters/edit-table';
import { toggleFocusPair, toggleHoverPair } from '../../actions/pair-collection-actions';

function mapStateToProps(state: RootState, props: EditTableOwnProps): EditTableStoreProps {
  const edits = state.draco.edits;
  return {
    edits,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  props: EditTableOwnProps
): EditTableDispatchProps {
  return {};
}

export default connect<EditTableStoreProps, EditTableDispatchProps, EditTableOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(EditTable);
