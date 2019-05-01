import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setAspClause } from '../../actions/constraint-inspector-actions';
import { RootState } from '../../reducers';
import AspEditor, { AspEditorDispatchProps, AspEditorOwnProps, AspEditorStoreProps } from '../presenters/asp-editor';

function mapStateToProps(state: RootState, ownProps: AspEditorOwnProps): AspEditorStoreProps {
  const code = state.constraintInspector.aspClauses[ownProps.id].code;
  return {
    code,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: AspEditorOwnProps): AspEditorDispatchProps {
  return {
    updateStoreCode: (code: string) => {
      dispatch(setAspClause(code, ownProps.id));
    },
  };
}

export default connect<AspEditorStoreProps, AspEditorDispatchProps, AspEditorOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AspEditor);
