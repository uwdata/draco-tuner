import { SolutionSet } from 'draco-vis';
import { createAction } from 'typesafe-actions';
import { TopLevelSpec } from 'vega-lite';

export const updateDracoEditorCode = createAction('editor/UPDATE_DRACO_CODE', (resolve) => {
  return (code: string) => resolve(code);
});

export const updateVegaLiteEditorCode = createAction('editor/UPDATE_VEGALITE_CODE', (resolve) => {
  return (code: string) => resolve(code);
});

export const updateVegaLiteSpec = createAction('editor/UPDATE_VEGALITE_SPEC', (resolve) => {
  return () => resolve();
});

export const updatePairsEditorCode = createAction('editor/UPDATE_PAIRS_CODE', (resolve) => {
  return (code: string) => resolve(code);
});

export type EditorType = 'draco' | 'vega-lite' | 'pairs';
export const switchEditor = createAction('editor/SWITCH_EDITOR', (resolve) => {
  return (editorType: EditorType) => resolve(editorType);
});

export const setEditorDracoSolutionSet =
  createAction('draco/SET_EDITOR_SOLUTION_SET', (resolve) => {
    return (sol: SolutionSet) => resolve(sol);
  });

export const setInfoPaneDracoSolutionSet =
  createAction('draco/SET_INFO_PANE_SOLUTION_SET', (resolve) => {
    return (sol: SolutionSet) => resolve(sol);
  });

export const setInfoPaneAsp = createAction('editor/SET_INFO_PANE_ASP', (resolve) => {
  return (code: string) => resolve(code);
});

export const showInfoPane = createAction('editor/SHOW_INFO_PANE', (resolve) => {
  return (show: boolean) => resolve(show);
});

export const setInfoPaneVegalite = createAction('editor/SET_INFO_PANE_VEGALITE', (resolve) => {
  return (spec: TopLevelSpec) => resolve(spec);
});

export const updateEditorPairs = createAction('editor/UPDATE_EDITOR_PAIRS', (resolve) => {
  return (pairs: any[]) => resolve(pairs);
});
