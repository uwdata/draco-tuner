import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Worker from 'worker-loader!../worker/Worker'; // tslint:disable-line
import { RootAction } from '../../../actions';
import { updateDracoEditorCode } from '../../../actions/editor-actions';
import { RootState } from '../../../reducers';
import BaseEditor, { BaseDispatchProps, BaseStateProps } from '../base-editor/BaseEditor';
import { ASP_FORMAT, ASP_THEME } from './asp';

interface PassedProps {
  worker: Worker;
}

interface StateProps extends BaseStateProps {
  code: string;
}

interface DispatchProps extends BaseDispatchProps {
  onEditorCodeChange: (code: string) => void;
}

export interface DracoEditorProps extends PassedProps, StateProps, DispatchProps {}

interface State {}

class DracoEditor
    extends BaseEditor<DracoEditorProps, State> {
  language: string = 'asp';

  constructor(props: DracoEditorProps) {
    super(props);

    this.props.worker.postMessage({ type: 'solve', payload: this.props.code });
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
    this.props.worker.postMessage({ type: 'solve', payload: this.props.code });
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    code: state.editor.code.draco,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    onEditorCodeChange: (code: string) => {
      dispatch(updateDracoEditorCode(code));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DracoEditor);
