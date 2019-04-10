import Draco, { Options, SolutionSet, Violation, vl2asp } from 'draco-vis';
import { TopLevelUnitSpec } from 'draco-vis/node_modules/vega-lite/build/src/spec/unit';
import _ from 'lodash';

export interface SpecObject {
  vlSpec: TopLevelUnitSpec;
  sol?: DracoSolutionObject;
}

export interface DracoSolutionObject {
  violations: ViolationMap;
  facts: string[];
}

export type ViolationMap = { [name: string]: Violation[] };

export class Spec {
  static dracoSolve = (spec: SpecObject, draco: Draco, opt?: Options): SpecObject => {
    const result = _.clone(spec);
    const sol = draco.solve(Spec.toAspString(spec), opt);

    if (sol) {
      result.sol = DracoSolution.fromSolutionSet(sol);
    }
    return result;
  };

  static toAsp = (spec: SpecObject): string[] => {
    const result = vl2asp(spec.vlSpec);
    return result;
  };

  static toAspString = (spec: SpecObject): string => {
    const result = aspToString(Spec.toAsp(spec));
    return result;
  };
}

export class DracoSolution {
  static fromSolutionSet = (sol: SolutionSet) => {
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
  };
}

export function aspToString(asp: string[]): string {
  const result = asp.join('\n');
  return result;
}
