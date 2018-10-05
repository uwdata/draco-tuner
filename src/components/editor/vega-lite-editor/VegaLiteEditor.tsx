import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootAction } from '../../../actions';
import { updateVegaLiteEditorCode, updateVegaLiteSpec } from '../../../actions/editor-actions';
import { RootState } from '../../../reducers';
import BaseEditor, { BaseDispatchProps, BaseStateProps } from '../base-editor/BaseEditor';

interface StateProps extends BaseStateProps {
  code: string;
}

interface DispatchProps extends BaseDispatchProps {
  onEditorCodeChange: (code: string) => void;
}

export interface VegaLiteEditorProps extends StateProps, DispatchProps {}

interface State {}

class VegaLiteEditor
    extends BaseEditor<VegaLiteEditorProps, State> {
  language: string = 'json';

  constructor(props: VegaLiteEditorProps) {
    super(props);
  }

  defineEditor(monaco: any) {
  }

  onEditorMount() {
    this.props.onEditorCodeChange(this.props.code);
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    code: state.editor.code.vegalite,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    onEditorCodeChange: (code: string) => {
      dispatch(updateVegaLiteEditorCode(code));
      dispatch(updateVegaLiteSpec());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VegaLiteEditor);
