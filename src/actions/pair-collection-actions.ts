import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { createAction } from 'typesafe-actions';
import { SpecDictionaryObject } from '../model';
import { RootState } from '../reducers';
import { reloadPairsBegin } from './draco-worker-actions';

export const reloadPairsThunk = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => RootState) => {
    const pairs = getState().pairCollection.pairs;
    dispatch(reloadPairsBegin(pairs));
  };
};

export const reloadPairsEnd = createAction('pairs-collection/RELOAD_PAIRS_END', action => {
  return (specDict: SpecDictionaryObject) => action(specDict);
})
