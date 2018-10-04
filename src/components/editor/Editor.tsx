import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import Recommendation from '../recommendation/Recommendation';
import './editor.css';
import MonacoEditor from './monaco-editor/MonacoEditor'; // tslint:disable-line

type StateProps = {
  code: string;
  solutionSet: any;
};

type DispatchProps = {};

type EditorProps = StateProps & DispatchProps;

interface State {
  displayWidth: number;
  displayHeight: number;
  editorHeight: number;
}

class Editor extends React.Component<EditorProps, State> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {
      displayWidth: 0,
      displayHeight: 0,
      editorHeight: 0,
    };
  }

  render() {
    return (
      <div
        styleName="editor"
        id="editor"
      >
        <div
          styleName="display"
          id="display"
          style={{ height: this.state.displayHeight + 32 }}  // inject height
        >
          <Recommendation
            solutionSet={this.props.solutionSet}
            width={this.state.displayWidth}
            height={this.state.displayHeight}
          />
        </div>
        <div
          styleName="text-editor"
          style={{ height: this.state.editorHeight }}
        >
          <MonacoEditor />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const wrapperNode = document.getElementById('editor');
    const displayNode = document.getElementById('display');

    const displayWidth = displayNode.clientWidth;
    const displayHeight = displayNode.clientWidth * 0.62;
    const editorHeight = wrapperNode.clientHeight - displayHeight;
    this.setState({
      displayWidth,
      displayHeight,
      editorHeight,
    });
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    code: state.editor.code,
    solutionSet: state.draco.solutionSet,
  };
};

export default connect(mapStateToProps)(Editor);
