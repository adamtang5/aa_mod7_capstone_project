from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Issue, Project, User, db
from app.forms import CreateIssueForm, EditIssueForm
from .validation import validation_errors_to_error_messages
import json

issue_routes = Blueprint('issues', __name__)


# # GET /api/issues/
# @issue_routes.route('/')
# @login_required
# def get_all_issues():
#     issues = Issue.query.all()
#     return jsonify([issue.to_dict() for issue in issues])


# GET /api/issues/:id
@issue_routes.route('/<int:id>')
@login_required
def issue_by_id(id):
    issue = Issue.query.get(id)
    return issue.to_dict()


# POST /api/issues/
@issue_routes.route('/', methods=['POST'])
@login_required
def create_issue():
    form = CreateIssueForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        project = Project.query.get(form.data['project_id'])

        issue = Issue(
            project_id=form.data['project_id'],
            key=form.data['key'],
        )
        db.session.add(issue)
        user_ids = json.loads(form.data['user_ids'])
        for id in user_ids:
            user = User.query.get(id)
            issue.users.append(user)
        db.session.commit()
        return issue.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# PUT /api/issues/:id
@issue_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_issue(id):
    form = EditIssueForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        issue = Issue.query.get(id)
        issue.name = form.data['name'] or issue.name
        issue.key = form.data['key'] or issue.key

        # add and subtract in JoinUP
        new_user_ids = set(json.loads(form.data['user_ids']))
        old_user_ids = set([user.id for user in issue.users])

        subtractions = list(old_user_ids - new_user_ids)
        additions = list(new_user_ids - old_user_ids)

        for user_id in subtractions:
            user = User.query.get(user_id)
            issue.users.remove(user)

        for user_id in additions:
            user = User.query.get(user_id)
            issue.users.append(user)

        db.session.commit()
        return issue.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE /api/issues/:id
@issue_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_issue(id):
    issue = Issue.query.get(id)
    if issue:
        db.session.delete(issue)
        db.session.commit()
        return current_user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
