import { createAction } from 'typesafe-actions';

export const updateEditorCode = createAction('tuner/UPDATE_EDITOR_CODE', (resolve) => {
  return (code: string) => {
    return resolve(code);
  };
});
