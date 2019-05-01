import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { setVegaLiteCode } from '../../actions/text-editor-actions';
import { RootState } from '../../reducers';
import VegaLiteEditor, {
  VegaLiteEditorDispatchProps,
  VegaLiteEditorOwnProps,
  VegaLiteEditorStoreProps,
} from '../presenters/vega-lite-editor';

function mapStateToProps(state: RootState, props: VegaLiteEditorOwnProps): VegaLiteEditorStoreProps {
  const code = state.textEditor.vegalite.code;
  return {
    code,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  props: VegaLiteEditorOwnProps
): VegaLiteEditorDispatchProps {
  return {
    updateStoreCode: (code: string, before: string) => dispatch(setVegaLiteCode(code)),
  };
}

export default connect<VegaLiteEditorStoreProps, VegaLiteEditorDispatchProps, VegaLiteEditorOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(VegaLiteEditor);
