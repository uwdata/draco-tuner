import Draco, { Options } from 'draco-vis'; // tslint:disable-line
import { getType } from 'typesafe-actions';
import { editorActions } from '../actions';
import { setDracoSolutionSet } from '../actions/editor-actions';
import { DracoWorkerEvent } from './worker-actions';

const ctx: Worker = self as any;

const dracoOptions: Options = {
  models: 7,
};

const draco = new Draco('static', (status) => {});
let prevProgram = '';

ctx.onmessage = ({ data: action }: DracoWorkerEvent) => {
  switch (action.type) {
    case getType(editorActions.updateDracoSolutionSet):
      const solveFunction = (program: string) => {
        const trimmed = program.trim();
        if (trimmed !== prevProgram) {
          prevProgram = trimmed;

          const solution = draco.solve(program, dracoOptions);
          ctx.postMessage({
            type: getType(setDracoSolutionSet),
            payload: solution,
          });
        }
      };

      if (!draco.initialized) {
        draco.init().then(() => solveFunction(action.payload));
      } else {
        solveFunction(action.payload);
      }
      break;
    default:
  }
};
