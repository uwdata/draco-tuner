import { Constraint, constraints2json, ConstraintSet, json2constraints } from 'draco-vis';
import _ from 'lodash';
import { AspPrograms, AspProgramsObject } from './asp-program';

export interface ConstraintMapObject {
  [name: string]: Constraint;
}

export class ConstraintMap {
  static toAspPrograms(constraintMap: ConstraintMapObject): AspProgramsObject {
    const constraintSet = ConstraintMap.toConstraintSet(constraintMap);
    const softAspSet = json2constraints(constraintSet.soft);
    const hardAspSet = json2constraints(constraintSet.hard);

    const softDefine = softAspSet.definitions;
    const softWeights = softAspSet.weights;
    const softAssign = softAspSet.assigns;

    const hardDefine = hardAspSet.definitions;

    return {
      softDefine,
      softWeights,
      softAssign,
      hardDefine,
    };
  }

  static fromAspPrograms(aspPrograms: AspProgramsObject): ConstraintMapObject {
    const softDefineAsp = AspPrograms.getProgramFromType(aspPrograms, AspPrograms.SOFT_DEFINE);
    const softWeightsAsp = AspPrograms.getProgramFromType(aspPrograms, AspPrograms.SOFT_WEIGHTS);
    const softAspSet = constraints2json(softDefineAsp, softWeightsAsp);

    const hardDefineAsp = AspPrograms.getProgramFromType(aspPrograms, AspPrograms.HARD_DEFINE);
    const hardAspSet = constraints2json(hardDefineAsp);

    const constraintSet: ConstraintSet = {
      soft: softAspSet,
      hard: hardAspSet,
    };

    return ConstraintMap.fromConstraintSet(constraintSet);
  }

  static fromConstraintSet(constraintSet: ConstraintSet): ConstraintMapObject {
    const allConstraints = _.flatMap([constraintSet.hard, constraintSet.soft], set => {
      return set.map(constraint => constraint);
    });
    return ConstraintMap.fromConstraintList(allConstraints);
  }

  static toConstraintSet(constraintMap: ConstraintMapObject): ConstraintSet {
    const constraintList = ConstraintMap.toConstraintList(constraintMap);
    const soft = constraintList.filter(c => c.type === 'soft');
    const hard = constraintList.filter(c => c.type === 'hard');

    return {
      soft,
      hard,
    };
  }

  static toConstraintList = (
    constraintMap: ConstraintMapObject,
    sortBy?: ((c: Constraint) => string | number)[]
  ): Constraint[] => {
    let constraints = Object.keys(constraintMap).map(cname => {
      return constraintMap[cname];
    });

    if (!_.isUndefined(sortBy)) {
      constraints = _.sortBy(constraints, sortBy);
    }

    return constraints;
  };

  static fromConstraintList = (constraintList: Constraint[]): ConstraintMapObject => {
    const constraintMap = constraintList.reduce(
      (dict, constraint) => {
        dict[constraint.name] = constraint;
        return dict;
      },
      {} as ConstraintMapObject
    );

    return constraintMap;
  };
}
