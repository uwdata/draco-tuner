export interface ConstraintEditBase {
  type: ConstraintEditType;
}

export interface ConstraintEditCheckpoint extends ConstraintEditBase {
  id: string;
  delta: number;
}

export interface ConstraintCostEdit extends ConstraintEditBase {
  targetId: string;
  before: number;
  after: number;
}

export interface ConstraintAspEdit extends ConstraintEditBase {
  targetId: string;
  before: string;
  after: string;
}

export type ConstraintEditObject = ConstraintEditCheckpoint | ConstraintCostEdit | ConstraintAspEdit;

export class ConstraintEdit {
  static COST: 'cost' = 'cost';
  static CHECKPOINT: 'checkpoint' = 'checkpoint';
  static ASP: 'asp' = 'asp';

  static isCheckpoint(edit: ConstraintEditObject): edit is ConstraintEditCheckpoint {
    return edit.type === ConstraintEdit.CHECKPOINT;
  }

  static isCostEdit(edit: ConstraintEditObject): edit is ConstraintCostEdit {
    return edit.type === ConstraintEdit.COST;
  }

  static isAspEdit(edit: ConstraintEditObject): edit is ConstraintAspEdit {
    return edit.type === ConstraintEdit.ASP;
  }
}

export type ConstraintEditType =
  | typeof ConstraintEdit.COST
  | typeof ConstraintEdit.CHECKPOINT
  | typeof ConstraintEdit.ASP;
