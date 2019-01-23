import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Option } from 'ts-option';
import { TopLevelSpec } from 'vega-lite';
import { RootState } from '../../reducers';
import Recommendation from '../recommendation/Recommendation';
import VegaLiteChart from '../vega-lite-chart/VegaLiteChart';
import DracoEditor from './draco-editor/DracoEditor';
import EditorBar from './editor-bar/EditorBar';
import './editor.css';
import PairsEditor from './pairs-editor/PairsEditor';
import VegaLiteEditor from './vega-lite-editor/VegaLiteEditor';

interface DracoState {
  code: string;
  solutionSetOpt: Option<any>;
}

interface VegaLiteState {
  code: string;
  specOpt: Option<TopLevelSpec>;
}

interface StateProps {
  draco: DracoState;
  vegalite: VegaLiteState;
  currentEditor: string;
}

interface DispatchProps {}

interface EditorProps extends StateProps, DispatchProps {}

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
      'show-third': this.props.currentEditor === 'pairs',
    });

    return (
      <div
        styleName="editor"
        id="editor"
      >
        <EditorBar />
        <div styleName={paneStyles}>
          <div styleName="container first">
            <div
              styleName="display"
              style={{ height: this.state.displayHeight }}  // inject height
            >
              <Recommendation
                solutionSetOpt={this.props.draco.solutionSetOpt}
                width={this.state.displayWidth - 32}
                height={this.state.displayHeight}
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
                vlSpec={this.props.vegalite.specOpt.orNull}
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
          <div styleName="container third">
            <div
              styleName="display"
              style={{ height: this.state.displayHeight }}  // inject height
            >
            </div>
            <div
              styleName="text-editor"
            >
              <PairsEditor />
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
      solutionSetOpt: state.editor.draco.solutionSetOpt,
    },
    vegalite: {
      code: state.editor.code.vegalite,
      specOpt: state.editor.vegalite.specOpt,
    },
    currentEditor: state.editor.type,
  };
};

export default connect(
  mapStateToProps,
)(Editor);
