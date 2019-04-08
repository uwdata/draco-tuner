import { createAction } from "typesafe-actions";

export const updateDracoSolutionSet = createAction('draco/UPDATE_DRACO_SOLUTION_SET', (resolve) => {
  return (code: string) => resolve({ code }, { WebWorker: true });
});
