import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import Recommendation from '../recommendation/Recommendation';
import DracoEditor from './draco-editor/DracoEditor'; // tslint:disable-line
import EditorBar from './editor-bar/EditorBar';
import './editor.css';

type DracoState = {
  code: string;
  solutionSet: any;
};

type StateProps = {
  draco: DracoState,
};

type DispatchProps = {};

type EditorProps = StateProps & DispatchProps;

interface State {
  displayWidth: number;
  displayHeight: number;
  barHeight: number;
  editorHeight: number;
}

class Editor extends React.Component<EditorProps, State> {
  constructor(props: EditorProps) {
    super(props);

    this.state = {
      displayWidth: 0,
      displayHeight: 0,
      barHeight: 0,
      editorHeight: 0,
    };
  }

  render() {
    return (
      <div
        styleName="editor"
        id="editor"
      >
        <div style={{ height: this.state.barHeight }}>
          <EditorBar/>
        </div>
        <div
          styleName="display"
          id="display"
          style={{ height: this.state.displayHeight + 32 }}  // inject height
        >
          <Recommendation
            solutionSet={this.props.draco.solutionSet}
            width={this.state.displayWidth}
            height={this.state.displayHeight}
          />
        </div>
        <div
          styleName="text-editor"
          style={{ height: this.state.editorHeight }}
        >
          <DracoEditor />
        </div>
      </div>
    );
  }

  componentDidMount() {
    const wrapperNode = document.getElementById('editor');
    const displayNode = document.getElementById('display');

    const displayWidth = displayNode.clientWidth;
    const displayHeight = displayNode.clientWidth * 0.62;
    const barHeight = 40;
    const editorHeight = wrapperNode.clientHeight - displayHeight - barHeight;
    this.setState({
      displayWidth,
      displayHeight,
      barHeight,
      editorHeight,
    });
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    draco: {
      code: state.editor.code.draco,
      solutionSet: state.draco.solutionSet,
    },
  };
};

export default connect(mapStateToProps)(Editor);
