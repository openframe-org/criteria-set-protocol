import { CriteriaTreeElement, Criterion, Task } from './types';

export const isCriterion = (element: CriteriaTreeElement): element is Criterion => element.type === 'criterion';
export const isTaskGroup = (element: CriteriaTreeElement): element is Criterion => element.type === 'task-group';
export const isTask = (element: CriteriaTreeElement): element is Criterion => element.type === 'task';
export const isTaskItem = (element: CriteriaTreeElement): element is Criterion => element.type === 'task-item';
