import { PairsDictionary } from '../reducers/pair-collection-reducer';
import { CollectionItemEval, CollectionItemEvalType } from './collection-item';
import { ConstraintMapObject } from './constraint-map';
import { Pair } from './pair';

export interface PairEvalMapObject {
  [id: string]: CollectionItemEvalType;
}

export class PairEvalMap {
  static fromPairsDictionary(pairs: PairsDictionary, constraintMap: ConstraintMapObject): PairEvalMapObject {
    const pairEvalMap = Object.keys(pairs).reduce(
      (dict, pairId) => {
        const pairEval = Pair.getEval(pairs[pairId], constraintMap);
        dict[pairId] = pairEval;
        return dict;
      },
      {} as PairEvalMapObject
    );

    return pairEvalMap;
  }

  static getPairEvalDeltaMap(prev: PairEvalMapObject, curr: PairEvalMapObject): PairEvalDeltaMapObject {
    const delta = Object.keys(curr).reduce(
      (dict, pairId) => {
        if (prev.hasOwnProperty(pairId)) {
          const after = curr[pairId];
          const before = prev[pairId];

          if (before !== after) {
            dict[pairId] = { before, after };
          }
        }

        return dict;
      },
      {} as PairEvalDeltaMapObject
    );

    return delta;
  }

  static toScore(evalMap: PairEvalMapObject): number {
    const score = Object.keys(evalMap).reduce((score, pairId) => {
      const pairEval = evalMap[pairId];
      if (pairEval === CollectionItemEval.PASS) {
        return score + 1;
      }
      return score;
    }, 0);

    return score;
  }
}

export interface PairEvalDeltaMapObject {
  [id: string]: PairEvalDelta;
}

export class PairEvalDeltaMap {
  static toScore(evalDeltaMap: PairEvalDeltaMapObject): number {
    const score = Object.keys(evalDeltaMap).reduce((score, pairId) => {
      const { before, after } = evalDeltaMap[pairId];
      return score + CollectionItemEval.toScore(after) - CollectionItemEval.toScore(before);
    }, 0);

    return score;
  }
}

export interface PairEvalDelta {
  before: CollectionItemEvalType;
  after: CollectionItemEvalType;
}
