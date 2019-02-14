import { createAction } from 'typesafe-actions';
import { EditorType } from '../reducers/tuner';

export const updateEditorCode = createAction('tuner/UPDATE_EDITOR_CODE', (resolve) => {
  return (code: string) => {
    return resolve(code);
  };
});

export const setDraco = createAction('tuner/SET_DRACO', (resolve) => {
  return (dracoStringified: string) => {
    return resolve(dracoStringified);
  }
});

export const switchEditor = createAction('tuner/SWITCH_EDITOR', (resolve) => {
  return (editor: EditorType) => resolve(editor);
});
