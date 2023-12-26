import typing
from dataclasses import dataclass, field
from typing import Optional


ValidationErrorType = typing.Literal['data', 'parameter']


@dataclass(frozen=True)
class _ValidationError(Exception):
    errorType: ValidationErrorType
    code: str
    path: Optional[str]
    arguments: Optional[dict[str, str]]


@dataclass(frozen=True)
class DataValidationError(_ValidationError):
    errorType: ValidationErrorType = field(init=False, default='data')


@dataclass(frozen=True)
class ParameterValidationError(_ValidationError):
    errorType: ValidationErrorType = field(init=False, default='parameter')
