import Draco, { Options, SolutionSet, Violation, vl2asp } from 'draco-vis';
import { TopLevelUnitSpec } from 'draco-vis/node_modules/vega-lite/build/src/spec/unit';
import _ from 'lodash';
import { ConstraintMapObject } from './constraints';

export interface SpecObject {
  vlSpec: TopLevelUnitSpec;
  sol?: DracoSolutionObject;
}

export type ViolationMap = { [name: string]: Violation[] };

export class Spec {
  static dracoSolve(spec: SpecObject, draco: Draco, opt?: Options): SpecObject {
    const result = _.clone(spec);
    const sol = draco.solve(Spec.toAspString(spec), opt);

    result.sol = DracoSolution.fromSolutionSet(sol);
    return result;
  }

  static toAsp(spec: SpecObject): string[] {
    const result = vl2asp(spec.vlSpec);
    return result;
  }

  static toAspString(spec: SpecObject): string {
    const result = aspToString(Spec.toAsp(spec));
    return result;
  }

  static getCost(spec: SpecObject, constraintMap: ConstraintMapObject): number {
    const sol = spec.sol;

    if (_.isUndefined(sol)) {
      return undefined;
    }

    if (DracoSolution.isUnsat(sol)) {
      return Infinity;
    }

    const cost = Object.keys(sol.violations).reduce((c, vname) => {
      const numViolations = sol.violations[vname].length;
      const weight = constraintMap[vname].weight;
      return c + weight * numViolations;
    }, 0);

    return cost;
  }
}

export interface DracoSolutionDefinedType {
  violations: ViolationMap;
  facts: string[];
}

export type DracoSolutionObject = DracoSolutionDefinedType | DracoSolutionUnsatType;

export class DracoSolution {
  static UNSAT: 'unsat' = 'unsat';

  static isUnsat(sol: DracoSolutionObject): sol is DracoSolutionUnsatType {
    return sol === DracoSolution.UNSAT;
  }

  static isDefined(sol: DracoSolutionObject): sol is DracoSolutionDefinedType {
    return !_.isUndefined(sol) && !DracoSolution.isUnsat(sol);
  }

  static fromSolutionSet(sol: SolutionSet) {
    if (sol === null) {
      return DracoSolution.UNSAT;
    }

    const violations = sol.models[0].violations.reduce(
      (dict, v) => {
        if (!dict.hasOwnProperty(v.name)) {
          dict[v.name] = [];
        }

        dict[v.name].push(v);
        return dict;
      },
      {} as ViolationMap
    );

    return {
      violations,
      facts: sol.models[0].facts,
    };
  }
}

export type DracoSolutionUnsatType = typeof DracoSolution.UNSAT;

export function aspToString(asp: string[]): string {
  const result = asp.join('\n');
  return result;
}
