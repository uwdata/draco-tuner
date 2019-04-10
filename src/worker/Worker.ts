import Draco, { Options } from 'draco-vis'; // tslint:disable-line
import { getType } from 'typesafe-actions';
import { DracoWorkerAction, dracoWorkerActions, pairCollectionActions } from '../actions';
import { Spec, SpecDictionary } from '../model';
import { DracoWorkerEvent } from './worker-event';

const ctx: Worker = self as any;

const data = require('../data/cars.json');

const dracoOptions: Options = {
  models: 7,
};

const draco = new Draco('static', status => console.debug);

ctx.onmessage = ({ data: action }: DracoWorkerEvent) => {
  if (!draco.initialized) {
    draco.init().then(() => handleAction(action));
    draco.prepareData(data);
  } else {
    handleAction(action);
  }
};

function handleAction(action: DracoWorkerAction) {
  switch (action.type) {
    case getType(dracoWorkerActions.reloadPairsBegin):
    case getType(dracoWorkerActions.solvePairsBegin):
      {
        const solvedSpecDict = solveSpecs(action.payload.specDict);
        ctx.postMessage({
          type: getType(pairCollectionActions.setPairs),
          payload: {
            specDict: solvedSpecDict,
            runId: action.payload.runId,
          },
        });
      }
      break;
    default:
  }
}

function solveSpecs(specDict: SpecDictionary): SpecDictionary {
  const result: SpecDictionary = {};
  for (const id of Object.keys(specDict)) {
    const spec = specDict[id];
    const newOptions = { ...dracoOptions, models: 1, weights: [{ name: 'max_extra_encs', value: 0 }] };
    const solvedSpec = Spec.dracoSolve(spec, draco, newOptions);
    result[id] = solvedSpec;
  }

  return result;
}
