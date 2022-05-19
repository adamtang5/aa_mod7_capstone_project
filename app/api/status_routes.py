from flask import Blueprint, jsonify, request
from app.models import Status, db
import json

status_routes = Blueprint('statuses', __name__)


# GET /api/statuses/
@status_routes.route('/')
def get_all_statuses():
    statuses = Status.query.all()
    return jsonify([status.to_dict_with_adj() for status in statuses])
