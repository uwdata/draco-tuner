import _ from 'lodash';
import { Chart } from './chart';
import { CollectionItem, CollectionItemEval, CollectionItemEvalType, CollectionItemObject } from './collection-item';
import { ConstraintMapObject } from './constraint-map';
import { Pair } from './pair';

export interface CollectionItemFilterObject {
  type: CollectionItemFilterType;
  opt?: CollectionItemFilterOptObject;
}

export interface CollectionItemFilterOptObject {
  constraintMap?: ConstraintMapObject;
  constraintList?: string[];
}

export class CollectionItemFilter {
  static getObjectsFromString(s: string): CollectionItemFilterObject[] {
    const filterStrings = s.split(/\s+/);
    const filterObjects: CollectionItemFilterObject[] = filterStrings.reduce((filterObjects, s) => {
      switch (s) {
        case 'is:failing':
          filterObjects.push({
            type: CollectionItemFilter.BY_FAIL_TYPE,
          });
          break;
        case 'is:passing':
          filterObjects.push({
            type: CollectionItemFilter.BY_PASS_TYPE,
          });
          break;
        case 'is:unsat':
          filterObjects.push({
            type: CollectionItemFilter.BY_UNSAT_TYPE,
          });
          break;
      }
      return filterObjects;
    }, []);
    return filterObjects;
  }

  static fromObj(filterObj: CollectionItemFilterObject) {
    switch (filterObj.type) {
      case CollectionItemFilter.BY_PASS_TYPE:
        return CollectionItemFilter.byPass;
      case CollectionItemFilter.BY_FAIL_TYPE:
        return CollectionItemFilter.byFail;
      case CollectionItemFilter.BY_UNSAT_TYPE:
        return CollectionItemFilter.byUnsat;
    }
  }

  static BY_PASS_TYPE: 'bypass' = 'bypass';
  static byPass(item: CollectionItemObject, opt?: { constraintMap: ConstraintMapObject }): boolean {
    return byEvalType(item, CollectionItemEval.PASS, opt);
  }

  static BY_FAIL_TYPE: 'byfail' = 'byfail';
  static byFail(item: CollectionItemObject, opt?: { constraintMap: ConstraintMapObject }): boolean {
    return byEvalType(item, CollectionItemEval.FAIL, opt);
  }

  static BY_UNSAT_TYPE: 'byunsat' = 'byunsat';
  static byUnsat(item: CollectionItemObject, opt?: { constraintMap: ConstraintMapObject }): boolean {
    return byEvalType(item, CollectionItemEval.UNSAT, opt);
  }

  static BY_CONSTRAINTS: 'byconstraints' = 'byconstraints';
  static byConstraint(item: CollectionItemObject, opt?: { constraintList: string[] }): boolean {
    const violationMap = CollectionItem.getViolationMap(item);
    return opt.constraintList.every(name => {
      return violationMap.hasOwnProperty(name);
    });
  }
}

function byEvalType(
  item: CollectionItemObject,
  evalType: CollectionItemEvalType,
  opt?: { constraintMap: ConstraintMapObject }
): boolean {
  if (_.isUndefined(opt) || _.isUndefined(opt.constraintMap)) {
    throw new Error('Filter requires a constraintMap in opt.');
  }

  if (CollectionItem.isChart(item)) {
    return Chart.getEval(item, opt.constraintMap) === evalType;
  }

  if (CollectionItem.isPair(item)) {
    return Pair.getEval(item, opt.constraintMap) === evalType;
  }
}

export type CollectionItemFilterType =
  | typeof CollectionItemFilter.BY_PASS_TYPE
  | typeof CollectionItemFilter.BY_FAIL_TYPE
  | typeof CollectionItemFilter.BY_UNSAT_TYPE;
