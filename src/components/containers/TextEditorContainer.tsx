import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AspProgramsType } from '../../model/asp-program';
import { RootState } from '../../reducers';
import { Editor, EditorType } from '../../reducers/text-editor-reducer';
import TextEditor, {
  TextEditorDispatchProps,
  TextEditorOwnProps,
  TextEditorStoreProps,
} from '../presenters/text-editor';

function mapStateToProps(state: RootState, ownProps: TextEditorOwnProps): TextEditorStoreProps {
  let editorType: EditorType | AspProgramsType = state.textEditor.selectedEditor;
  if (editorType === Editor.ASP) {
    editorType = state.textEditor.aspProgram;
  }
  return {
    editorType,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: TextEditorOwnProps): TextEditorDispatchProps {
  return {};
}

export default connect<TextEditorStoreProps, TextEditorDispatchProps, TextEditorOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(TextEditor);
