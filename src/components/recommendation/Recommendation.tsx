import classnames from 'classnames';
import { SolutionSet } from 'draco-vis';
import * as React from 'react';
import { Option } from 'ts-option';
import { TopLevelSpec } from 'vega-lite';
import VegaLiteChart from '../vega-lite-chart/VegaLiteChart'; // tslint:disable-line
import './recommendation.css';

interface PassedProps {
  solutionSetOpt: Option<SolutionSet>;
  width: number;
  height: number;
}
interface StateProps {}
interface DispatchProps {}

interface RecommendationProps extends PassedProps, StateProps, DispatchProps {}

interface State {
  collapsed: boolean;
  dragging: boolean;
  x: number;
  y: number;
}

class Recommendation extends React.Component<RecommendationProps, State> {
  container: HTMLElement;

  constructor(props: RecommendationProps) {
    super(props);

    this.state = {
      collapsed: false,
      dragging: false,
      x: 0,
      y: 0,
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragStop = this.handleDragStop.bind(this);
  }

  render() {
    const styles = classnames({
      recommendation: true,
      collapsed: this.state.collapsed,
      dragging: this.state.dragging,
    });

    return (
      // <Draggable
      //   onStart={this.handleDragStart}
      //   onDrag={this.handleDrag}
      //   onStop={this.handleDragStop}
      //   position={
      //     { x: this.state.x, y: this.state.y }}
      // >
        <div
          styleName={styles}
          style={{ height: this.props.height }}
          ref={ el => this.container = el }
        >
          <div
            styleName="main-vis"
            style={{ width: this.props.height, height: this.props.height }}
          >
            {
              this.props.solutionSetOpt
                .map(solutionSet => {
                  return <VegaLiteChart
                    vlSpec={solutionSet.specs[0]}
                    renderer="canvas"
                    actions={false}
                  />
                }
                )
                .orNull
            }
          </div>
          <div
            styleName="other-vis"
            style={{ width: this.props.width - this.props.height, height: this.props.height }}
          >
            {
              this.props.solutionSetOpt
                .map(_ =>
                  _.specs.slice(1)
                    .map((vlSpec: TopLevelSpec, i: number) => {
                      return (
                        <div
                          styleName="vis"
                          key={i}
                          style={{
                            width: this.props.width - this.props.height - 32,
                            height: this.props.width - this.props.height - 32,
                          }}
                        >
                          <VegaLiteChart
                            vlSpec={vlSpec}
                            renderer="canvas"
                            actions={false}
                          />
                        </div>
                      );
                    })
                )
                .orNull
            }
          </div>
        </div>
      // </Draggable>
    );
  }

  handleDragStart(e: any) {
    const { x, y } = this.getCoordinates(e);

    this.setState({
      x,
      y,
      collapsed: true,
    });
  }

  handleDrag(e: any) {
    const { x, y } = this.getCoordinates(e);

    this.setState({
      x,
      y,
      collapsed: true,
      dragging: true,
    });
  }

  getCoordinates(e: any) {
    const bounding = this.container.getBoundingClientRect();

    const transform = this.container.style.transform;
    const regex = /translate\((-?\d+)px.*(-?\d+)px\)/i;
    const [_, xOffset, yOffset] = regex.exec(transform);

    console.debug(`x offset: ${xOffset}`);
    console.debug(`y offset: ${yOffset}`);
    console.debug(`clientX: ${e.clientX}`);
    console.debug(`clientY: ${e.clientY}`);
    console.debug(`boundingLeft: ${bounding.left}`);
    console.debug(`boundingTop: ${bounding.top}`);

    const x = e.clientX - bounding.left + parseInt(xOffset, 10) - 32;
    const y = e.clientY - bounding.top + parseInt(yOffset, 10) - 32;

    return { x, y };
  }

  handleDragStop() {
    this.container.style.transform = 'translate(0,0)';
    this.setState({
      dragging: false,
      collapsed: false,
      x: 0,
      y: 0,
    });
  }
}

export default Recommendation;
