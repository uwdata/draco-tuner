import _ from 'lodash';
import { PairCardItem } from '../components/presenters/pair-card/index';
import { CollectionItem, CollectionItemEval, CollectionItemEvalType, CollectionItemObject } from './collection-item';
import { ConstraintMapObject } from './constraint-map';
import { Spec, SpecObject } from './spec';

export interface PairObject extends CollectionItemObject {
  id: number;
  comparator: string;
  left: SpecObject;
  right: SpecObject;
}

export type PairPositionType = typeof Pair.LEFT | typeof Pair.RIGHT;

export class Pair {
  static LEFT: 'left' = 'left';
  static RIGHT: 'right' = 'right';

  static getEmptyPair(id: number): PairObject {
    const left = Spec.getEmptySpec();
    const right = Spec.getEmptySpec();

    return {
      id,
      left,
      right,
      comparator: '<',
      type: CollectionItem.PAIR,
    };
  }

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

  static getEval(pair: PairObject, constraintMap: ConstraintMapObject): CollectionItemEvalType {
    const leftCost = Spec.getCost(pair.left, constraintMap);
    const rightCost = Spec.getCost(pair.right, constraintMap);

    if (_.isUndefined(leftCost)) {
      return undefined;
    }

    if (leftCost === Infinity) {
      return CollectionItemEval.UNSAT;
    }

    if (pair.comparator === '<') {
      return CollectionItemEval.fromBoolean(leftCost < rightCost);
    }
    return CollectionItemEval.fromBoolean(leftCost === rightCost);
  }

  static getCost(pair: PairObject, constraintMap: ConstraintMapObject, pos: PairPositionType): number {
    switch (pos) {
      case Pair.LEFT:
        return Spec.getCost(pair.left, constraintMap);
      case Pair.RIGHT:
        return Spec.getCost(pair.right, constraintMap);
    }
  }
}
