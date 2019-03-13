import classnames from 'classnames';
import { constraints2json, json2constraints } from 'draco-core';
import { ConstraintSet } from 'draco-vis';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Option } from 'ts-option';
import { RootAction } from '../../actions';
import { setConstraintSet } from '../../actions/draco-actions';
import { switchFile, updateEditorCode } from '../../actions/tuner-actions';
import { RootState } from '../../reducers';
import { EditorType } from '../../reducers/tuner';
import AspEditor from './asp-editor/AspEditor';
import TableEditor from './table-editor/TableEditor';
import TunerBar from './tuner-bar/TunerBar';
import './tuner.css';

interface StateProps {
  editor: EditorType;
  file: string;
  code: string;
  constraintSetOpt: Option<ConstraintSet>;
}

interface DispatchProps {
  updateEditorCode: (code: string) => void;
  switchFile: (file: string) => void;
  setConstraintSet: (constraintSet: ConstraintSet) => void;
}

interface Props extends StateProps, DispatchProps {}

class Tuner extends React.Component<Props, any> {
  render() {
    const panesStyle = classnames({
      panes: true,
      'show-first': this.props.editor === 'table',
      'show-second': this.props.editor === 'asp',
    });

    return (
      <div styleName="tuner">
        <TunerBar />
        <div styleName={panesStyle}>
          <TableEditor />
          <div styleName="asp-editor">
            <div styleName="selector">
              <button styleName="button" onClick={() => {
                if (this.props.constraintSetOpt.isDefined) {
                  const constraintSet = { ...this.props.constraintSetOpt.get };
                  switch (this.props.file) {
                    case 'weights':
                      constraintSet.soft = constraints2json(json2constraints(constraintSet.soft).definitions, this.props.code);
                      break;
                    case 'soft':
                      constraintSet.soft = constraints2json(this.props.code, json2constraints(constraintSet.soft).weights);
                      break;
                    case 'hard':
                      constraintSet.hard = constraints2json(this.props.code);
                      break;
                  }

                  this.props.setConstraintSet(constraintSet);
                }
              }}>save</button>
              <select onChange={(event) => {
                this.props.switchFile(event.target.value);
              }}>
                <option value="weights">weights</option>
                <option value="soft">soft</option>
                <option value="hard">hard</option>
              </select>
            </div>
            <AspEditor />
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.constraintSetOpt.isEmpty && this.props.constraintSetOpt.isDefined ||
        prevProps.file !== this.props.file) {
      let code;
      switch (this.props.file) {
        case 'weights':
          code = json2constraints(this.props.constraintSetOpt.get.soft).weights;
          break;
        case 'soft':
          code = json2constraints(this.props.constraintSetOpt.get.soft).definitions;
          break;
        case 'hard':
          code = json2constraints(this.props.constraintSetOpt.get.hard).definitions;
          break;
      }
      this.props.updateEditorCode(code);
    }
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    editor: state.tuner.editor,
    code: state.tuner.code,
    file: state.tuner.file,
    constraintSetOpt: state.collection.dracoConstraintSetOpt
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    updateEditorCode: (code: string) => {
      dispatch(updateEditorCode(code));
    },
    switchFile: (file: string) => {
      dispatch(switchFile(file));
    },
    setConstraintSet: (constraintSet: ConstraintSet) => {
      dispatch(setConstraintSet(constraintSet));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tuner);
