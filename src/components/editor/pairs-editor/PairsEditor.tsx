import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootAction } from '../../../actions';
import { updatePairsEditorCode } from '../../../actions/editor-actions';
import { RootState } from '../../../reducers';
import BaseEditor, { BaseDispatchProps, BaseStateProps } from '../base-editor/BaseEditor';

interface StateProps extends BaseStateProps {
  code: string;
}

interface DispatchProps extends BaseDispatchProps {
  onEditorCodeChange: (code: string) => void;
}

export interface PairsEditorProps extends StateProps, DispatchProps {}

interface State {}

class PairsEditor
    extends BaseEditor<PairsEditorProps, State> {
  language: string = 'typescript';

  constructor(props: PairsEditorProps) {
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
    code: state.editor.code.pairs,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    onEditorCodeChange: (code: string) => {
      dispatch(updatePairsEditorCode(code));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PairsEditor);
