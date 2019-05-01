import _ from 'lodash';
import { CollectionItem, CollectionItemEval, CollectionItemEvalType, CollectionItemObject } from './collection-item';
import { ConstraintMapObject } from './constraint-map';
import { Spec, SpecObject } from './spec';

export interface ChartObject extends SpecObject, CollectionItemObject {
  id: string;
}

export class Chart {
  static getEval = function(chart: ChartObject, constraintMap: ConstraintMapObject): CollectionItemEvalType {
    if (_.isUndefined(chart.sol)) {
      return undefined;
    }

    const cost = Spec.getCost(chart, constraintMap);
    if (cost === Infinity) {
      return CollectionItemEval.UNSAT;
    }

    return CollectionItemEval.PASS;
  };

  static getEmptyChart = function(id: string): ChartObject {
    return {
      id,
      ...Spec.getEmptySpec(),
      type: CollectionItem.CHART,
    };
  };
}
