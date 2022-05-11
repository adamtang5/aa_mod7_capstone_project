from .db import db
from .user import User
from .status import Status
from datetime import datetime


# status_history = db.Table(
#     "StatusHistory",
#     db.Column("user_id", db.Integer, db.ForeignKey("Users.id")),
#     db.Column("issue_id", db.Integer, db.ForeignKey("Issues.id")),
#     db.Column("status_id", db.Integer, db.ForeignKey("Statuses.id")),
#     db.Column("created_at", db.DateTime, nullable=False, default=datetime.now())
# )

class StatusChange(db.Model):
    __tablename__ = 'StatusChanges'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)
    issue_id = db.Column(db.Integer, db.ForeignKey("Issues.id"), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey("Statuses.id"), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': User.query.get(self.user_id),
            'issue_id': self.issue_id,
            'status_id': self.status_id,
            'status': Status.query.get(self.status_id),
            'created_at': self.created_at
        }
