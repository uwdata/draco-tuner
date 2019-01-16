import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootAction } from '../../../actions';
import { updateDracoAsp } from '../../../actions/draco-actions';
import { updateEditorCode } from '../../../actions/tuner-actions'; // tslint:disable-line
import { RootState } from '../../../reducers';
import BaseEditor, { BaseDispatchProps, BaseStateProps } from '../../editor/base-editor/BaseEditor';
import { ASP_FORMAT, ASP_THEME } from '../../editor/draco-editor/asp';

interface PassedProps {}

interface StateProps extends BaseStateProps {
  code: string;
}

interface DispatchProps extends BaseDispatchProps {
  onEditorCodeChange: (code: string) => void;
}

export interface AspEditorProps extends PassedProps, StateProps, DispatchProps {}

interface State {}

class AspEditor
    extends BaseEditor<AspEditorProps, State> {
  language: string = 'asp';

  constructor(props: AspEditorProps) {
    super(props);
  }

  defineEditor(monaco: any) {
    monaco.languages.register({ id: 'asp' });
    monaco.languages.setMonarchTokensProvider('asp', ASP_FORMAT);
    monaco.editor.defineTheme('draco-light', ASP_THEME);
  }

  onEditorMount() {
    this.props.onEditorCodeChange(this.props.code);
  }

  protected handleEditorChange(newValue: string, e: any) {
    super.handleEditorChange(newValue, e);
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    code: state.tuner.code,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    onEditorCodeChange: (code: string) => {
      dispatch(updateEditorCode(code));
      dispatch(updateDracoAsp({ WEIGHTS: code }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AspEditor);
