import { ActionType } from 'typesafe-actions';
import * as appActions from './app-actions';
import * as chartCollectionActions from './chart-collection-actions';
import * as constraintInspectorActions from './constraint-inspector-actions';
import * as constraintTunerActions from './constraint-tuner-actions';
import * as dracoActions from './draco-actions';
import * as dracoWorkerActions from './draco-worker-actions';
import * as pairCollectionActions from './pair-collection-actions';
import * as textEditorActions from './text-editor-actions';

export { pairCollectionActions };
export { dracoWorkerActions };
export { dracoActions };
export { appActions };
export { textEditorActions };
export { chartCollectionActions };
export { constraintTunerActions };
export { constraintInspectorActions };

export type PairCollectionAction = ActionType<typeof pairCollectionActions>;
export type DracoWorkerAction = ActionType<typeof dracoWorkerActions>;
export type DracoAction = ActionType<typeof dracoActions>;
export type AppAction = ActionType<typeof appActions>;
export type TextEditorAction = ActionType<typeof textEditorActions>;
export type ChartCollectionAction = ActionType<typeof chartCollectionActions>;
export type ConstraintTunerAction = ActionType<typeof constraintTunerActions>;
export type ConstraintInspectorAction = ActionType<typeof constraintInspectorActions>;

export type RootAction =
  | PairCollectionAction
  | DracoWorkerAction
  | DracoAction
  | AppAction
  | TextEditorAction
  | ChartCollectionAction
  | ConstraintTunerAction
  | ConstraintInspectorAction;
