from .db import db


class Role(db.Model):
    __tablename__ = 'Roles'

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(20), nullable=True, unique=True)

    def to_dict(self):
        return {
            'id': self.id,
            'role': self.role
        }
