import { Constraint } from 'draco-vis';
import _ from 'lodash';

export interface ConstraintMapObject {
  [name: string]: Constraint;
}

export class ConstraintMap {
  static toConstraintList = (
    constraintMap: ConstraintMapObject,
    sortBy: ((c: Constraint) => string | number)[]
  ): Constraint[] => {
    let constraints = Object.keys(constraintMap).map(cname => {
      return constraintMap[cname];
    });

    constraints = _.sortBy(constraints, sortBy);

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
