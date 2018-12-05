
import { CollectionAction } from '../actions';

export interface CollectionState {
  pairs: PairCollection;
}

export interface PairCollection {
  [index: number]: Pair;
}

export interface Pair {
  title: string;
}

const initialState = {
  pairs: [
    {
      title: 'hello',
    },
  ],
};

const collection = (state: CollectionState = initialState, action: CollectionAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
