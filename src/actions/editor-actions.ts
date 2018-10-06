import { SolutionSet } from 'draco-vis';
import { createAction } from 'typesafe-actions';

export const updateDracoEditorCode = createAction('editor/UPDATE_DRACO_CODE', (resolve) => {
  return (code: string) => resolve(code);
});

export const updateVegaLiteEditorCode = createAction('editor/UPDATE_VEGALITE_CODE', (resolve) => {
  return (code: string) => resolve(code);
});

export const updateVegaLiteSpec = createAction('editor/UPDATE_VEGALITE_SPEC', (resolve) => {
  return () => resolve();
});

export type EditorType = 'draco' | 'vega-lite';
export const switchEditor = createAction('editor/SWITCH_EDITOR', (resolve) => {
  return (editorType: EditorType) => resolve(editorType);
});

export const updateDracoSolutionSet = createAction('draco/UPDATE_DRACO_SOLUTION_SET', (resolve) => {
  return (solution: SolutionSet) => resolve(solution);
});

export const initDraco = createAction('draco/INIT_DRACO', (resolve) => {
  return () => resolve();
});
