import { ActionType } from 'typesafe-actions';
import * as collectionActions from './collection-actions';
import * as dracoActions from './draco-actions';
import * as editorActions from './editor-actions';
import * as tunerActions from './tuner-actions';

export { editorActions };
export { dracoActions };
export { collectionActions };
export { tunerActions };

export type EditorAction = ActionType<typeof editorActions>;
export type DracoAction = ActionType<typeof dracoActions>;
export type CollectionAction = ActionType<typeof collectionActions>;
export type TunerAction = ActionType<typeof tunerActions>;

export type RootAction = EditorAction | DracoAction | CollectionAction | TunerAction;
