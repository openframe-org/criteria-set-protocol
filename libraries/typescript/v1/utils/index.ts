import { CriteriaTreeElement, Quality, Criterion, Task, TaskGroup, TaskItem } from '../types';

export const isQuality = (element: CriteriaTreeElement): element is Quality => element.type === 'quality';
export const isCriterion = (element: CriteriaTreeElement): element is Criterion => element.type === 'criterion';
export const isTaskGroup = (element: CriteriaTreeElement): element is TaskGroup => element.type === 'task-group';
export const isTask = (element: CriteriaTreeElement): element is Task => element.type === 'task';
export const isTaskItem = (element: CriteriaTreeElement): element is TaskItem => element.type === 'task-item';

export * from './color';
