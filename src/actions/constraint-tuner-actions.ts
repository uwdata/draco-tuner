import { createAction } from 'typesafe-actions';

export const toggleFocusConstraint = createAction('constraint-tuner/TOGGLE_FOCUS_CONSTRAINT', action => {
  return (id: string, on: boolean) => action({ id, on });
});
