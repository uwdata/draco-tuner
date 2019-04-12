import { createAction } from 'typesafe-actions';

export const downloadFiles = createAction('app-actions/DOWNLOAD_FILES', action => () => action());
