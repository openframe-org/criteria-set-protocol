export type Color = string | {
  red: number;
  green: number;
  blue: number;
};

export type QualityStyle = {
  primaryColor: Color;
  secondaryColor: Color;
};

export type SchemaDefinition = Record<string, any>;

export type SchemaDefinitions = {
  parameters?: SchemaDefinition;
  result?: SchemaDefinition;
};

export type Metadata = {
  id: string;
  version: string;
  date: Date;
  name: string;
  description: string;
  documentation?: string;
  locales?: string[];
  defaultLocale?: string;
  schemas?: SchemaDefinitions;
  certificateDefinitions?: CertificateDefinition[];
}

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
  version: string;
  qualities: Quality[];
  certificates?: string[];
  result?: any;
};

type BaseElement<Type extends CriteriaTreeElementType> = {
  type: Type;
  title: string;
  code: string;
  tags?: string[];
  documentation?: DocumentationItem[];
  data?: Record<string, any>;
  sortOrder?: number;
};

export type Quality = BaseElement<'quality'> & {
  style?: QualityStyle;
  items: Criterion[];
}

export type Criterion = BaseElement<'criterion'> & {
  items: TaskGroup[];
};

export type TaskGroup = BaseElement<'task-group'> & {
  category?: string;
  items: Task[];
};

export type Task = BaseElement<'task'> & {
  description?: string;
  items: TaskItem[];
};

export type TaskItem = Omit<BaseElement<'task-item'>, 'title'> & {
  definition: TaskItemDefinition;
  description?: string;
  providedData?: Record<string, TaskItemValue>;
};

export type AbstractDefinition<Type extends 'select-single' | 'select-multiple' | 'number' | 'boolean'> = {
  type: Type;
}

export type SelectSingleType = AbstractDefinition<'select-single'> & {
  options: PointOption[];
};

export type SelectMultipleType = AbstractDefinition<'select-multiple'> & {
  options: PointOption[];
};

export type NumberType = AbstractDefinition<'number'> & {
  minimum?: number;
  maximum?: number;
  step?: number;
};

export type BooleanType = AbstractDefinition<'boolean'> & {
  labels?: {
    true?: string;
    false?: string;
  }
};

export type PointOption = {
  id?: string;
  text: string;
  intro?: string;
  outro?: string;
  value: string | number | boolean | null;
};

export type TaskItemScalarValue = string | number | boolean | null;
export type TaskItemValue = TaskItemScalarValue | Array<TaskItemScalarValue>;
export type TaskItemDefinition = SelectSingleType | SelectMultipleType | NumberType | BooleanType;

export type CriteriaTreeElement = Quality | Criterion | TaskGroup | Task | TaskItem;
export type CriteriaTreeElementType = 'quality' | 'criterion' | 'task-group' | 'task' | 'task-item';

export type DataMap = {
  version: string;
  elements: Record<string, any>;
  result: any;
};

export type CertificateDefinitionType = 'number' | 'percentage';

type AbstractCertificateDefinitionRules<Rules> = Rules extends undefined | never
  ? {
    rules?: never;
    rulesText?: string;
  }
  : {
    rules: Rules;
    rulesText: string;
  };

type AbstractCertificateDefinition<Type extends CertificateDefinitionType, Rules> = AbstractCertificateDefinitionRules<Rules> & {
  code: string;
  type: Type;
  icon?: string;
  name: string;
  description?: string;
};

export type NumberBasedCertificateDefinitionRules =
  & ({ minimum?: number; exclusiveMinimum?: never; } | { minimum?: never; exclusiveMinimum?: number; })
  & ({ maximum?: number; exclusiveMaximum?: never; } | { maximum?: never; exclusiveMaximum?: number; });

export type PercentageBasedCertificateDefinitionRules = NumberBasedCertificateDefinitionRules;

export type NumberBasedCertificateDefinition = AbstractCertificateDefinition<'number', NumberBasedCertificateDefinitionRules>;
export type PercentageBasedCertificateDefinition = AbstractCertificateDefinition<'percentage', PercentageBasedCertificateDefinitionRules>;

export type CertificateDefinition = NumberBasedCertificateDefinition | PercentageBasedCertificateDefinition;
