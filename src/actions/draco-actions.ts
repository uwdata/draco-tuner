import { createAction } from "typesafe-actions";
import { ConstraintMapObject } from "../model";

export const setConstraintMap = createAction('draco/SET_CONSTRAINT_MAP', action => {
  return (constraintMap: ConstraintMapObject) => action(constraintMap);
});
