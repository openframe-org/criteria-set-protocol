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

export const shouldHideCode = (element: Quality | Criterion | TaskGroup | Task | { code: string } | string): boolean => {
  return (typeof element === 'string' ? element : element.code).startsWith('_');
};

export const getQualifiedName = (element: Quality | Criterion | TaskGroup | Task | { code: string, title: string }): string => {
  const code = element.code.startsWith('_') ? element.code.substring(1) : element.code;
  if (element.title === code) {
    return element.title;
  }

  return `${code} ${element.title}`;
};

export const resolveCode = (element: Quality | Criterion | TaskGroup | Task | { code: string } | string): string => {
  const resolvedCode = typeof element === 'string' ? element : element.code;
  return resolvedCode.startsWith('_') ? resolvedCode.substring(1) : resolvedCode;
};
