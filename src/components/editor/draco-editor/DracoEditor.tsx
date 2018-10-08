import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions';
import { RootAction } from '../../../actions';
import { runDraco } from '../../../actions/draco-actions';
import { setEditorDracoSolutionSet, updateDracoEditorCode } from '../../../actions/editor-actions'; // tslint:disable-line
import { RootState } from '../../../reducers';
import BaseEditor, { BaseDispatchProps, BaseStateProps } from '../base-editor/BaseEditor';
import { ASP_FORMAT, ASP_THEME } from './asp';

interface PassedProps {}

interface StateProps extends BaseStateProps {
  code: string;
}

interface DispatchProps extends BaseDispatchProps {
  onEditorCodeChange: (code: string) => void;
  updateDracoSolutionSet: (code: string) => void;
}

export interface DracoEditorProps extends PassedProps, StateProps, DispatchProps {}

interface State {}

class DracoEditor
    extends BaseEditor<DracoEditorProps, State> {
  language: string = 'asp';

  constructor(props: DracoEditorProps) {
    super(props);
  }

  defineEditor(monaco: any) {
    monaco.languages.register({ id: 'asp' });
    monaco.languages.setMonarchTokensProvider('asp', ASP_FORMAT);
    monaco.editor.defineTheme('draco-light', ASP_THEME);
  }

  onEditorMount() {
    this.props.onEditorCodeChange(this.props.code);
    this.props.updateDracoSolutionSet(this.props.code);
  }

  protected handleEditorChange(newValue: string, e: any) {
    super.handleEditorChange(newValue, e);
    this.props.updateDracoSolutionSet(newValue);
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
    updateDracoSolutionSet: (code: string) => {
      dispatch(runDraco(code, getType(setEditorDracoSolutionSet)));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DracoEditor);
