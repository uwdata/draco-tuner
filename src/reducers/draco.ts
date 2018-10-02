import Draco from 'draco-vis';  // tslint:disable-line
import { dracoActions, DracoAction } from '../actions';
import { getType } from 'typesafe-actions';

export type DracoState = {
  readonly module?: Draco,
  readonly solution?: any,
};

export default (state: DracoState = {}, action: DracoAction) => {
  switch (action.type) {
    case getType(dracoActions.initDraco):
      const draco = new Draco('static', (status: string) => { console.log(status); });
      draco.init();
      return {
        ...state,
        module: draco,
      };
    case getType(dracoActions.runDraco):
      if (state.module && state.module.initialized) {
        const solution = state.module.solve(action.payload);
        return {
          ...state,
          solution,
        };
      }
    default:
      return state;
  }
};
