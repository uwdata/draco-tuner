import { createAction } from 'typesafe-actions';
import { AspProgramsType } from '../model/asp-program';
import { EditorType } from '../reducers/text-editor-reducer';

export const setVegaLiteCode = createAction('text-editor/SET_VEGALITE_CODE', action => {
  return (code: string) => action(code);
});

export const setAspCode = createAction('text-editor/SET_ASP_CODE', action => {
  return (code: string, programType: AspProgramsType) => action({ code, programType });
});

export const setEditorType = createAction('text-editor/SET_EDITOR_TYPE', action => {
  return (editorType?: EditorType) => action(editorType);
});

export const setAspEditorProgram = createAction('text-editor/SET_ASP_EDITOR_PROGRAM', action => {
  return (programType: AspProgramsType) => action(programType);
});
