import _ from 'lodash';
import { PairCardItem } from '../components/presenters/pair-card/index';
import { ConstraintMapObject } from './constraints';
import { Spec, SpecObject } from './spec';

export interface PairObject {
  id: number;
  comparator: string;
  left: SpecObject;
  right: SpecObject;
}

export class Pair {
  static getPairCardItems(pair: PairObject, constraintMap: ConstraintMapObject): PairCardItem[] {
    const items: PairCardItem[] = [pair.left, pair.right].map(spec => {
      const cost = Spec.getCost(spec, constraintMap);

      return {
        cost,
        vlSpec: spec.vlSpec,
      };
    });

    return items;
  }

  static getPassFail(pair: PairObject, constraintMap: ConstraintMapObject): boolean {
    const leftCost = Spec.getCost(pair.left, constraintMap);
    const rightCost = Spec.getCost(pair.right, constraintMap);

    if (!_.isUndefined(leftCost) && _.isUndefined(rightCost)) {
      return true;
    }

    if (!_.isUndefined(leftCost) && !_.isUndefined(rightCost)) {
      if (pair.comparator === '<') {
        return leftCost < rightCost;
      }
      return leftCost === rightCost;
    }

    return undefined;
  }
}
