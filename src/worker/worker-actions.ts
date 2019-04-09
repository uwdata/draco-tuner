import { DracoAction } from '../actions';

export interface DracoWorkerAction {
  type: string;
  payload: any;
}

export interface DracoWorkerEvent extends MessageEvent {
  data: DracoAction;
}
