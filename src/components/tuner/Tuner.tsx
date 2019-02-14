import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootAction } from '../../actions';
import { RootState } from '../../reducers';
import { EditorType } from '../../reducers/tuner';
import AspEditor from './asp-editor/AspEditor';
import TableEditor from './table-editor/TableEditor';
import TunerBar from './tuner-bar/TunerBar';
import './tuner.css';

interface StateProps {
  editor: EditorType;
}

interface DispatchProps {
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
          <AspEditor />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    editor: state.tuner.editor,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tuner);
