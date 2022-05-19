from .db import db
import json


class Status(db.Model):
    __tablename__ = 'Statuses'

    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String, nullable=False)
    adjacency_list = db.Column(db.String, nullable=False)

    def to_dict_no_adj(self):
        return {
            'id': self.id,
            'status': self.status,
            'description': self.description
        }

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)

    def to_dict_with_adj(self):
        next_ids = json.loads(self.adjacency_list)
        print([Status.get_by_id(id).to_dict_no_adj() for id in next_ids])

        return {
            'id': self.id,
            'status': self.status,
            'description': self.description,
            'next': [Status.get_by_id(id).to_dict_no_adj() for id in next_ids]
        }
