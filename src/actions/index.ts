export const UPDATE_EDITOR_CODE = 'UPDATE_EDITOR_CODE';

export const updateEditorCode = (code: string) => ({
  value: code,
  type: UPDATE_EDITOR_CODE,
});
