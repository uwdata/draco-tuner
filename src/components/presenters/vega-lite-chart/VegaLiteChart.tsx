import * as React from 'react';
import VegaLite from 'react-vega-lite';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';
import './vega-lite-chart.css';

const cars = require('../../../data/cars.json');
const barley = require('../../../data/barley.json');

export const datasets = {
  'cars.json': cars,
  'barley.json': barley,
};

interface PassedProps {
  spec: TopLevelUnitSpec;
}

interface Props extends PassedProps {}

interface State {}

/**
 * A Visualization component accepts a `vlSpec` as a prop
 * and renders the resulting chart.
 */
class VegaLiteChart extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let data;
    // @ts-ignore
    if (this.props.spec.data && this.props.spec.data.url) {
      // @ts-ignore
      if (datasets.hasOwnProperty(this.props.spec.data.url)) {
        // @ts-ignore
        data = { values: datasets[this.props.spec.data.url] };
      }
    }

    return (
      <div styleName="vega-lite-chart">
        <VegaLite spec={this.props.spec} data={data} renderer="canvas" style={{ height: '100%', maxWidth: '100%' }} />
      </div>
    );
  }
}

export default VegaLiteChart;
