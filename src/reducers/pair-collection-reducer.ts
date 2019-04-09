import { getType } from "typesafe-actions";
import { PairCollectionAction, pairCollectionActions } from '../actions';
import { SpecDictionary, SpecObject } from '../model';

export type PairsDictionary = { [id: string]: Pair };

export interface PairCollectionStore {
  pairs: PairsDictionary;
}
const initialState: PairCollectionStore = {
  pairs: {
    '0': {
      id: 0,
      comp: '<',
      left: {
        vlSpec: {
          data: { url: 'cars.json' },
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
          data: { url: 'cars.json' },
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
    '1': {
      id: 1,
      comp: '<',
      left: {
        vlSpec: {
          data: { url: 'cars.json' },
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
          data: { url: 'cars.json' },
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
  },
};

// @ts-ignore
const pairsCollectionReducer = (state: PairCollectionStore = initialState, action: PairCollectionAction) => {
  switch (action.type) {
    case getType(pairCollectionActions.reloadPairsEnd):
      return reloadPairsEnd(state, action);
    default:
      return state;
  }
}

export default pairsCollectionReducer;

function reloadPairsEnd(state: PairCollectionStore, action: PairCollectionAction) {
  const specDict = action.payload;
  const pairsDictionary = SpecDictionary.toPairsDictionary(specDict, state.pairs);
  
  return {
    ...state,
    pairs: pairsDictionary
  };
}

export interface Pair {
  id: number;
  comp: string;
  left: SpecObject;
  right: SpecObject;
}
