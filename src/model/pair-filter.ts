import _ from 'lodash';
import { ConstraintMapObject } from './constraints';
import { Pair, PairEval, PairEvalType, PairObject } from './pair';

export class PairFilter {
  static getTypesFromString(s: string): PairFilterType[] {
    const filterStrings = s.split(/\s+/);
    const filterTypes: PairFilterType[] = filterStrings.reduce((filterTypes, s) => {
      switch (s) {
        case 'is:failing':
          filterTypes.push(PairFilter.BY_FAIL_TYPE);
          break;
        case 'is:passing':
          filterTypes.push(PairFilter.BY_PASS_TYPE);
          break;
        case 'is:unsat':
          filterTypes.push(PairFilter.BY_UNSAT_TYPE);
          break;
      }
      return filterTypes;
    }, []);

    return filterTypes;
  }

  static fromType(type: PairFilterType) {
    switch (type) {
      case PairFilter.BY_PASS_TYPE:
        return PairFilter.byPass;
      case PairFilter.BY_FAIL_TYPE:
        return PairFilter.byFail;
      case PairFilter.BY_UNSAT_TYPE:
        return PairFilter.byUnsat;
    }
  }

  static BY_PASS_TYPE: 'bypass' = 'bypass';
  static byPass(pair: PairObject, opt?: { constraintMap: ConstraintMapObject }): boolean {
    return byEvalType(pair, PairEval.PASS, opt);
  }

  static BY_FAIL_TYPE: 'byfail' = 'byfail';
  static byFail(pair: PairObject, opt?: { constraintMap: ConstraintMapObject }): boolean {
    return byEvalType(pair, PairEval.FAIL, opt);
  }

  static BY_UNSAT_TYPE: 'byunsat' = 'byunsat';
  static byUnsat(pair: PairObject, opt?: { constraintMap: ConstraintMapObject }): boolean {
    return byEvalType(pair, PairEval.UNSAT, opt);
  }
}

function byEvalType(pair: PairObject, evalType: PairEvalType, opt?: { constraintMap: ConstraintMapObject }): boolean {
  if (_.isUndefined(opt) || _.isUndefined(opt.constraintMap)) {
    throw new Error('Filter requires a constraintMap in opt.');
  }
  return Pair.getEval(pair, opt.constraintMap) === evalType;
}

export type PairFilterType =
  | typeof PairFilter.BY_PASS_TYPE
  | typeof PairFilter.BY_FAIL_TYPE
  | typeof PairFilter.BY_UNSAT_TYPE;
