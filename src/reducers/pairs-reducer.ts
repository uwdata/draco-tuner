import { createReducer } from 'redux-starter-kit';
import { TopLevelUnitSpec } from 'vega-lite/build/src/spec/unit';

const initialState: Pair[] = [
  {
    id: 1,
    comp: '<',
    left: {
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'bar',
        encoding: {
          x: {
            bin: true,
            field: 'horsepower',
            type: 'quantitative',
          },
          y: {
            aggregate: 'count',
            type: 'quantitative',
          },
        },
      },
    },
    right: {
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'bar',
        encoding: {
          y: {
            bin: true,
            field: 'horsepower',
            type: 'quantitative',
          },
          x: {
            aggregate: 'count',
            type: 'quantitative',
          },
        },
      },
    },
  },
  {
    id: 2,
    comp: '<',
    left: {
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'bar',
        encoding: {
          y: {
            field: 'cylinders',
            type: 'ordinal',
          },
          x: {
            field: 'horsepower',
            type: 'quantitative',
            aggregate: 'mean',
          },
        },
      },
    },
    right: {
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'bar',
        encoding: {
          x: {
            field: 'cylinders',
            type: 'ordinal',
          },
          y: {
            field: 'horsepower',
            type: 'quantitative',
            aggregate: 'mean',
          },
        },
      },
    },
  },
];


const pairsReducer = createReducer(initialState, {

});

export default pairsReducer;

export interface Pair {
  id: number;
  comp: string;
  left: PairItem;
  right: PairItem;
}

export interface PairItem {
  vlSpec: TopLevelUnitSpec;
}
