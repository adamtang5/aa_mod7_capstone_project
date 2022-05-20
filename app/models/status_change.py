from .db import db
from .user import User
from .status import Status
from datetime import datetime


class StatusChange(db.Model):
    __tablename__ = 'StatusChanges'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)
    issue_id = db.Column(db.Integer, db.ForeignKey("Issues.id"), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey("Statuses.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'issue_id': self.issue_id,
            'status_id': self.status_id,
            'created_at': self.created_at
        }
