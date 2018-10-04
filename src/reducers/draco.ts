import Draco, { Options, SolutionSet } from 'draco-vis'; // tslint:disable-line
import { getType } from 'typesafe-actions';
import { DracoAction, dracoActions } from '../actions';

export type DracoState = {
  readonly module: Draco | null,
  readonly solutionSet: SolutionSet | null,
};

const initialState: DracoState = {
  module: null,
  solutionSet: null,
};

const options: Options = {
  models: 7,
};

export default (state: DracoState = initialState, action: DracoAction) => {
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
        const solutionSet = state.module.solve(action.payload, options);

        switch (solutionSet) {
          case null:
            return state;
          default:
            return {
              ...state,
              solutionSet,
            };
        }
      }
    default:
      return state;
  }
};
