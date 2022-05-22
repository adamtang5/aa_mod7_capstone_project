from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Issue, User, Comment, db
from app.forms import CreateCommentForm, EditCommentForm
from .validation import validation_errors_to_error_messages
from datetime import datetime


comment_routes = Blueprint('comments', __name__)


# GET /api/comments/:id
@comment_routes.route('/<int:id>')
@login_required
def comment_by_id(id):
    comment = Comment.query.get(id)
    return comment.to_dict()


# POST /api/comments/
@comment_routes.route('/', methods=['POST'])
@login_required
def create_comment():
    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            issue_id=form.data['issue_id'],
            user_id=form.data['user_id'],
            body=form.data['body'],
        )
        db.session.add(comment)
        db.session.commit()

        issue = Issue.query.get(form.data['issue_id'])
        return issue.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# PUT /api/comments/:id
@comment_routes.route('/<int:id>', methods=['PUT'])
def edit_comment(id):
    form = EditCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)
        comment.body = form.data['body']
        comment.updated_at = datetime.now()
        db.session.commit()

        issue = Issue.query.get(comment.issue_id)
        return issue.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE /api/comments/:id
@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    issue_id = comment.issue_id
    if comment:
        db.session.delete(comment)
        db.session.commit()

        issue = Issue.query.get(issue_id)
        return issue.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
