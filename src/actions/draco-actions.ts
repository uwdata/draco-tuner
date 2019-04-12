import { createAction } from 'typesafe-actions';
import { ConstraintEditObject, ConstraintMapObject } from '../model';

export const setConstraintMap = createAction('draco/SET_CONSTRAINT_MAP', action => {
  return (constraintMap: ConstraintMapObject) => action(constraintMap);
});

export const addConstraintEdit = createAction('draco/ADD_CONSTRAINT_EDIT', action => {
  return (constraintEdit: ConstraintEditObject) => action(constraintEdit);
});

export const revertToEdit = createAction('draco/REVERT_TO_EDIT', action => {
  return (editIndex: number) => action(editIndex);
});

export const deleteCurrentEdit = createAction('draco/DELETE_CURRENT_EDIT', action => {
  return () => action();
});

export const moveEditIndex = createAction('draco/MOVE_EDIT_INDEX', action => {
  return (moveBy: number) => action(moveBy);
});
