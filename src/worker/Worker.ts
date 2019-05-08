import Draco, { Options } from 'draco-vis'; // tslint:disable-line
import { getType } from 'typesafe-actions';
import { chartCollectionActions, DracoWorkerAction, dracoWorkerActions, pairCollectionActions } from '../actions';
import { Spec, SpecDictionary } from '../model';
import { DracoWorkerEvent } from './worker-event';

const ctx: Worker = self as any;

const data = require('../data/cars.json');

const dracoOptions: Options = {
  models: 7,
  relaxHard: true,
};

const draco = new Draco('static', status => {});

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
        const solvedSpecDict = solveSpecs(action.payload.specDict, action.payload.aspProgramStrings, true);
        ctx.postMessage({
          type: getType(pairCollectionActions.setPairs),
          payload: {
            specDict: solvedSpecDict,
            runId: action.payload.runId,
          },
        });
      }
      break;
    case getType(dracoWorkerActions.solveChartsBegin):
      {
        const solvedSpecDict = solveSpecs(action.payload.specDict, action.payload.aspProgramStrings, true);
        ctx.postMessage({
          type: getType(chartCollectionActions.setCharts),
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

function solveSpecs(specDict: SpecDictionary, asp: { [s: string]: string }, lock: boolean): SpecDictionary {
  const result: SpecDictionary = {};
  draco.updateAsp(asp);
  for (const id of Object.keys(specDict)) {
    const spec = specDict[id];
    const newOptions = { ...dracoOptions, models: 1, weights: [{ name: 'max_extra_encs', value: 0 }] };
    const solvedSpec = Spec.dracoSolve(spec, draco, lock, newOptions);
    console.debug(solvedSpec);
    result[id] = solvedSpec;
  }

  return result;
}
