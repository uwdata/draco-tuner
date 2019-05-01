import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addConstraintEdit } from '../../actions/draco-actions';
import { ConstraintAspEdit, ConstraintEdit } from '../../model/index';
import { RootState } from '../../reducers';
import PlainTextEditor, {
  PlainTextEditorDispatchProps,
  PlainTextEditorOwnProps,
  PlainTextEditorStoreProps,
} from '../presenters/plain-text-editor';

function mapStateToProps(state: RootState, ownProps: PlainTextEditorOwnProps): PlainTextEditorStoreProps {
  const code = state.draco.constraintMap[ownProps.id].description;
  return {
    code,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: PlainTextEditorOwnProps): PlainTextEditorDispatchProps {
  return {
    updateStoreCode: (code: string, before: string) => {
      const edit: ConstraintAspEdit = {
        before,
        type: ConstraintEdit.DESCRIPTION,
        targetId: ownProps.id,
        after: code,
      };
      dispatch(addConstraintEdit(edit));
    },
  };
}

export default connect<PlainTextEditorStoreProps, PlainTextEditorDispatchProps, PlainTextEditorOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(PlainTextEditor);
