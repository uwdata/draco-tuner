import _ from 'lodash';
import { PairsDictionary } from '../reducers/pair-collection-reducer';
import { ChartDictionary } from './chart';
import { PairObject } from './pair';
import { SpecObject } from './spec';

export interface SpecDictionaryObject {
  [id: string]: SpecObject;
}

export class SpecDictionary {
  static fromCharts = (chartDict: ChartDictionary): SpecDictionaryObject => {
    const specDict: SpecDictionaryObject = {};
    for (const id of Object.keys(chartDict)) {
      const chart = chartDict[id];
      specDict[id] = chart;
    }

    return specDict;
  };

  static toChartDictionary = (specDict: SpecDictionaryObject, chartDict: ChartDictionary): ChartDictionary => {
    const result = _.clone(chartDict);
    for (const id of Object.keys(specDict)) {
      const spec = specDict[id];

      result[id] = {
        ...result[id],
        ...spec,
      };
    }

    return result;
  };

  static fromPairsDictionary = (pairsDict: PairsDictionary): SpecDictionaryObject => {
    const specDict: SpecDictionaryObject = {};
    for (const id of Object.keys(pairsDict)) {
      const pair = pairsDict[id];

      specDict[`${id}.left`] = pair.left;
      specDict[`${id}.right`] = pair.right;
    }

    return specDict;
  };

  static toPairsDictionary = (specDict: SpecDictionaryObject, pairsDict: PairsDictionary): PairsDictionary => {
    const result = _.clone(pairsDict);
    for (const path of Object.keys(specDict)) {
      const spec = specDict[path];
      setPath(result, path, spec);
    }

    return result;
  };

  static fromPairs = (pairs: PairObject[]): SpecDictionaryObject => {
    const specDict: SpecDictionaryObject = {};
    for (const pair of pairs) {
      specDict[`${pair.id}.left`] = pair.left;
      specDict[`${pair.id}.right`] = pair.right;
    }

    return specDict;
  };
}

function setPath(obj: any, path: string, val: any): void {
  const pathTokens = path.split('.');

  let curr = obj;
  for (let i = 0; i < pathTokens.length - 1; i += 1) {
    curr = obj[pathTokens[i]];
  }

  curr[pathTokens[pathTokens.length - 1]] = val;
}
