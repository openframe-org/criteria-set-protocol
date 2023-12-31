import datetime
import typing
from abc import ABC
from asyncio import StreamReader
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class RgbColor:
    red: int
    green: int
    blue: int


Color = typing.Union[RgbColor, str]


@dataclass
class QualityStyle:
    primaryColor: Color
    secondaryColor: Color


@dataclass
class DocumentationItem(ABC):
    type: str
    label: str
    text: str
    url: Optional[str] = None


@dataclass
class PdfDocumentationItem(DocumentationItem):
    type: str = field(init=False, default='pdf')


@dataclass
class InlineDocumentationItem(DocumentationItem):
    type: str = field(init=False, default='text')


@dataclass
class LinkDocumentationItem(DocumentationItem):
    type: str = field(init=False, default='link')


TaskItemScalarValue = typing.Union[str, float, bool, None]
TaskItemValue = typing.Union[TaskItemScalarValue, list[TaskItemScalarValue]]
DefinitionType = typing.Literal['select-single', 'select-multiple', 'number', 'boolean']
TaskItemValueMap = dict[str, TaskItemValue]


@dataclass
class PointOption:
    label: str
    value: TaskItemScalarValue
    id: Optional[str] = None


@dataclass
class BaseTaskItemDefinition(ABC):
    type: DefinitionType = field(init=True)


@dataclass
class SelectSingleType(BaseTaskItemDefinition):
    type: DefinitionType = field(init=False, default='select-single')
    options: list[PointOption]


@dataclass
class SelectMultipleType(BaseTaskItemDefinition):
    type: DefinitionType = field(init=False, default='select-multiple')
    options: list[PointOption]


@dataclass
class NumberType(BaseTaskItemDefinition):
    type: DefinitionType = field(init=False, default='number')
    minimum: Optional[float] = None
    maximum: Optional[float] = None
    step: Optional[float] = None


@dataclass
class BooleanType(BaseTaskItemDefinition):
    type: DefinitionType = field(init=False, default='boolean')


TaskItemDefinition = typing.Union[SelectSingleType, SelectMultipleType, NumberType, BooleanType]
CriteriaTreeElementType = typing.Literal['quality', 'criterion', 'task-group', 'task', 'task-item']


@dataclass
class TaskItem:
    type: CriteriaTreeElementType = field(init=False, default='task-item')
    id: str
    definition: TaskItemDefinition
    label: Optional[str] = None
    tags: Optional[list] = None
    documentation: Optional[list[DocumentationItem]] = None
    providedData: Optional[dict[str, TaskItemValue]] = None
    description: Optional[str] = None
    data: Optional[dict[str, any]] = None
    sortOrder: Optional[int] = None


@dataclass
class Task:
    type: CriteriaTreeElementType = field(init=False, default='task')
    id: str
    title: str
    category: Optional[str] = None
    label: Optional[str] = None
    tags: Optional[list] = None
    documentation: Optional[list[DocumentationItem]] = None
    description: Optional[str] = None
    items: list[TaskItem] = field(default_factory=list)
    data: Optional[dict[str, any]] = None
    sortOrder: Optional[int] = None


@dataclass
class TaskGroup:
    type: CriteriaTreeElementType = field(init=False, default='task-group')
    id: str
    title: str
    label: Optional[str] = None
    tags: Optional[list] = None
    documentation: Optional[list[DocumentationItem]] = None
    items: list[Task] = field(default_factory=list)
    data: Optional[dict[str, any]] = None
    sortOrder: Optional[int] = None


@dataclass
class Criterion:
    type: CriteriaTreeElementType = field(init=False, default='criterion')
    id: str
    title: str
    label: Optional[str] = None
    tags: Optional[list] = None
    documentation: Optional[list[DocumentationItem]] = None
    items: list[TaskGroup] = field(default_factory=list)
    data: Optional[dict[str, any]] = None
    sortOrder: Optional[int] = None


@dataclass
class Quality:
    type: CriteriaTreeElementType = field(init=False, default='quality')
    code: str
    title: Optional[str] = None
    tags: Optional[list] = None
    documentation: Optional[list[DocumentationItem]] = None
    items: list[Criterion] = field(default_factory=list)
    data: Optional[dict[str, any]] = None
    style: Optional[QualityStyle] = None
    sortOrder: Optional[int] = None


@dataclass
class CriteriaTree:
    version: str
    qualities: list[Quality] = field(init=False, default_factory=list)
    result: any = None


CriteriaTreeElement = typing.Union[Quality, Criterion, TaskGroup, Task, TaskItem]


SchemaDefinition = dict[str, typing.Any]


@dataclass
class SchemaDefinitions:
    parameters: Optional[SchemaDefinition] = None
    result: Optional[SchemaDefinition] = None


@dataclass
class Metadata:
    id: str
    version: str
    date: datetime.datetime
    name: str
    description: str
    documentation: str
    locales: Optional[list[str]] = None
    defaultLocale: Optional[str] = None
    schemas: Optional[SchemaDefinitions] = None


MetadataResponse = Metadata


@dataclass
class CriteriaTreeResponse(CriteriaTree):
    pass


@dataclass
class StreamMatrixResponse:
    filename: str
    content_type: str
    path: str
