import { createAction } from 'typesafe-actions';

export const downloadFiles = createAction('app-actions/DOWNLOAD_FILES', action => () => action());
export const addCheckpoint = createAction('app-actions/ADD_CHECKPOINT', action => {
  return () => action();
});
export const updateStatus = createAction('app-actions/UPDATE_STATUS', action => {
  return () => action();
});
