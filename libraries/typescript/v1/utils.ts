import { Color, CriteriaTreeElement, Quality, Criterion, Task, TaskGroup, TaskItem } from './types';

export const isQuality = (element: CriteriaTreeElement): element is Quality => element.type === 'quality';
export const isCriterion = (element: CriteriaTreeElement): element is Criterion => element.type === 'criterion';
export const isTaskGroup = (element: CriteriaTreeElement): element is TaskGroup => element.type === 'task-group';
export const isTask = (element: CriteriaTreeElement): element is Task => element.type === 'task';
export const isTaskItem = (element: CriteriaTreeElement): element is TaskItem => element.type === 'task-item';

export const toColorHexString = (color: Color) => {
  if (typeof color === 'string') {
    return color;
  }

  return `#${color.red.toString(16)}${color.green.toString(16)}${color.blue.toString(16)}`;
};
