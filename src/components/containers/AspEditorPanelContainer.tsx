import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setAspEditorProgram } from '../../actions/text-editor-actions';
import { AspProgramsType } from '../../model/index';
import { RootState } from '../../reducers';
import AspEditorPanel, {
  AspEditorPanelDispatchProps,
  AspEditorPanelOwnProps,
  AspEditorPanelStoreProps,
} from '../presenters/asp-editor-panel';

function mapStateToProps(state: RootState, ownProps: AspEditorPanelOwnProps): AspEditorPanelStoreProps {
  const focusedFile = state.textEditor.aspProgram;
  return {
    focusedFile,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: AspEditorPanelOwnProps): AspEditorPanelDispatchProps {
  return {
    setAspEditorProgram: (programType: AspProgramsType): void => {
      dispatch(setAspEditorProgram(programType));
    },
  };
}

export default connect<AspEditorPanelStoreProps, AspEditorPanelDispatchProps, AspEditorPanelOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AspEditorPanel);
