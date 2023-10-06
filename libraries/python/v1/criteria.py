import datetime
import typing
from typing import Optional


class Metadata:
    def __init__(self, id: str, version: str, date: datetime.datetime, name: str, description: str, documentation: str):
        self.id = id
        self.version = version
        self.date = date
        self.name = name
        self.description = description
        self.documentation = documentation


class DocumentationItem:
    def __init__(self, type: str, label: str, url: Optional[str], text: str):
        self.type = type
        self.label = label
        self.url = url
        self.text = text


class PdfDocumentationItem(DocumentationItem):
    def __init__(self, label: str, url: str, text: str):
        super().__init__('pdf', label, url, text)


class InlineDocumentationItem(DocumentationItem):
    def __init__(self, label: str, text: str):
        super().__init__('text', label, None, text)


class LinkDocumentationItem(DocumentationItem):
    def __init__(self, label: str, url: str, text: str):
        super().__init__('link', label, url, text)


TaskItemValuePrimitive = typing.Union[str, float, bool, None]
TaskItemValue = typing.Union[TaskItemValuePrimitive, list[TaskItemValuePrimitive]]

DefinitionType = typing.Literal['select-single', 'select-multiple', 'number', 'boolean']


class PointOption:
    def __init__(self, id: Optional[str], label: str, value: TaskItemValuePrimitive, annotation: Optional[str]):
        self.id = id
        self.label = label
        self.value = value
        self.annotation = annotation


class BaseTaskItemDefinition:
    def __init__(self, type: DefinitionType):
        self.type = type


class SelectSingleType(BaseTaskItemDefinition):
    def __init__(self, options: list[PointOption]):
        super().__init__('select-single')
        self.options = options


class SelectMultipleType(BaseTaskItemDefinition):
    def __init__(self, options: list[PointOption]):
        super().__init__('select-multiple')
        self.options = options


class NumberType(BaseTaskItemDefinition):
    def __init__(self, minimum: Optional[float], maximum: Optional[float], step: Optional[float]):
        super().__init__('number')
        self.minimum = minimum
        self.maximum = maximum
        self.step = step


class BooleanType(BaseTaskItemDefinition):
    def __init__(self):
        super().__init__('boolean')


TaskItemDefinition = typing.Union[SelectSingleType, SelectMultipleType, NumberType, BooleanType]
CriteriaTreeElementType = typing.Literal['criterion', 'task-group', 'task', 'task-item']


class BaseElement:
    def __init__(self, type: CriteriaTreeElementType, id: str, label: Optional[str], tags: Optional[list],
                 documentation: Optional[list[DocumentationItem]]):
        self.type = type
        self.id = id
        self.label = label
        self.tags = tags
        self.documentation = documentation


class TaskItem(BaseElement):
    def __init__(self, id: str, label: Optional[str], tags: Optional[list],
                 documentation: Optional[list[DocumentationItem]], description: Optional[str],
                 definition: TaskItemDefinition, provided_data: Optional[dict[str, TaskItemValue]],
                 calculated_data: Optional[dict[str, any]]):
        super().__init__('task-item', id, label, tags, documentation)
        self.description = description
        self.definition = definition
        self.provided_data = provided_data
        self.calculated_data = calculated_data


class Task(BaseElement):
    def __init__(self, id: str, label: Optional[str], tags: Optional[list],
                 documentation: Optional[list[DocumentationItem]], description: Optional[str], items: list[TaskItem]):
        super().__init__('task', id, label, tags, documentation)
        self.description = description
        self.items = items


class TaskGroup(BaseElement):
    def __init__(self, id: str, label: Optional[str], tags: Optional[list],
                 documentation: Optional[list[DocumentationItem]], items: list[Task]):
        super().__init__('task-group', id, label, tags, documentation)
        self.items = items


class Criterion(BaseElement):
    def __init__(self, id: str, label: Optional[str], tags: Optional[list],
                 documentation: Optional[list[DocumentationItem]], quality: str, items: list[TaskGroup]):
        super().__init__('criterion', id, label, tags, documentation)
        self.quality = quality
        self.items = items


class CriteriaTree(list[Criterion]):
    def __init__(self, criteria: list):
        list.__init__(self, criteria)


CriteriaTreeElement = typing.Union[Criterion, TaskGroup, Task, TaskItem]
