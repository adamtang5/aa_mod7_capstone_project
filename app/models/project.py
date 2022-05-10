from .db import db

class Project(db.Model):
    __tablename__ = 'Projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    key = db.Column(db.String(5), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'key': self.key
        }
