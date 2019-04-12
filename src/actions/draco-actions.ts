import { createAction } from 'typesafe-actions';
import { ConstraintMapObject, ConstraintEditObject } from '../model';

export const setConstraintMap = createAction('draco/SET_CONSTRAINT_MAP', action => {
  return (constraintMap: ConstraintMapObject) => action(constraintMap);
});

export const addConstraintEdit = createAction('draco/ADD_CONSTRAINT_EDIT', action => {
  return (constraintEdit: ConstraintEditObject) => action(constraintEdit);
})
