import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { TopLevelSpec } from 'vega-lite';
import { RootState } from '../../reducers';
import Recommendation from '../recommendation/Recommendation';
import VegaLiteChart from '../vega-lite-chart/VegaLiteChart';
import DracoEditor from './draco-editor/DracoEditor';
import EditorBar from './editor-bar/EditorBar';
import './editor.css';
import VegaLiteEditor from './vega-lite-editor/VegaLiteEditor';

type DracoState = {
  code: string;
  solutionSet: any;
};

type VegaLiteState = {
  code: string;
  spec: TopLevelSpec;
};

type StateProps = {
  draco: DracoState,
  vegalite: VegaLiteState,
  currentEditor: string,
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
      editorHeight: 400 * 0.62 - 32,
    };
  }

  render() {
    const paneStyles = classnames({
      panes: true,
      'show-second': this.props.currentEditor === 'vega-lite',
    });

    return (
      <div
        styleName="editor"
        id="editor"
      >
        <EditorBar/>
        <div styleName={paneStyles}>
          <div styleName="container first">
            <div
              styleName="display"
              style={{ height: this.state.displayHeight }}  // inject height
            >
              <Recommendation
                solutionSet={this.props.draco.solutionSet}
                width={this.state.displayWidth - 32}
                height={this.state.displayHeight - 32}
              />
            </div>
            <div
              styleName="text-editor"
            >
              <DracoEditor />
            </div>
          </div>
          <div styleName="container second">
            <div
              styleName="display"
              style={{ height: this.state.displayHeight }}  // inject height
            >
              <VegaLiteChart
                vlSpec={this.props.vegalite.spec}
                renderer="canvas"
                actions={false}
              />
            </div>
            <div
              styleName="text-editor"
            >
              <VegaLiteEditor />
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.resize();
  }

  resize() {
    const wrapperNode = document.getElementById('editor');

    const displayWidth = wrapperNode.clientWidth;
    const displayHeight = wrapperNode.clientWidth * 0.62;
    const barHeight = 40;
    const editorHeight = wrapperNode.clientHeight - displayHeight - barHeight;
    this.setState({
      displayWidth,
      displayHeight,
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
    vegalite: {
      code: state.editor.code.vegalite,
      spec: state.editor.vlSpec,
    },
    currentEditor: state.editor.type,
  };
};

export default connect(mapStateToProps)(Editor);
