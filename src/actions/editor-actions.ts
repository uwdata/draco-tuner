import { createAction } from 'typesafe-actions';

export const updateDracoEditorCode = createAction('editor/UPDATE_DRACO_CODE', (resolve) => {
  return (code: string) => resolve(code);
});

export type EditorType = 'draco' | 'vega-lite';
export const switchEditor = createAction('editor/SWITCH_EDITOR', (resolve) => {
  return (editorType: EditorType) => resolve(editorType);
});
