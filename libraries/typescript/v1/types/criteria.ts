export type Metadata = {
  id: string;
  version: string;
  date: Date;
  name: string;
  description: string;
  documentation?: string;
};

export type PdfDocumentationItem = {
  type: 'pdf';
  label: string,
  url: string;
};

export type InlineDocumentationItem = {
  type: 'text';
  label?: string,
  text: string;
};

export type LinkDocumentationItem = {
  type: 'link';
  label: string,
  url: string;
};

export type DocumentationItem = PdfDocumentationItem | InlineDocumentationItem | LinkDocumentationItem;

export type CriteriaTree = Criterion[];

export type Criterion = {
  type: 'criterion';
  id?: string;
  quality: string;
  title: string;
  label?: string;
  tags?: string[];
  items: (Task | TaskGroup)[];
  documentation?: DocumentationItem[];
};

export type TaskGroup = {
  type: 'task-group';
  id?: string;
  title: string;
  label?: string;
  tags?: string[];
  items: (Task | TaskGroup)[];
  documentation?: DocumentationItem[];
};

export type Task = {
  type: 'task';
  id?: string;
  title: string;
  label?: string;
  description?: string;
  tags?: string[];
  items: TaskItem[];
  documentation?: DocumentationItem[];
};

export type TaskItem = {
  type: 'task-item';
  id: string;
  description?: string;
  label?: string;
  tags?: string[];
  definition: SelectSingleType | SelectMultipleType | NumberType | BooleanType;
  documentation?: DocumentationItem[];
  providedData?: Record<string, TaskItemValue>;
  calculatedData?: Record<string, any>;
};

export type SelectSingleType = {
  type: 'select-single';
  options: PointOption[];
};

export type SelectMultipleType = {
  type: 'select-multiple';
  options: PointOption[];
};

export type NumberType = {
  type: 'number';
  minimum?: number;
  maximum?: number;
  step?: number;
};

export type BooleanType = {
  type: 'boolean';
};

export type PointOption = {
  id?: string;
  label: string;
  value: string | number | boolean | null;
  annotation?: string;
};

export type TaskItemValue = string | number | boolean | null | Array<string | number | boolean | null>;

export type CriteriaTreeElement = Criterion | TaskGroup | Task | TaskItem;
export type CriteriaTreeElementType = 'criterion' | 'task-group' | 'task' | 'task-item';
