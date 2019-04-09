import Draco, { Options, SolutionSet, vl2asp } from "draco-vis";
import { TopLevelUnitSpec } from "draco-vis/node_modules/vega-lite/build/src/spec/unit";
import _ from 'lodash';

export interface SpecObject {
  vlSpec: TopLevelUnitSpec;
  sol?: SolutionSet;
}

export class Spec {
  static dracoSolve = (spec: SpecObject, draco: Draco, opt?: Options): SpecObject => {
    const result = _.clone(spec);
    const sol = draco.solve(Spec.toAspString(spec), opt);
    result.sol = sol;

    return result;
  }

  static toAsp = (spec: SpecObject): string[] => {
    const result = vl2asp(spec.vlSpec);
    return result;
  }

  static toAspString = (spec: SpecObject): string => {
    const result = aspToString(Spec.toAsp(spec));
    return result;
  }
}

export function aspToString(asp: string[]): string {
  const result = asp.join('\n');
  return result;
}
