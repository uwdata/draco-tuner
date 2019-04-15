import { json2constraints } from 'draco-vis';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import _ from 'lodash';
import reduceReducers from 'reduce-reducers';
import { combineReducers, Reducer } from 'redux';
import { createReducer } from 'redux-starter-kit';
import { ActionType, getType, StateType } from 'typesafe-actions';
import { appActions, pairCollectionActions, RootAction } from '../actions/index';
import { ConstraintEdit, ConstraintEditCheckpoint, ConstraintMap, PairEvalMap } from '../model/index';
import dracoReducer from './draco-reducer';
import pairCollectionReducer from './pair-collection-reducer';

const combinedReducers = combineReducers({
  pairCollection: pairCollectionReducer,
  draco: dracoReducer,
});

type CombinedState = StateType<typeof combinedReducers>;

const crossSliceReducer = createReducer<CombinedState, RootAction>(null, {
  [getType(pairCollectionActions.setPairs)]: setPairs,
  [getType(appActions.downloadFiles)]: downloadFiles,
  [getType(appActions.addCheckpoint)]: addCheckpoint,
  [getType(appActions.updateStatus)]: updateStatus,
});

export const rootReducer = reduceReducers(combinedReducers, crossSliceReducer as Reducer);

export type RootState = CombinedState;

function setPairs(state: CombinedState, action: ActionType<typeof pairCollectionActions.setPairs>): void {
  state.draco.finishedRunIds.add(action.payload.runId);
  updateDeltaAndScore(state);
}

function downloadFiles(state: CombinedState, action: ActionType<typeof appActions.downloadFiles>): void {
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
}

function addCheckpoint(state: CombinedState, action: ActionType<typeof appActions.addCheckpoint>): void {
  const checkpointId = state.draco.nextCheckpointId;
  state.draco.nextCheckpointId += 1;

  const pairEvalMap = PairEvalMap.fromPairsDictionary(state.pairCollection.pairs, state.draco.constraintMap);
  state.draco.checkpointMap[checkpointId] = { pairEvalMap };
  const editToAdd: ConstraintEditCheckpoint = {
    type: ConstraintEdit.CHECKPOINT,
    id: checkpointId.toString(),
    delta: state.pairCollection.pairEvalDeltaScore,
  };
  state.draco.edits.splice(0, 0, editToAdd);
  state.pairCollection.currPairEvalMap = pairEvalMap;
}

function updateStatus(state: CombinedState, action: ActionType<typeof appActions.updateStatus>): void {
  updateDeltaAndScore(state);
}

function updateDeltaAndScore(state: CombinedState) {
  const currPairEvalMap = PairEvalMap.fromPairsDictionary(state.pairCollection.pairs, state.draco.constraintMap);
  const currScore = PairEvalMap.toScore(currPairEvalMap);
  state.pairCollection.score = currScore;

  let prevCheckpointId;
  for (let i = state.draco.editIndex; i < state.draco.edits.length; i += 1) {
    const edit = state.draco.edits[i];
    if (ConstraintEdit.isCheckpoint(edit)) {
      prevCheckpointId = edit.id;
      break;
    }
  }

  if (!_.isUndefined(prevCheckpointId)) {
    const prevPairEvalMap = state.draco.checkpointMap[prevCheckpointId].pairEvalMap;
    const prevScore = PairEvalMap.toScore(prevPairEvalMap);
    const deltaMap = PairEvalMap.getPairEvalDeltaMap(prevPairEvalMap, currPairEvalMap);
    const deltaScore = currScore - prevScore;

    state.pairCollection.pairEvalDeltaMap = deltaMap;
    state.pairCollection.pairEvalDeltaScore = deltaScore;
  }
}
