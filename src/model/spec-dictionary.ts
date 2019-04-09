import _ from 'lodash';
import { PairsDictionary } from "../reducers/pair-collection-reducer";
import { SpecObject } from "./spec";

export interface SpecDictionaryObject {
  [id: string]: SpecObject
}

export class SpecDictionary {
  static fromPairsDictionary = (pairsDict: PairsDictionary): SpecDictionaryObject => {
    const specDict: SpecDictionaryObject = {};
    for (const id of Object.keys(pairsDict)) {
      const pair = pairsDict[id];

      specDict[`${id}.left`] = pair.left;
      specDict[`${id}.right`] = pair.right;
    }

    return specDict;
  }

  static toPairsDictionary = (specDict: SpecDictionaryObject, pairsDict: PairsDictionary): PairsDictionary => {
    const result = _.clone(pairsDict);
    for (const path of Object.keys(specDict)) {
      const spec = specDict[path];
      setPath(result, path, spec);
    }

    return result;
  }
}

function setPath( obj: any, path: string, val: any): void {
  const pathTokens = path.split('.');

  let curr = obj;
  for (let i = 0; i < pathTokens.length - 1; i += 1) {
    curr = obj[pathTokens[i]];
  }

  curr[pathTokens[pathTokens.length - 1]] = val;
}
