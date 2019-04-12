import { PairEvalMapObject } from './pair-eval-map';

export interface CheckpointMapObject {
  [id: string]: CheckpointObject;
}

export interface CheckpointObject {
  pairEvalMap: PairEvalMapObject;
}

export class CheckpointMap {}
