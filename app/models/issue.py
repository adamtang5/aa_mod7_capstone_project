from .db import db, Issue
from .user import User
from .project import Project
from .issue_type import IssueType
from datetime import datetime


class Issue(db.Model):
    __tablename__ = 'Issues'

    id = db.Column(db.Integer, primary_key=True)
    submitter_id = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey("Projects.id"), nullable=False)
    project_idx = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.String)
    type_id = db.Column(db.Integer, db.ForeignKey("IssueTypes.id"), nullable=False)
    assignee_id = db.Column(db.Integer, db.ForeignKey("Users.id"))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    submitter = db.relationship("User", foreign_keys=[submitter_id], back_populates="issues_submitted")
    assignee = db.relationship("User", foreign_keys=[assignee_id], back_populates="issues_assigned")
    project = db.relationship("Project", back_populates="issues")

    def to_dict(self):
        return (
            'id': self.id,
            'submitter_id': self.submitter_id,
            'submitter': User.query.get(self.submitter_id),
            'project_id': self.project_id,
            'project': Project.query.get(self.project_id),
            'project_idx': self.project_idx,
            'title': self.title,
            'body': self.body,
            'type': IssueType.query.get(self.type_id),
            'assignee_id': self.assignee_id,
            'assignee': User.query.get(self.assignee_id),
            'created_at': self.created_at,
            'updated_at': self.updated_at
        )
