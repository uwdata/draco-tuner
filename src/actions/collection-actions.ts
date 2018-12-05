import { createAction } from 'typesafe-actions';
import { Pair } from '../reducers/collection';

export const addPair = createAction('collection/ADD_PAIR', (resolve) => {
  return (pair: Pair) => {
    return resolve({ pair });
  };
});
