from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Issue, User, Status, StatusChange, db
from app.forms import StatusChangeForm
from .validation import validation_errors_to_error_messages


status_change_routes = Blueprint('status_changes', __name__)


# POST /api/status_changes/
@status_change_routes.route('/', methods=['POST'])
@login_required
def new_status():
    form = StatusChangeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = form.data['user_id']
        issue_id = form.data['issue_id']
        status_id = form.data['status_id']
        new_status = StatusChange(
            user_id=user_id,
            issue_id=issue_id,
            status_id=status_id,
        )
        db.session.add(new_status)

        # sql = f'INSERT INTO "StatusChanges" (user_id, issue_id, status_id, created_at) VALUES ({user_id}, {issue_id}, {status_id}, CURRENT_TIMESTAMP);'
        # db.session.execute(sql)
        # INSERT INTO "StatusChanges" (user_id, issue_id, status_id, created_at) VALUES (1, 3, 1, CURRENT_TIMESTAMP);
        db.session.commit()
        return Issue.query.get(issue_id).to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
