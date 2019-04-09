import { ActionType } from 'typesafe-actions';
import * as tunerActions from './tuner-actions';

export type RootAction = ActionType<typeof tunerActions>;
