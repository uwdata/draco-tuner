import { DracoWorkerAction } from '../actions';

export interface DracoWorkerEvent extends MessageEvent {
  data: DracoWorkerAction;
}
