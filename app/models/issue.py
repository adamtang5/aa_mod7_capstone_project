from .db import db
from .project import Project
from .issue_type import IssueType
from .status_change import StatusChange

from datetime import datetime


class Issue(db.Model):
    __tablename__ = 'Issues'

    id = db.Column(db.Integer, primary_key=True)
    submitter_id = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)
    assignee_id = db.Column(db.Integer, db.ForeignKey("Users.id"))
    project_id = db.Column(db.Integer, db.ForeignKey("Projects.id"), nullable=False)
    project_idx = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.String)
    type_id = db.Column(db.Integer, db.ForeignKey("IssueTypes.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    project = db.relationship("Project", back_populates="issues")
    comments = db.relationship("Comment", back_populates="issue")

    submitter = db.relationship("User", foreign_keys=[submitter_id], back_populates="submitted_issues")
    assignee = db.relationship("User", foreign_keys=[assignee_id], back_populates="assigned_issues")

    def to_dict(self):
        status_history = StatusChange.query.filter(StatusChange.issue_id == self.id).order_by(StatusChange.created_at.desc()).all()
        print(status_history)

        return {
            'id': self.id,
            'submitter_id': self.submitter_id,
            'assignee_id': self.assignee_id,
            'project_id': self.project_id,
            'project_idx': self.project_idx,
            'project_key': self.project.key,
            'project_personal': self.project.name == "Personal Project",
            'status_history': [status_change.to_dict() for status_change in status_history],
            'current_status': [status_change.to_dict() for status_change in status_history][0],
            'title': self.title,
            'body': self.body,
            'type_id': self.type_id,
            'comments': [comment.to_dict() for comment in self.comments],
            'submitter': self.submitter.to_dict(),
            'assignee': self.assignee.to_dict() if self.assignee else {},
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
