import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { none, Option } from 'ts-option';
import { TopLevelSpec } from 'vega-lite';
import { RootAction } from '../../actions';
import { addPairs } from '../../actions/collection-actions';
import { RootState } from '../../reducers';
import { Pair, PairItem } from '../../reducers/collection';
import { PairsState } from '../../reducers/editor';
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
  pairs: PairsState;
  currentEditor: string;
}

interface DispatchProps {
  addPairsToCollection: (pairs: Pair[]) => void;
}

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

    this.addPairsToCollection = this.addPairsToCollection.bind(this);
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
              <button onClick={this.addPairsToCollection}>Add to Collection</button>
              <div styleName="pairs">
                {this.props.pairs.pairs.map((pair: any, i: number) => {
                  return (
                    <div styleName="pair" key={i}>
                      <div styleName="left">
                        <VegaLiteChart vlSpec={pair[0]} renderer="canvas" actions={false} />
                      </div>
                      <div styleName="right">
                        <VegaLiteChart vlSpec={pair[1]} renderer="canvas" actions={false} />
                      </div>
                    </div>
                  )
                })}
              </div>
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

  addPairsToCollection() {
    const pairs: Pair[] = this.props.pairs.pairs.map(simplePair => {
      const left = simplePair[0];
      const right = simplePair[1];

      const leftItem: PairItem = {
        id: {
          pairId: 0,
          position: 'left',
        },
        vlSpec: left,
        solutionOpt: none,
      }

      const rightItem: PairItem = {
        id: {
          pairId: 0,
          position: 'right',
        },
        vlSpec: right,
        solutionOpt: none,
      }

      return {
        id: 0,
        title: '',
        left: leftItem,
        right: rightItem,
        comp: '<',
      } as Pair;
    });

    this.props.addPairsToCollection(pairs);
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
    pairs: {
      pairs: state.editor.pairs.pairs,
    },
    currentEditor: state.editor.type,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    addPairsToCollection: (pairs: Pair[]) => {
      dispatch(addPairs(pairs));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
