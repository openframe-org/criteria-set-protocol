from marshmallow import Schema, fields

criteria_set_id = r'^[a-zA-Z0-9.\-_]+$'
version = r'^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$'


class TreeBodySchema(Schema):
    locale = fields.Str(required=False)
    values = fields.Dict(required=False, default=dict())
    parameters = fields.Dict(required=False, default=dict())


class MatrixBodySchema(Schema):
    locale = fields.Str(required=False)
    values = fields.Dict(required=False, default=dict())
    parameters = fields.Dict(required=False, default=dict())
    additional = fields.Raw(required=False, default=None)
