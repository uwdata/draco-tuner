
import { SolutionSet } from 'draco-vis';
import { getType } from 'typesafe-actions';
import { TopLevelFacetedUnitSpec } from 'vega-lite/build/src/spec';
import { CollectionAction, collectionActions } from '../actions';

export interface CollectionState {
  pairs: Pair[];
}

export interface PairItemId {
  pairId: number;
  position: 'left' | 'right';
}

export interface PairItem {
  id: PairItemId;
  vlSpec: TopLevelFacetedUnitSpec;
  solution?: SolutionSet;
}

export interface Pair {
  id: number;
  title: string;
  left?: PairItem;
  right?: PairItem;
  comp: '<' | '=';
}

const collection = (state: CollectionState = initialState, action: CollectionAction) => {
  switch (action.type) {
    case getType(collectionActions.updatePairItem):
      console.log(action.payload);
      return updatePairItem(state, action.payload);
    default:
      return state;
  }
};

export default collection;

const updatePairItem = (state: CollectionState, pairItem: PairItem) => {
  const pairs =
    state.pairs
      .map((pair: Pair) => {
        if (pair.id === pairItem.id.pairId) {
          if (pairItem.id.position === 'left') {
            return {
              ...pair,
              left: {
                ...pairItem,
              },
            };
          }

          return {
            ...pair,
            right: {
              ...pairItem,
            },
          };
        }

        return {
          ...pair,
        };
      });

  return {
    ...state,
    pairs,
  };
};

const Q_Q: Pair[] = [
  {
    id: 0,
    title: 'hello',
    comp: '=',
    left: {
      id: {
        pairId: 0,
        position: 'left',
      },
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'point',
        encoding: {
          x: {
            field: 'horsepower',
            type: 'quantitative',
          },
          y: {
            field: 'acceleration',
            type: 'quantitative',
          },
        },
      },
    },
    right: {
      id: {
        pairId: 0,
        position: 'right',
      },
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'point',
        encoding: {
          y: {
            field: 'horsepower',
            type: 'quantitative',
          },
          x: {
            field: 'acceleration',
            type: 'quantitative',
          },
        },
      },
    },
  },
];

const Q_O: Pair[] = [
  {
    id: 1,
    title: 'hello',
    comp: '<',
    left: {
      id: {
        pairId: 1,
        position: 'left',
      },
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
      id: {
        pairId: 1,
        position: 'right',
      },
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
    title: 'hello',
    comp: '<',
    left: {
      id: {
        pairId: 2,
        position: 'left',
      },
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
      id: {
        pairId: 2,
        position: 'right',
      },
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

const Q_N: Pair[] = [
  {
    id: 0,
    title: 'hello',
    comp: '<',
    left: {
      id: {
        pairId: 0,
        position: 'left',
      },
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'bar',
        encoding: {
          y: {
            field: 'origin',
            type: 'nominal',
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
      id: {
        pairId: 0,
        position: 'right',
      },
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'bar',
        encoding: {
          x: {
            field: 'origin',
            type: 'nominal',
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

const O_O: Pair[] = [
  {
    id: 0,
    title: 'hello',
    comp: '<',
    left: {
      id: {
        pairId: 0,
        position: 'left',
      },
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'point',
        encoding: {
          y: {
            field: 'cylinders',
            type: 'ordinal',
          },
          x: {
            field: 'horsepower',
            type: 'quantitative',
            bin: true,
          },
          size: {
            type: 'quantitative',
            aggregate: 'count',
          },
        },
      },
    },
    right: {
      id: {
        pairId: 0,
        position: 'right',
      },
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'point',
        encoding: {
          x: {
            field: 'cylinders',
            type: 'ordinal',
          },
          y: {
            field: 'horsepower',
            type: 'quantitative',
            bin: true,
          },
          size: {
            type: 'quantitative',
            aggregate: 'count',
          },
        },
      },
    },
  },
];

const O_N: Pair[] = [
  {
    id: 0,
    title: 'hello',
    comp: '=',
    left: {
      id: {
        pairId: 0,
        position: 'left',
      },
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'point',
        encoding: {
          x: {
            field: 'cylinders',
            type: 'ordinal',
          },
          y: {
            field: 'origin',
            type: 'nominal',
          },
          size: {
            type: 'quantitative',
            aggregate: 'count',
          },
        },
      },
    },
    right: {
      id: {
        pairId: 0,
        position: 'right',
      },
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'point',
        encoding: {
          y: {
            field: 'cylinders',
            type: 'ordinal',
          },
          x: {
            field: 'origin',
            type: 'nominal',
          },
          size: {
            type: 'quantitative',
            aggregate: 'count',
          },
        },
      },
    },
  },
];

const N_N: Pair[] = [
  {
    id: 0,
    title: 'hello',
    comp: '<',
    left: {
      id: {
        pairId: 0,
        position: 'left',
      },
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'point',
        encoding: {
          y: {
            field: 'name',
            type: 'nominal',
          },
          x: {
            field: 'origin',
            type: 'nominal',
          },
        },
      },
    },
    right: {
      id: {
        pairId: 0,
        position: 'right',
      },
      vlSpec: {
        data: { url : 'cars.json' },
        mark: 'point',
        encoding: {
          x: {
            field: 'name',
            type: 'nominal',
          },
          y: {
            field: 'origin',
            type: 'nominal',
          },
        },
      },
    },
  },
];

const X_Y: CollectionState = {
  pairs: [
    ...Q_Q,
    ...Q_O,
    ...Q_N,
    ...O_O,
    ...O_N,
    ...N_N,
  ],
};

const initialState = X_Y;

for (let i = 0; i < initialState.pairs.length; i += 1) {
  initialState.pairs[i].id = i;
  initialState.pairs[i].left.id.pairId = i;
  initialState.pairs[i].right.id.pairId = i;
}
