import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addConstraintEdit } from '../../actions/draco-actions';
import { ConstraintAspEdit, ConstraintEdit } from '../../model/index';
import { RootState } from '../../reducers';
import AspEditor, { AspEditorDispatchProps, AspEditorOwnProps, AspEditorStoreProps } from '../presenters/asp-editor';

function mapStateToProps(state: RootState, ownProps: AspEditorOwnProps): AspEditorStoreProps {
  const code = state.draco.constraintMap[ownProps.id].asp;
  return {
    code,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: AspEditorOwnProps): AspEditorDispatchProps {
  return {
    updateStoreCode: (code: string, before: string) => {
      const edit: ConstraintAspEdit = {
        before,
        type: ConstraintEdit.ASP,
        targetId: ownProps.id,
        after: code,
      };
      dispatch(addConstraintEdit(edit));
    },
  };
}

export default connect<AspEditorStoreProps, AspEditorDispatchProps, AspEditorOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AspEditor);
