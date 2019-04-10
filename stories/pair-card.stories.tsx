import { storiesOf } from '@storybook/react';
import React from 'react';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';
import { PairCardContainer } from '../src/components/containers';
import PairCard from '../src/components/presenters/pair-card';
import VegaLiteChart from '../src/components/presenters/vega-lite-chart';
import { withReduxDecorator } from './index.stories';


const spec = {
  "data": { "url": "cars.json" },
  "mark": "point",
  "encoding": {
    "x": {"field": "horsepower", "type": "quantitative"},
    "y": {"field": "acceleration", "type": "quantitative"}
  }
} as TopLevelUnitSpec;

const vector = [].concat(...Array.from({ length: 15 }, () => [-1, 0, 1, 0, 0, 0, 0, -1, 0, 0, 1]));

storiesOf('VegaLiteChart', module)
  .add('default', () => (
    <VegaLiteChart spec={spec}/>
  ));


const left = { vlSpec: spec, cost: 11 };
const right = { vlSpec: spec, cost: 12 };

storiesOf('PairCard/PairCard', module)
  .add('closed', () => {
    return (
      <PairCard pass={true} open={false} comparator="<" left={left} right={right} diffVector={vector} />
    );
  })
  .add('open', () => {
    return (
      <PairCard pass={true} open={true} comparator="<" left={left} right={right} diffVector={vector} />
    );
  })
  .add('no vector', () => {
    return (
      <PairCard pass={false} open={false} comparator="<"/>
    )
  })

storiesOf('PairCard/PairCardContainer', module)
  .addDecorator(withReduxDecorator)
  .add('default', () => <PairCardContainer id="0" open={true}/>)
  
