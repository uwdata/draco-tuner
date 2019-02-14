import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Option } from 'ts-option';
import { RootAction } from '../../../actions';
import { updatePairItemVegaLite } from '../../../actions/collection-actions';
import { updateVegaLiteEditorCode, updateVegaLiteSpec } from '../../../actions/editor-actions';
import { RootState } from '../../../reducers';
import { PairItemId } from '../../../reducers/collection';
import BaseEditor, { BaseDispatchProps, BaseStateProps } from '../base-editor/BaseEditor';

interface StateProps extends BaseStateProps {
  code: string;
  pairItemBindOpt: Option<PairItemId>;
}

interface DispatchProps extends BaseDispatchProps {
  onEditorCodeChange: (code: string, pairItemBindOpt: Option<PairItemId>) => void;
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
    this.props.onEditorCodeChange(this.props.code, this.props.pairItemBindOpt);
  }

  protected handleEditorChange(newValue: string, e: any) {
    this.props.onEditorCodeChange(newValue, this.props.pairItemBindOpt);
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    code: state.editor.code.vegalite,
    pairItemBindOpt: state.editor.pairItemBindOpt,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    onEditorCodeChange: (code: string, pairItemBindOpt: Option<PairItemId>) => {
      dispatch(updateVegaLiteEditorCode(code));
      dispatch(updateVegaLiteSpec());
      
      if (pairItemBindOpt.isDefined) {
        dispatch(updatePairItemVegaLite(pairItemBindOpt.get, code));
      }
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VegaLiteEditor);
