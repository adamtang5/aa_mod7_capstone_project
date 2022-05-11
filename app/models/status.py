from .db import db
import json


class Status(db.Model):
    __tablename__ = 'Statuses'

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String, nullable=False)
    adjacency_list = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'adjacency_list': json.loads(adjacency_list)
        }
