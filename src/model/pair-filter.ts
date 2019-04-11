import _ from 'lodash';
import { ConstraintMapObject } from './constraints';
import { Pair, PairEval, PairObject } from './pair';

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
    }
  }

  static BY_PASS_TYPE: 'bypass' = 'bypass';
  static byPass(pair: PairObject, opt?: { constraintMap: ConstraintMapObject }): boolean {
    if (_.isUndefined(opt) || _.isUndefined(opt.constraintMap)) {
      throw new Error('PairFilter.byPass requires a constraintMap in opt.');
    }
    return Pair.getEval(pair, opt.constraintMap) === PairEval.PASS;
  }

  static BY_FAIL_TYPE: 'byfail' = 'byfail';
  static byFail(pair: PairObject, opt?: { constraintMap: ConstraintMapObject }): boolean {
    if (_.isUndefined(opt) || _.isUndefined(opt.constraintMap)) {
      throw new Error('PairFilter.byFail requires a constraintMap in opt.');
    }
    return Pair.getEval(pair, opt.constraintMap) === PairEval.FAIL;
  }
}

export type PairFilterType = typeof PairFilter.BY_PASS_TYPE | typeof PairFilter.BY_FAIL_TYPE;
