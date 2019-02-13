
import { ConstraintSet, SolutionSet } from 'draco-vis';
import { none, Option, option, some } from 'ts-option';
import { getType } from 'typesafe-actions';
import { TopLevelFacetedUnitSpec } from 'vega-lite/build/src/spec';
import { CollectionAction, collectionActions } from '../actions';

export interface CollectionState {
  dracoConstraintSetOpt: Option<ConstraintSet>;
  pairs: Pair[];
}

export interface PairItemId {
  pairId: number;
  position: 'left' | 'right';
}

export interface PairItem {
  id: PairItemId;
  vlSpec: TopLevelFacetedUnitSpec;
  solutionOpt: Option<SolutionSet>;
}

export interface Pair {
  id: number;
  title: string;
  left: PairItem;
  right: PairItem;
  comp: '<' | '=';
}

const collection = (state: CollectionState = initialState, action: CollectionAction) => {
  switch (action.type) {
    case getType(collectionActions.updatePairItem):
      return updatePairItem(state, action.payload);
    case getType(collectionActions.setDracoConstraintSet):
      return setDracoConstraintSet(state, action.payload);
    case getType(collectionActions.saveCollection):
      return saveCollection(state);
    case getType(collectionActions.loadCollection):
      return loadCollection(state);
    case getType(collectionActions.addPairs):
      return addPairs(state, action.payload);
    default:
      return state;
  }
};

export default collection;

const setDracoConstraintSet = (state: CollectionState, constraintSet: ConstraintSet) => {
  return {
    ...state,
    dracoConstraintSetOpt: some(constraintSet),
  };
}

const saveCollection = (state: CollectionState) => {
  const storage = window.localStorage;
  const stringifiedState = JSON.stringify(state, (key, value) => {
    if (key === 'solutionOpt') {
      return value.orNull;
    } else if (key === 'dracoConstraintSetOpt') {
      return null;
    }
    return value;
  });
  storage.setItem('draco_tuner/collection', stringifiedState);
  return state;
}

const loadCollection = (state: CollectionState) => {
  const storage = window.localStorage;
  const savedState = storage.getItem('draco_tuner/collection');
  const parsedState = JSON.parse(savedState, (key, value) => {
    if (key === 'solutionOpt') {
      return option(value);
    } else if (key === 'dracoConstraintSetOpt') {
      return option(value);
    }
    return value;
  });
  return parsedState;
}

const addPairs = (state: CollectionState, pairs: Pair[]) => {
  const nextId = state.pairs.length;

  pairs.forEach((pair, i) => {
    pair.id = i + nextId;
    pair.left.id.pairId = i + nextId;
    pair.right.id.pairId = i + nextId;
  });

  const newPairs = state.pairs.concat(pairs);
  return {
    ...state,
    pairs: newPairs
  }
}

export interface PairItemFromWorker extends PairItem {
  solution: SolutionSet;
}

const updatePairItem = (state: CollectionState, pairItem: PairItemFromWorker) => {
  pairItem = {
    ...pairItem,
    solutionOpt: some(pairItem.solution),
  };

  delete pairItem.solution;

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
    left: { solutionOpt: none,
      id: {
        pairId: 0,
        position: 'left' as 'left',
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
      } as TopLevelFacetedUnitSpec,
    },
    right: { solutionOpt: none,
      id: {
        pairId: 0,
        position: 'right' as 'right',
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
      } as TopLevelFacetedUnitSpec,
    },
  },
];

const Q_O: Pair[] = [
  {
    id: 1,
    title: 'hello',
    comp: '<',
    left: { solutionOpt: none,
      id: {
        pairId: 1,
        position: 'left' as 'left',
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
      } as TopLevelFacetedUnitSpec,
    },
    right: { solutionOpt: none,
      id: {
        pairId: 1,
        position: 'right' as 'right',
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
      } as TopLevelFacetedUnitSpec,
    },
  },
  {
    id: 2,
    title: 'hello',
    comp: '<',
    left: { solutionOpt: none,
      id: {
        pairId: 2,
        position: 'left' as 'left',
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
      } as TopLevelFacetedUnitSpec,
    },
    right: { solutionOpt: none,
      id: {
        pairId: 2,
        position: 'right' as 'right',
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
      } as TopLevelFacetedUnitSpec,
    },
  },
];

const Q_N: Pair[] = [
  {
    id: 0,
    title: 'hello',
    comp: '<',
    left: { solutionOpt: none,
      id: {
        pairId: 0,
        position: 'left' as 'left',
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
      } as TopLevelFacetedUnitSpec,
    },
    right: { solutionOpt: none,
      id: {
        pairId: 0,
        position: 'right' as 'right',
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
      } as TopLevelFacetedUnitSpec,
    },
  },
];

const O_O: Pair[] = [
  {
    id: 0,
    title: 'hello',
    comp: '<',
    left: { solutionOpt: none,
      id: {
        pairId: 0,
        position: 'left' as 'left',
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
      } as TopLevelFacetedUnitSpec,
    },
    right: { solutionOpt: none,
      id: {
        pairId: 0,
        position: 'right' as 'right',
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
      } as TopLevelFacetedUnitSpec,
    },
  },
];

const O_N: Pair[] = [
  {
    id: 0,
    title: 'hello',
    comp: '=',
    left: { solutionOpt: none,
      id: {
        pairId: 0,
        position: 'left' as 'left',
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
      } as TopLevelFacetedUnitSpec,
    },
    right: { solutionOpt: none,
      id: {
        pairId: 0,
        position: 'right' as 'right',
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
      } as TopLevelFacetedUnitSpec,
    },
  },
];

const N_N: Pair[] = [
  {
    id: 0,
    title: 'hello',
    comp: '<',
    left: { solutionOpt: none,
      id: {
        pairId: 0,
        position: 'left' as 'left',
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
      } as TopLevelFacetedUnitSpec,
    },
    right: { solutionOpt: none,
      id: {
        pairId: 0,
        position: 'right' as 'right',
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
      } as TopLevelFacetedUnitSpec,
    },
  },
];

const X_Y: CollectionState = {
  dracoConstraintSetOpt: none,
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
