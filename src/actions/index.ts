import { ActionType } from 'typesafe-actions';
import * as dracoWorkerActions from './draco-worker-actions';
import * as pairCollectionActions from './pair-collection-actions';
import * as tunerActions from './tuner-actions';

export { pairCollectionActions };
export { tunerActions };
export { dracoWorkerActions };

export type TunerAction = ActionType<typeof tunerActions>;
export type PairCollectionAction = ActionType<typeof pairCollectionActions>;
export type DracoWorkerAction = ActionType<typeof dracoWorkerActions>;

export type RootAction = TunerAction | PairCollectionAction | DracoWorkerAction;
