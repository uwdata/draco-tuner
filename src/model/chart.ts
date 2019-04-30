import _ from 'lodash';
import { ConstraintMapObject } from './constraint-map';
import { Spec, SpecObject } from './spec';

export interface ChartObject extends SpecObject {
  id: string;
}

export class Chart {
  static getEval = function(chart: ChartObject, constraintMap: ConstraintMapObject): ChartEvalType {
    if (_.isUndefined(chart.sol)) {
      return undefined;
    }

    const cost = Spec.getCost(chart, constraintMap);
    if (cost === Infinity) {
      return ChartEval.FAIL;
    }

    return ChartEval.PASS;
  };

  static getEmptyChart = function(id: string): ChartObject {
    return {
      id,
      ...Spec.getEmptySpec(),
    };
  };
}

export class ChartEval {
  static PASS: 'pass' = 'pass';
  static FAIL: 'fail' = 'fail';
}

export type ChartEvalType = typeof ChartEval.PASS | typeof ChartEval.FAIL;
