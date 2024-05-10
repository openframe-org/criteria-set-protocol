import { Color, CriteriaTree, CriteriaTreeElement, Quality, Criterion, Task, TaskGroup, TaskItem } from './types';

export const isQuality = (element: CriteriaTreeElement): element is Quality => element.type === 'quality';
export const isCriterion = (element: CriteriaTreeElement): element is Criterion => element.type === 'criterion';
export const isTaskGroup = (element: CriteriaTreeElement): element is TaskGroup => element.type === 'task-group';
export const isTask = (element: CriteriaTreeElement): element is Task => element.type === 'task';
export const isTaskItem = (element: CriteriaTreeElement): element is TaskItem => element.type === 'task-item';

/**
 * Convert a color object to a hex string
 */
export const toColorHexString = (color: Color) => {
  if (typeof color === 'string') {
    return color;
  }

  return `#${color.red.toString(16)}${color.green.toString(16)}${color.blue.toString(16)}`;
};

/**
 * Check if a tree element should be hidden in the output
 */
export const shouldHideCode = (element: CriteriaTreeElement | { code: string } | string): boolean => {
  return (typeof element === 'string' ? element : element.code).startsWith('_');
};

/**
 * Get the qualified name of a tree element, which is the title with the code prepended if it is different
 */
export const getQualifiedName = (element: Quality | Criterion | TaskGroup | Task | { code: string, title: string }): string => {
  const code = element.code.startsWith('_') ? element.code.substring(1) : element.code;
  if (element.title === code) {
    return element.title;
  }

  return `${code} ${element.title}`;
};

/**
 * Get the code for a tree element, stripping away unnecessary characters
 */
export const resolveCode = (element: CriteriaTreeElement | { code: string } | string): string => {
  const resolvedCode = typeof element === 'string' ? element : element.code;
  return resolvedCode.startsWith('_') ? resolvedCode.substring(1) : resolvedCode;
};


/**
 * Find an element in the criteria tree by its code
 */
export const findInTree = (tree: CriteriaTree, code: string): CriteriaTreeElement | null => {
  const searchElements = (elements: CriteriaTreeElement[]): CriteriaTreeElement | null => {
    for (const element of elements) {
      if (element.code == code) {
        return element;
      }

      if (!isTaskItem(element)) {
        const foundElement = searchElements(element.items);
        if (foundElement != null) {
          return foundElement;
        }
      }
    }

    return null;
  }

  return searchElements(tree.qualities)
}
