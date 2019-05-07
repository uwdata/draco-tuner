import _ from 'lodash';
import { Chart, ChartObject } from './chart';
import { ConstraintMapObject } from './constraint-map';
import { Pair, PairObject } from './pair';
import { DracoSolution, ViolationMap } from './spec';

export interface CollectionItemObject {
  type: CollectionItemType;
}

export class CollectionItem {
  static CHART: 'chart' = 'chart';
  static PAIR: 'pair' = 'pair';

  static isChart = function(item: CollectionItemObject): item is ChartObject {
    return item.type === CollectionItem.CHART;
  };

  static isPair = function(item: CollectionItemObject): item is PairObject {
    return item.type === CollectionItem.PAIR;
  };

  static getEval = function(item: CollectionItemObject, constraintMap: ConstraintMapObject): CollectionItemEvalType {
    if (CollectionItem.isChart(item)) {
      return Chart.getEval(item, constraintMap);
    }

    if (CollectionItem.isPair(item)) {
      return Pair.getEval(item, constraintMap);
    }
  };

  static getViolationMap = function(item: CollectionItemObject): ViolationMap {
    if (CollectionItem.isChart(item)) {
      if (!DracoSolution.isDefined(item.sol)) {
        return {};
      }

      return item.sol.violations;
    }

    if (CollectionItem.isPair(item)) {
      const violationMap = {};

      if (DracoSolution.isDefined(item.left.sol)) {
        _.extend(violationMap, item.left.sol.violations);
      }

      if (DracoSolution.isDefined(item.right.sol)) {
        _.extend(violationMap, item.right.sol.violations);
      }

      return violationMap;
    }
  };
}

export type CollectionItemType = typeof CollectionItem.CHART | typeof CollectionItem.PAIR;

export class CollectionItemEval {
  static PASS: 'pass' = 'pass';
  static FAIL: 'fail' = 'fail';
  static UNSAT: 'unsat' = 'unsat';

  static fromBoolean(bool: boolean): CollectionItemEvalType {
    switch (bool) {
      case true:
        return CollectionItemEval.PASS;
      case false:
        return CollectionItemEval.FAIL;
      default:
        return CollectionItemEval.UNSAT;
    }
  }

  static toScore(itemEval: CollectionItemEvalType): number {
    switch (itemEval) {
      case CollectionItemEval.PASS:
        return 1;
      case undefined:
      case CollectionItemEval.FAIL:
      case CollectionItemEval.UNSAT:
        return 0;
    }
  }

  static toColor(itemEval: CollectionItemEvalType): string {
    switch (itemEval) {
      case undefined:
        return CollectionItemEval.WHITE;
      case CollectionItemEval.PASS:
        return CollectionItemEval.GREEN;
      case CollectionItemEval.FAIL:
        return CollectionItemEval.RED;
      case CollectionItemEval.UNSAT:
        return CollectionItemEval.GREY;
      default:
        return CollectionItemEval.WHITE;
    }
  }

  static BLUE = '#75a8f9';
  static RED = '#f97486';
  static WHITE = '#fff';
  static GREEN = '#aff7b3';
  static ORANGE = '#ffcd51';
  static LIGHTBLUE = '#eaf4ff';
  static GREY = '#d8d8d8';
}

export type CollectionItemEvalType =
  | typeof CollectionItemEval.PASS
  | typeof CollectionItemEval.FAIL
  | typeof CollectionItemEval.UNSAT;

export class CollectionItemComparator {
  static LESS_THAN: '<' = '<';
  static LESS_THAN_OR_EQUAL: '<=' = '<=';
  static EQUAL: '=' = '=';
}

export type CollectionItemComparatorType =
  | typeof CollectionItemComparator.LESS_THAN
  | typeof CollectionItemComparator.LESS_THAN_OR_EQUAL
  | typeof CollectionItemComparator.EQUAL;
