import { createAction } from 'typesafe-actions';

export const runDraco = createAction('editor/RUN_DRACO', (resolve) => {
  return (code: string, destActionType: string, opt?: any) => {
    return resolve({ code, destActionType, opt }, { WebWorker: true });
  };
});

export const updateDracoSolutionSet = createAction('draco/UPDATE_DRACO_SOLUTION_SET', (resolve) => {
  return (code: string) => resolve({ code }, { WebWorker: true });
});

export const updateDracoAsp = createAction('draco/UPDATE_DRACO_ASP', (resolve) => {
  return (aspSet: any) => resolve({ aspSet }, { WebWorker: true });
});
