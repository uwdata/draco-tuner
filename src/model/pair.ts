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

export class PairFilter {
  static getPairFilter(type: PairFilterType) {
    switch (type) {
      case PairFilter.BY_PASS_TYPE:
        return PairFilter.byPass
      case PairFilter.BY_FAIL_TYPE:
        return PairFilter.byFail
    }
  }

  static BY_PASS_TYPE: 'bypass' = 'bypass';
  static byPass(pair: PairObject, opt?: { constraintMap: ConstraintMapObject }): boolean {
    if (_.isUndefined(opt) || _.isUndefined(opt.constraintMap)) {
      throw new Error('PairFilter.byPass requires a constraintMap in opt.');
    }
    return Pair.getPassFail(pair, opt.constraintMap);
  }

  static BY_FAIL_TYPE: 'byfail' = 'byfail';
  static byFail(pair: PairObject, opt?: { constraintMap: ConstraintMapObject }): boolean {
    if (_.isUndefined(opt) || _.isUndefined(opt.constraintMap)) {
      throw new Error('PairFilter.byFail requires a constraintMap in opt.');
    }
    return !Pair.getPassFail(pair, opt.constraintMap);
  }
}

export type PairFilterType =
  typeof PairFilter.BY_PASS_TYPE |
  typeof PairFilter.BY_FAIL_TYPE;
