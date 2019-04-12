import { ActionType } from 'typesafe-actions';
import * as appActions from './app-actions';
import * as dracoActions from './draco-actions';
import * as dracoWorkerActions from './draco-worker-actions';
import * as pairCollectionActions from './pair-collection-actions';
import * as tunerActions from './tuner-actions';

export { pairCollectionActions };
export { tunerActions };
export { dracoWorkerActions };
export { dracoActions };
export { appActions };

export type TunerAction = ActionType<typeof tunerActions>;
export type PairCollectionAction = ActionType<typeof pairCollectionActions>;
export type DracoWorkerAction = ActionType<typeof dracoWorkerActions>;
export type DracoAction = ActionType<typeof dracoActions>;
export type AppAction = ActionType<typeof appActions>;

export type RootAction = TunerAction | PairCollectionAction | DracoWorkerAction | DracoAction | AppAction;
