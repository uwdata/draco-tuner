import { ActionType, getType } from 'typesafe-actions';

import * as editorActions from './editor-actions';
import * as dracoActions from './draco-actions';

export { editorActions };
export type EditorAction = ActionType<typeof editorActions>;

export { dracoActions };
export type DracoAction = ActionType<typeof dracoActions>;
