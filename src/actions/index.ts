export const UPDATE_EDITOR_CODE = 'UPDATE_EDITOR_CODE';
export const RUN_DRACO = 'RUN_DRACO';

export const updateEditorCode = (code: string) => ({
  value: code,
  type: UPDATE_EDITOR_CODE,
});

export const runDraco = (code: string) => ({
  code,
  type: RUN_DRACO,
});
