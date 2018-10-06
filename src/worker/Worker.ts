import Draco, { Options } from 'draco-vis'; // tslint:disable-line
import { DracoWorkerEvent } from './worker-actions';

const ctx: Worker = self as any;

const dracoOptions: Options = {
  models: 7,
};

const draco = new Draco('static', (status) => {});

ctx.onmessage = (e: DracoWorkerEvent) => {
  switch (e.data.type) {
    case 'solve':
      const solveFunction = (program: string) => {
        const solution = draco.solve(program, dracoOptions);
        ctx.postMessage({ type: 'solve', response: solution });
      };

      if (!draco.initialized) {
        draco.init().then(() => solveFunction(e.data.payload));
      } else {
        solveFunction(e.data.payload);
      }
      break;
    default:
  }
};
