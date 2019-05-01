import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import TextEditor, {
  TextEditorDispatchProps,
  TextEditorOwnProps,
  TextEditorStoreProps,
} from '../presenters/text-editor';

function mapStateToProps(state: RootState, ownProps: TextEditorOwnProps): TextEditorStoreProps {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: TextEditorOwnProps): TextEditorDispatchProps {
  return {};
}

export default connect<TextEditorStoreProps, TextEditorDispatchProps, TextEditorOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(TextEditor);