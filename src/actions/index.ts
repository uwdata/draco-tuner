import { ActionType } from 'typesafe-actions';
import * as dracoActions from './draco-actions';
import * as editorActions from './editor-actions';

export { editorActions };
export { dracoActions };

export type EditorAction = ActionType<typeof editorActions>;

export type DracoAction = ActionType<typeof dracoActions>;

export type RootAction =
  EditorAction |
  DracoAction;
