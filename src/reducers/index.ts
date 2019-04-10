import _ from 'lodash';
import reduceReducers from 'reduce-reducers';
import { combineReducers, Reducer } from 'redux';
import { getType, StateType } from 'typesafe-actions';
import { pairCollectionActions, RootAction } from '../actions/index';
import dracoReducer from './draco-reducer';
import pairCollectionReducer from './pair-collection-reducer';

const combinedReducers = combineReducers({
  pairCollection: pairCollectionReducer,
  draco: dracoReducer,
});

type CombinedState = StateType<typeof combinedReducers>;

const crossSliceReducer = (state: CombinedState, action: RootAction) => {
  switch (action.type) {
    case getType(pairCollectionActions.setPairs):
      const finishedRunIds = _.clone(state.draco.finishedRunIds);
      finishedRunIds.add(action.payload.runId);
      const draco = {
        ...state.draco,
        finishedRunIds,
      };

      return {
        ...state,
        draco,
      };
    default:
      return state;
  }
};

export const rootReducer = reduceReducers(combinedReducers, crossSliceReducer as Reducer);

export type RootState = CombinedState;
