import { createAction } from 'typesafe-actions';

export const runDraco = createAction('draco/RUN_DRACO', (resolve) => {
  return (code: string) => resolve(code);
});

export const initDraco = createAction('draco/INIT_DRACO', (resolve) => {
  return () => resolve();
});
