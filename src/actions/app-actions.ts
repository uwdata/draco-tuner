import { createAction } from 'typesafe-actions';
import { CollectionType, ViewPosition, ViewType } from '../reducers/app-reducer';

export const downloadFiles = createAction('app/DOWNLOAD_FILES', action => () => action());
export const addCheckpoint = createAction('app/ADD_CHECKPOINT', action => {
  return () => action();
});
export const updateStatus = createAction('app/UPDATE_STATUS', action => {
  return () => action();
});
export const toggleShowEditor = createAction('app/TOGGLE_SHOW_EDITOR', action => {
  return (show: boolean) => action(show);
});
export const toggleShowCollection = createAction('app/TOGGLE_SHOW_COLLECTION', action => {
  return (show: boolean) => action(show);
});
export const setCollectionPane = createAction('app/SET_COLLECTION_PANE', action => {
  return (collectionType: CollectionType) => action(collectionType);
});
export const setViewPane = createAction('app/SET_VIEW_PANE', action => {
  return (position: ViewPosition, view: ViewType) => action({ position, view });
});
