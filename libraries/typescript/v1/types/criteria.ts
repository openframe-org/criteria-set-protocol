export type Metadata = {
  id: string;
  version: string;
  date: Date;
  name: string;
  description: string;
  documentation?: string;
};

export type CriteriaTree = Criterion[];

export type Criterion = {
  id: string;
  quality: string;
  title: string;
  label?: string;
  tags?: string[];
  items: (Task | TaskGroup)[];
  documentation?: Record<string, string[]>;
};

export type TaskGroup = {
  title: string;
  label?: string;
  tags?: string[];
  items: (Task | TaskGroup)[];
  documentation?: Record<string, string[]>;
};

export type Task = {
  id: string;
  title: string;
  label?: string;
  description?: string;
  tags?: string[];
  items: TaskItem[];
  documentation?: Record<string, string[]>;
};

export type TaskItem = {
  id: string;
  description?: string;
  label?: string;
  tags?: string[];
  definition: SelectSingleType | SelectMultipleType | NumberType | BooleanType;
  documentation?: Record<string, string[]>;
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
  value: number;
  annotation?: string;
};

export type TaskItemValue = string | number | boolean | null | Array<string | number | boolean | null>;
