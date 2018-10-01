import Draco from 'draco-vis';  // tslint:disable-line
import { RUN_DRACO } from '../actions';

const INITIAL_STATE = new Draco('static', (status: string) => { console.log(status); });
INITIAL_STATE.init();

const draco = (state: any = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case RUN_DRACO:
      const result = state.solve(action.code);
      console.log(result);
      return state;
    default:
      return state;
  }
};

export default draco;
