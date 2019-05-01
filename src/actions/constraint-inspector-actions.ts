import { createAction } from 'typesafe-actions';

export const setAspClause = createAction('constraint-tuner/SET_ASP_CLAUSE', action => {
  return (code: string, id: string) => action({ code, id });
});

export const addAspClause = createAction('constraint-tuner/ADD_ASP_CLAUSE', action => {
  return () => action();
});
