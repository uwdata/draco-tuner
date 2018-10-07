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
        const nonCommentLines = getnonCommentLines(program);
        const cleaned = nonCommentLines.join('\n');
        if (cleaned !== prevProgram) {
          prevProgram = cleaned;

          if (isValidAsp(nonCommentLines)) {
            const solution = draco.solve(cleaned, dracoOptions);
            ctx.postMessage({
              type: getType(setDracoSolutionSet),
              payload: solution,
            });
          }
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

const MATCH_RULE = /^.*\(.*\)\./gm;
const MATCH_NONCOMMENT = /^[^%\n]+/gm;

const isValidAsp = (lines: string[]): boolean => {
  const valid =
    lines
      .map((line) => {
        const match = line.match(MATCH_RULE);
        return match !== null;
      })
      .reduce((prev, curr) => {
        return prev && curr;
      });
  return valid;
};

const getnonCommentLines = (code: string): string[] => {
  const nonCommentLines = code.match(MATCH_NONCOMMENT);

  return nonCommentLines.map(line => line.trim());
};
