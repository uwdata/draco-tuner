import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import AspEditor, { AspEditorDispatchProps, AspEditorOwnProps, AspEditorStoreProps } from '../presenters/asp-editor';

function mapStateToProps(state: RootState, ownProps: AspEditorOwnProps): AspEditorStoreProps {
  const code = state.textEditor.vegalite.aspFacts;
  return {
    code,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: AspEditorOwnProps): AspEditorDispatchProps {
  return {
    updateStoreCode: (code: string, before: string) => {},
  };
}

export default connect<AspEditorStoreProps, AspEditorDispatchProps, AspEditorOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AspEditor);
