import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootAction } from '../../../actions';
import { runDraco } from '../../../actions/draco-actions';
import { updateDracoEditorCode } from '../../../actions/editor-actions';
import { RootState } from '../../../reducers';
import BaseEditor, { BaseDispatchProps, BaseStateProps } from '../base-editor/BaseEditor';
import { ASP_FORMAT, ASP_THEME } from './asp';
import './draco-editor.css';

interface StateProps extends BaseStateProps {
  code: string;
}

interface DispatchProps extends BaseDispatchProps {
  onEditorCodeChange: (code: string) => void;
}

export interface DracoEditorProps extends StateProps, DispatchProps {}

type State = {};

class DracoEditor
    extends BaseEditor<DracoEditorProps, State> {
  language: string = 'asp';

  constructor(props: DracoEditorProps) {
    super(props);
  }

  defineEditor(monaco: any) {
    console.log('define editor');
    monaco.languages.register({ id: 'asp' });
    monaco.languages.setMonarchTokensProvider('asp', ASP_FORMAT);
    monaco.editor.defineTheme('draco-light', ASP_THEME);
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
      dispatch(runDraco(code));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DracoEditor);
