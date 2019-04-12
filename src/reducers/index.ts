import { json2constraints } from 'draco-vis';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import _ from 'lodash';
import reduceReducers from 'reduce-reducers';
import { combineReducers, Reducer } from 'redux';
import { getType, StateType } from 'typesafe-actions';
import { AppAction, appActions, pairCollectionActions, RootAction } from '../actions/index';
import { ConstraintMap } from '../model/index';
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

    case getType(appActions.downloadFiles):
      return downloadFiles(state, action);
    default:
      return state;
  }
};

export const rootReducer = reduceReducers(combinedReducers, crossSliceReducer as Reducer);

export type RootState = CombinedState;

function downloadFiles(state: CombinedState, action: AppAction) {
  const zip = new JSZip();

  const aspFolder = zip.folder('asp');
  const constraintSet = ConstraintMap.toConstraintSet(state.draco.constraintMap);
  const softAspSet = json2constraints(constraintSet.soft);
  const hardAspSet = json2constraints(constraintSet.hard);

  aspFolder.file('soft.lp', softAspSet.definitions);
  aspFolder.file('assign_weights.lp', softAspSet.assigns);
  aspFolder.file('weights.lp', softAspSet.weights);
  aspFolder.file('hard.lp', hardAspSet.definitions);

  const pairs = JSON.stringify(state.pairCollection.pairs);
  zip.file('pairs.json', pairs);
  zip.generateAsync({ type: 'blob' }).then(content => saveAs(content, 'draco.zip'));

  return state;
}
