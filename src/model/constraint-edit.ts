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

export interface ConstraintDescriptionEdit extends ConstraintEditBase {
  targetId: string;
  before: string;
  after: string;
}

export interface ConstraintAddEdit extends ConstraintEditBase {
  targetId: string;
}

export type ConstraintEditObject =
  | ConstraintEditCheckpoint
  | ConstraintCostEdit
  | ConstraintAspEdit
  | ConstraintDescriptionEdit
  | ConstraintAddEdit;

export class ConstraintEdit {
  static COST: 'cost' = 'cost';
  static CHECKPOINT: 'checkpoint' = 'checkpoint';
  static ASP: 'asp' = 'asp';
  static DESCRIPTION: 'description' = 'description';
  static ADD: 'add' = 'add';

  static NEW_CONSTRAINT_NAME = '_new_constraint';

  static isCheckpoint(edit: ConstraintEditObject): edit is ConstraintEditCheckpoint {
    return edit.type === ConstraintEdit.CHECKPOINT;
  }

  static isCostEdit(edit: ConstraintEditObject): edit is ConstraintCostEdit {
    return edit.type === ConstraintEdit.COST;
  }

  static isAspEdit(edit: ConstraintEditObject): edit is ConstraintAspEdit {
    return edit.type === ConstraintEdit.ASP;
  }

  static isDescriptionEdit(edit: ConstraintEditObject): edit is ConstraintDescriptionEdit {
    return edit.type === ConstraintEdit.DESCRIPTION;
  }

  static isAddEdit(edit: ConstraintEditObject): edit is ConstraintAddEdit {
    return edit.type === ConstraintEdit.ADD;
  }
}

export type ConstraintEditType =
  | typeof ConstraintEdit.COST
  | typeof ConstraintEdit.CHECKPOINT
  | typeof ConstraintEdit.ASP
  | typeof ConstraintEdit.DESCRIPTION
  | typeof ConstraintEdit.ADD;
