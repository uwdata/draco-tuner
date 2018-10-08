import { createAction } from 'typesafe-actions';

export const runDraco = createAction('editor/RUN_DRACO', (resolve) => {
  return (code: string, destActionType: string) => {
    return resolve({ code, destActionType }, { WebWorker: true });
  };
});

export const updateDracoSolutionSet = createAction('draco/UPDATE_DRACO_SOLUTION_SET', (resolve) => {
  return (code: string) => resolve(code, { WebWorker: true });
});
