import { createAction } from 'typesafe-actions';

export const updateEditorCode = createAction('editor/UPDATE_CODE', (resolve) => {
  return (code: string) => resolve(code);
});
