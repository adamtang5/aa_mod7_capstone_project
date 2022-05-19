from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Issue, Project, User, IssueType, db
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
        submitter = User.query.get(form.data['submitter_id'])
        assignee = User.query.get(form.data['assignee_id'])

        issue = Issue(
            project=project,
            submitter=submitter,
            assignee=assignee,
            project_idx=len(project.issues)+1,
            type_id=form.data['type_id'],
            title=form.data['title'],
            body=form.data['body'],
        )
        db.session.add(issue)
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
        issue.title = form.data['title'] or issue.title
        issue.body = form.data['body'] or issue.body
        assignee = User.query.get(form.data['assignee_id'])
        issue.assignee = assignee

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
