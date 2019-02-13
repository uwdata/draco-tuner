import Draco, { Options } from 'draco-vis'; // tslint:disable-line
import { getType } from 'typesafe-actions';
import { vega } from 'vega-embed';
import { dracoActions } from '../actions';
import { DracoWorkerEvent } from './worker-actions';

const cars = require('../data/cars.json');
const barley = require('../data/barley.json');

export const datasets = {
  'cars.json': cars,
  'barley.json': barley,
};

const ctx: Worker = self as any;

const dracoOptions: Options = {
  models: 7,
};

const draco = new Draco('static', (status) => {});
let prevProgram = '';
let dataInfo = {
  url: null,
  data: null,
};

const loader = vega.loader();
const originalHttp = loader.http;
loader.http = (url, options) => {
  console.debug('Request for', url);

  if (url in datasets) {
    // @ts-ignore
    return datasets[url];
  }
  return originalHttp.bind(loader)(url, options);
};

ctx.onmessage = ({ data: action }: DracoWorkerEvent) => {
  switch (action.type) {
    case getType(dracoActions.runDraco):
      if (!draco.initialized) {
        draco.init().then(() => {
          solveFunction(action.payload.code, action.payload.destActionType, draco, action.payload.opt)
        });
      } else {
        solveFunction(action.payload.code, action.payload.destActionType, draco, action.payload.opt);
      }
      break;
    case getType(dracoActions.updateDracoAsp):
      draco.updateAsp(action.payload.aspSet);
      break;
    case getType(dracoActions.getConstraintSet):
      ctx.postMessage({
        type: action.payload.destActionType,
        payload: draco.getConstraintSet()
      });
      break;
    default:
  }
};

const solveFunction = (program: string, destActionType: string, draco: Draco, opt?: any) => {
  const nonCommentLines = getNonCommentLines(program);
  const cleaned = nonCommentLines.join('\n');
  if (cleaned !== prevProgram) {
    prevProgram = cleaned;

    if (isValidAsp(nonCommentLines)) {
      const dataUrl = getDataUrl(nonCommentLines);

      if (dataInfo.url === dataUrl && dataInfo.data) {
        getSolutionAndSend(cleaned, dracoOptions, destActionType, draco, opt);
      } else {
        loader
          .load(dataUrl)
          .then((data: any) => {
            dataInfo = {
              data,
              url: dataUrl,
            };

            draco.prepareData(data);

            getSolutionAndSend(cleaned, dracoOptions, destActionType, draco, opt);
          });
      }
    }
  }
};

const getSolutionAndSend = (program, options, destActionType, draco: Draco, opt?: any) => {
  const solution = draco.solve(program, options);
  console.debug(`worker posting to: ${destActionType}`);

  if (opt) {
    ctx.postMessage({
      type: destActionType,
      payload: {
        ...opt,
        solution,
      },
    });
  } else {
    ctx.postMessage({
      type: destActionType,
      payload: solution,
    });
  }

};

const MATCH_NONCOMMENT = /^[^%\n]+/gm;
const MATCH_RULE = /^.*\(.*\)\./;
const MATCH_DATA = /data\(\"(.*)\"\)/;

const getNonCommentLines = (code: string): string[] => {
  const nonCommentLines = code.match(MATCH_NONCOMMENT);

  return nonCommentLines.map(line => line.trim());
};

const isValidAsp = (lines: string[]): boolean => {
  const valid =
    lines
      .map((line) => {
        const match = line.match(MATCH_RULE);
        const valid = match !== null;
        if (!valid) {
          console.debug(`${line} is not valid`);
        }
        return valid;
      })
      .reduce((prev, curr) => {
        return prev && curr;
      });
  return valid;
};

const getDataUrl = (lines: string[]): string | null => {
  const dataUrls =
    lines
      .map((line) => {
        const match = line.match(MATCH_DATA);
        if (match !== null) {
          return match[1];
        }
        return null;
      })
      .filter((dataUrl) => {
        return !!dataUrl;
      });

  if (dataUrls.length > 1) {
    throw Error('More than one data source specified');
  }

  if (dataUrls.length === 0) {
    throw Error('No data source specified');
  }

  return dataUrls[0];
};
