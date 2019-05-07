import _ from 'lodash';
import {
  CollectionItem,
  CollectionItemComparator,
  CollectionItemComparatorType,
  CollectionItemEval,
  CollectionItemEvalType,
  CollectionItemObject,
} from './collection-item';
import { ConstraintMapObject } from './constraint-map';
import { Spec, SpecObject } from './spec';

export interface ChartObject extends SpecObject, CollectionItemObject {
  id: string;
  comparator: CollectionItemComparatorType;
}

export class Chart {
  static getEval = function(chart: ChartObject, constraintMap: ConstraintMapObject): CollectionItemEvalType {
    if (_.isUndefined(chart.sol)) {
      return undefined;
    }

    const cost = Spec.getCost(chart, constraintMap);

    switch (chart.comparator) {
      case CollectionItemComparator.EQUAL:
        return CollectionItemEval.fromBoolean(cost === Infinity);
      case CollectionItemComparator.LESS_THAN:
        return CollectionItemEval.fromBoolean(cost < Infinity);
      case CollectionItemComparator.LESS_THAN_OR_EQUAL:
        return CollectionItemEval.fromBoolean(cost <= Infinity);
      default:
        return CollectionItemEval.UNSAT;
    }
  };

  static getCost = function(chart: ChartObject, constraintMap: ConstraintMapObject): number {
    if (_.isUndefined(chart.sol)) {
      return undefined;
    }

    return Spec.getCost(chart, constraintMap);
  };

  static getEmptyChart = function(id: string): ChartObject {
    return {
      id,
      ...Spec.getEmptySpec(),
      type: CollectionItem.CHART,
      comparator: CollectionItemComparator.LESS_THAN,
    };
  };
}

export interface ChartDictionary {
  [id: string]: ChartObject;
}
