import { ActionType } from 'typesafe-actions';
import * as editorActions from './editor-actions';

export { editorActions };

export type EditorAction = ActionType<typeof editorActions>;

export type RootAction = EditorAction;
