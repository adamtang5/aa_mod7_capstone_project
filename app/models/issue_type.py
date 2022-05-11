from .db import db


class IssueType(db.Model):
    __tablename__ = 'IssueTypes'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=True, unique=True)
    description = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'description': self.description
        }
