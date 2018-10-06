import classnames from 'classnames';
import { SolutionSet } from 'draco-vis';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TopLevelSpec } from 'vega-lite';
import Worker from 'worker-loader!../../worker/Worker'; // tslint:disable-line
import { RootAction } from '../../actions';
import { updateDracoSolutionSet } from '../../actions/editor-actions';
import { RootState } from '../../reducers';
import Recommendation from '../recommendation/Recommendation';
import VegaLiteChart from '../vega-lite-chart/VegaLiteChart';
import DracoEditor from './draco-editor/DracoEditor';
import EditorBar from './editor-bar/EditorBar';
import './editor.css';
import InfoPane from './info-pane/InfoPane';
import VegaLiteEditor from './vega-lite-editor/VegaLiteEditor';

interface DracoState {
  code: string;
  solutionSet: any;
}

interface VegaLiteState {
  code: string;
  spec: TopLevelSpec;
}

interface StateProps {
  draco: DracoState;
  vegalite: VegaLiteState;
  currentEditor: string;
}

interface DispatchProps {
  onDracoSolutionSetReceived: (solution: SolutionSet) => void;
}

interface EditorProps extends StateProps, DispatchProps {}

interface State {
  displayWidth: number;
  displayHeight: number;
  editorHeight: number;
}

class Editor extends React.Component<EditorProps, State> {
  worker: Worker;

  constructor(props: EditorProps) {
    super(props);

    this.state = {
      displayWidth: 0,
      displayHeight: 0,
      editorHeight: 400 * 0.62 - 32,
    };

    this.worker = new Worker();
    this.worker.onmessage = (e: any) => {
      this.props.onDracoSolutionSetReceived(e.data.response);
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
                height={this.state.displayHeight}
              />
            </div>
            <div
              styleName="text-editor"
            >
              <DracoEditor worker={this.worker} />
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
        <InfoPane />
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
      solutionSet: state.editor.draco.solutionSet,
    },
    vegalite: {
      code: state.editor.code.vegalite,
      spec: state.editor.vegalite.spec,
    },
    currentEditor: state.editor.type,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    onDracoSolutionSetReceived: (solution: SolutionSet) => {
      dispatch(updateDracoSolutionSet(solution));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Editor);
