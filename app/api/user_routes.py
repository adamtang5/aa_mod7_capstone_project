from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.forms import EditUserForm
from .validation import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


# GET /api/users/
@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])


# GET /api/users/:id
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# PUT /api/users/:id
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.get(id)
        user.display_name = form.data['display_name'] or user.display_name
        user.avatar_url = form.data['avatar_url'] or user.avatar_url
        db.session.commit()
        return user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
