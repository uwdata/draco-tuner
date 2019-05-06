import _ from 'lodash';
import { Chart } from './chart';
import { CollectionItem, CollectionItemObject } from './collection-item';
import { ConstraintMapObject } from './constraint-map';
import { Pair } from './pair';

export interface CollectionItemSortObject {
  type: CollectionItemSortType;
}

export class CollectionItemSort {
  static BY_ID_ASC: 'byidasc' = 'byidasc';
  static byIdAsc = function(item: CollectionItemObject, opt?: CollectionItemSortOptObject): number {
    return +getId(item, opt);
  };

  static BY_ID_DESC: 'byiddesc' = 'byiddesc';
  static byIdDesc = function(item: CollectionItemObject, opt?: CollectionItemSortOptObject): number {
    return -+getId(item, opt);
  };

  static BY_COST_ASC: 'bycostasc' = 'bycostasc';
  static byCostAsc = function(item: CollectionItemObject, opt?: CollectionItemSortOptObject): number {
    return getCost(item, opt);
  };

  static BY_COST_DESC: 'bycostdesc' = 'bycostdesc';
  static byCostDesc = function(item: CollectionItemObject, opt?: CollectionItemSortOptObject): number {
    return -getCost(item, opt);
  };

  static getObjectsFromString(s: string): CollectionItemSortObject[] {
    const sortStrings = s.split(/\s+/);
    const sortObjects: CollectionItemSortObject[] = sortStrings.reduce((sortObjects, s) => {
      switch (s) {
        case 'cost:asc':
          sortObjects.push({
            type: CollectionItemSort.BY_COST_ASC,
          });
          break;
        case 'cost:desc':
          sortObjects.push({
            type: CollectionItemSort.BY_COST_DESC,
          });
          break;
        case 'id:asc':
          sortObjects.push({
            type: CollectionItemSort.BY_ID_ASC,
          });
          break;
        case 'id:desc':
          sortObjects.push({
            type: CollectionItemSort.BY_ID_DESC,
          });
          break;
      }
      return sortObjects;
    }, []);
    return sortObjects;
  }

  static fromObj = function(sortObj: CollectionItemSortObject) {
    switch (sortObj.type) {
      case CollectionItemSort.BY_ID_ASC:
        return CollectionItemSort.byIdAsc;
      case CollectionItemSort.BY_ID_DESC:
        return CollectionItemSort.byIdDesc;
      case CollectionItemSort.BY_COST_ASC:
        return CollectionItemSort.byCostAsc;
      case CollectionItemSort.BY_COST_DESC:
        return CollectionItemSort.byCostDesc;
    }
  };
}

export type CollectionItemSortType =
  | typeof CollectionItemSort.BY_COST_ASC
  | typeof CollectionItemSort.BY_COST_DESC
  | typeof CollectionItemSort.BY_ID_ASC
  | typeof CollectionItemSort.BY_ID_DESC;

export interface CollectionItemSortOptObject {
  constraintMap?: ConstraintMapObject;
}

function getCost(item: CollectionItemObject, opt?: CollectionItemSortOptObject) {
  if (_.isUndefined(opt) || _.isUndefined(opt.constraintMap)) {
    throw new Error('Cost sorting requires constraintMap in opt.');
  }

  if (CollectionItem.isChart(item)) {
    return Chart.getCost(item, opt.constraintMap);
  }

  if (CollectionItem.isPair(item)) {
    return Pair.getCost(item, opt.constraintMap, Pair.LEFT);
  }
}

function getId(item: CollectionItemObject, opt?: CollectionItemSortOptObject) {
  if (CollectionItem.isChart(item)) {
    return item.id;
  }

  if (CollectionItem.isPair(item)) {
    return item.id;
  }
}
