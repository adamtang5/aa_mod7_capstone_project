from .db import db
from .project import Project
from .issue_type import IssueType
from .join_i_u import issues_users

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

    users = db.relationship(
        "User",
        secondary=issues_users,
        back_populates="issues"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'project_idx': self.project_idx,
            'title': self.title,
            'body': self.body,
            'type': IssueType.query.get(self.type_id),
            'comments': [comment.to_dict() for comment in self.comments],
            'users': [user.to_dict() for user in self.users],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
