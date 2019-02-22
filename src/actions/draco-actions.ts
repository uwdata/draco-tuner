import { ConstraintSet } from 'draco-vis';
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

export const getConstraintSet = createAction('draco/GET_CONSTRAINT_SET', (resolve) => {
  return (destActionType: string) => {
    return resolve({ destActionType }, { WebWorker: true });
  }
});

export const setConstraintSet = createAction('draco/SET_CONSTRAINT_SET', resolve => {
  return (constraintSet: ConstraintSet) => resolve({ constraintSet }, { WebWorker: true });
});

export const toggleHardConstraints = createAction('draco/TOGGLE_HARD_CONSTRAINTS', resolve => {
  return (off: boolean) => resolve({ off }, { WebWorker: true });
});
