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

export type ConstraintEditObject = ConstraintEditCheckpoint | ConstraintCostEdit;

export class ConstraintEdit {
  static COST: 'cost' = 'cost';
  static CHECKPOINT: 'checkpoint' = 'checkpoint';

  static isCheckpoint(edit: ConstraintEditObject): edit is ConstraintEditCheckpoint {
    return edit.type === ConstraintEdit.CHECKPOINT;
  }

  static isCostEdit(edit: ConstraintEditObject): edit is ConstraintCostEdit {
    return edit.type === ConstraintEdit.COST;
  }
}

export type ConstraintEditType = typeof ConstraintEdit.COST | typeof ConstraintEdit.CHECKPOINT;
