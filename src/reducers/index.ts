import reduceReducers from 'reduce-reducers';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { StateType } from 'typesafe-actions';
import dracoReducer from './draco-reducer';
import pairCollectionReducer from './pair-collection-reducer';

const combinedReducers = combineReducers({
  pairCollection: pairCollectionReducer,
  draco: dracoReducer,
});

type CombinedState = StateType<typeof combinedReducers>;

const crossSliceReducer = (state: CombinedState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const rootReducer = reduceReducers(combinedReducers, crossSliceReducer as Reducer);

export type RootState = CombinedState;
