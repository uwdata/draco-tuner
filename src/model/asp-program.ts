import _ from 'lodash';

export interface AspProgramsObject {
  softDefine?: string;
  softWeights?: string;
  softAssign?: string;
  hardDefine?: string;
  hardIntegrity?: string;
  define?: string;
  optimize?: string;
  output?: string;
  generate?: string;
  topkLua?: string;
}

export class AspPrograms {
  static SOFT_DEFINE: 'SOFT' = 'SOFT';
  static SOFT_WEIGHTS: 'WEIGHTS' = 'WEIGHTS';
  static SOFT_ASSIGN: 'ASSIGN_WEIGHTS' = 'ASSIGN_WEIGHTS';
  static HARD_DEFINE: 'HARD' = 'HARD';
  static HARD_INTEGRITY: 'HARD_INTEGRITY' = 'HARD_INTEGRITY';
  static DEFINE: 'DEFINE' = 'DEFINE';
  static OPTIMIZE: 'OPTIMIZE' = 'OPTIMIZE';
  static OUTPUT: 'OUTPUT' = 'OUTPUT';
  static TOPK_LUA: 'TOPK_LUA' = 'TOPK_LUA';

  static getTypes(): AspProgramsType[] {
    return [
      AspPrograms.SOFT_DEFINE,
      AspPrograms.SOFT_WEIGHTS,
      AspPrograms.SOFT_ASSIGN,
      AspPrograms.HARD_DEFINE,
      AspPrograms.HARD_INTEGRITY,
      AspPrograms.DEFINE,
      AspPrograms.OPTIMIZE,
      AspPrograms.OUTPUT,
      AspPrograms.TOPK_LUA,
    ];
  }

  static toStringDict(aspPrograms: AspProgramsObject): { [s: string]: string } {
    const programs = AspPrograms.getTypes().reduce(
      (dict, type) => {
        const program = AspPrograms.getProgramFromType(aspPrograms, type);
        dict[type] = program;
        return dict;
      },
      {} as any
    );

    return programs;
  }

  static getProgramFromType(aspPrograms: AspProgramsObject, aspType: AspProgramsType): string {
    switch (aspType) {
      case AspPrograms.SOFT_DEFINE:
        return aspPrograms.softDefine;
      case AspPrograms.SOFT_WEIGHTS:
        return aspPrograms.softWeights;
      case AspPrograms.SOFT_ASSIGN:
        return aspPrograms.softAssign;
      case AspPrograms.HARD_DEFINE:
        return aspPrograms.hardDefine;
      case AspPrograms.HARD_INTEGRITY:
        return aspPrograms.hardIntegrity;
      case AspPrograms.DEFINE:
        return aspPrograms.define;
      case AspPrograms.OPTIMIZE:
        return aspPrograms.optimize;
      case AspPrograms.OUTPUT:
        return aspPrograms.output;
      case AspPrograms.TOPK_LUA:
        return aspPrograms.topkLua;
    }
  }

  static setProgramWithType(aspPrograms: AspProgramsObject, aspType: AspProgramsType, code: string): AspProgramsObject {
    const result = _.clone(aspPrograms);
    switch (aspType) {
      case AspPrograms.SOFT_DEFINE:
        result.softDefine = code;
        break;
      case AspPrograms.SOFT_WEIGHTS:
        result.softWeights = code;
        break;
      case AspPrograms.SOFT_ASSIGN:
        result.softAssign = code;
        break;
      case AspPrograms.HARD_DEFINE:
        result.hardDefine = code;
        break;
      case AspPrograms.HARD_INTEGRITY:
        result.hardIntegrity = code;
        break;
      case AspPrograms.DEFINE:
        result.define = code;
        break;
      case AspPrograms.OPTIMIZE:
        result.optimize = code;
        break;
      case AspPrograms.OUTPUT:
        result.output = code;
        break;
      case AspPrograms.TOPK_LUA:
        result.topkLua = code;
        break;
    }
    return result;
  }
}

export type AspProgramsType =
  | typeof AspPrograms.SOFT_DEFINE
  | typeof AspPrograms.SOFT_WEIGHTS
  | typeof AspPrograms.SOFT_ASSIGN
  | typeof AspPrograms.HARD_DEFINE
  | typeof AspPrograms.HARD_INTEGRITY
  | typeof AspPrograms.DEFINE
  | typeof AspPrograms.OPTIMIZE
  | typeof AspPrograms.OUTPUT
  | typeof AspPrograms.TOPK_LUA;
