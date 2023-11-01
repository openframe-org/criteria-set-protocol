export type Color = string | {
  red: number;
  green: number;
  blue: number;
};

export type QualityStyle = {
  primaryColor: Color;
  secondaryColor: Color;
};

export type Quality = {
  code: string;
  style?: QualityStyle;
}

export type Metadata = {
  id: string;
  version: string;
  date: Date;
  name: string;
  description: string;
  documentation?: string;
  qualities?: Quality[];
};

export type PdfDocumentationItem = {
  type: 'pdf';
  label: string,
  url: string;
  text: string;
};

export type InlineDocumentationItem = {
  type: 'text';
  label: string;
  text: string;
};

export type LinkDocumentationItem = {
  type: 'link';
  label: string,
  url: string;
  text: string;
};

export type DocumentationItem = PdfDocumentationItem | InlineDocumentationItem | LinkDocumentationItem;

export type CriteriaTree = {
  criteria: Criterion[];
  result?: any;
};

type BaseElement<Type extends CriteriaTreeElementType> = {
  type: Type;
  id: string;
  title: string;
  label?: string;
  tags?: string[];
  documentation?: DocumentationItem[];
  data: Record<string, any>;
};

export type Criterion = BaseElement<'criterion'> & {
  quality: string;
  items: TaskGroup[];
};

export type TaskGroup = BaseElement<'task-group'> & {
  items: Task[];
};

export type Task = BaseElement<'task'> & {
  description?: string;
  items: TaskItem[];
};

export type TaskItem<DefinitionType extends TaskItemDefinition = TaskItemDefinition> = Omit<BaseElement<'task-item'>, 'title'> & {
  description?: string;
  annotation?: string;
  definition: DefinitionType;
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

export type TaskItemScalarValue = string | number | boolean | null;
export type TaskItemValue = TaskItemScalarValue | Array<TaskItemScalarValue>;
export type TaskItemDefinition = SelectSingleType | SelectMultipleType | NumberType | BooleanType;

export type CriteriaTreeElement = Criterion | TaskGroup | Task | TaskItem;
export type CriteriaTreeElementType = 'criterion' | 'task-group' | 'task' | 'task-item';
