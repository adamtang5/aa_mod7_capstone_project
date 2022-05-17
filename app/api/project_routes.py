from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, User, db
from app.forms import CreateProjectForm, EditProjectForm
from .validation import validation_errors_to_error_messages
import json

project_routes = Blueprint('projects', __name__)


# GET /api/projects/
@project_routes.route('/')
@login_required
def get_all_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])


# GET /api/projects/:id
@project_routes.route('/<int:id>')
@login_required
def project_by_id(id):
    project = Project.query.get(id)
    return project.to_dict()


# POST /api/projects/
@project_routes.route('/', methods=['POST'])
@login_required
def create_project():
    form = CreateProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project(
            name=form.data['name'],
            key=form.data['key'],
        )
        db.session.add(project)
        user_ids = json.loads(form.data['user_ids'])
        for id in user_ids:
            user = User.query.get(id)
            project.users.append(user)
        db.session.commit()
        return project.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# PUT /api/projects/:id
@project_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_project(id):
    form = EditProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project.query.get(id)
        project.name = form.data['name'] or project.name
        project.key = form.data['key'] or project.key

        # add and subtract in JoinUP
        new_user_ids = set(json.loads(form.data['user_ids']))
        old_user_ids = set([user.id for user in project.users])

        subtractions = list(old_user_ids - new_user_ids)
        additions = list(new_user_ids - old_user_ids)

        for user_id in subtractions:
            user = User.query.get(user_id)
            project.users.remove(user)

        for user_id in additions:
            user = User.query.get(user_id)
            project.users.append(user)

        db.session.commit()
        return project.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE /api/projects/:id
@project_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_project(id):
    project = Project.query.get(id)
    if project:
        db.session.delete(project)
        db.session.commit()
        return current_user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
