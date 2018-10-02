import Draco from 'draco-vis';  // tslint:disable-line
import { dracoActions, DracoAction } from '../actions';
import { getType } from 'typesafe-actions';

const INITIAL_STATE = new Draco('static', (status: string) => { console.log(status); });
INITIAL_STATE.init();

export default (state: any = INITIAL_STATE, action: DracoAction) => {
  switch (action.type) {
    case getType(dracoActions.runDraco):
      const result = state.solve(action.payload);
      return {
        ...state,
        solution: result,
      };
    default:
      return state;
  }
};
