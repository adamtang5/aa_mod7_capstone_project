from .db import db
from .user import User

from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'Comments'

    id = db.Column(db.Integer, primary_key=True)
    issue_id = db.Column(db.Integer, db.ForeignKey("Issues.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("Users.id"), nullable=False)
    body = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now)

    issue = db.relationship("Issue", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'issue_id': self.issue_id,
            'user_id': self.user_id,
            'user': User.query.get(self.user_id).to_dict(),
            'body': self.body,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
