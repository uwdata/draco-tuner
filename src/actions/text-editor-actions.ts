import { createAction } from 'typesafe-actions';

export const setVegaLiteCode = createAction('text-editor/SET_VEGALITE_CODE', action => {
  return (code: string) => action(code);
});
