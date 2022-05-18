from flask import Blueprint, jsonify, request
from app.models import IssueType, db
import json

type_routes = Blueprint('types', __name__)


# GET /api/types/
@type_routes.route('/')
def get_all_types():
    types = IssueType.query.all()
    return jsonify([type.to_dict() for type in types])
