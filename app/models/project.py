from .db import db
from .join_u_p import users_projects

class Project(db.Model):
    __slots__ = ['_number_of_issues']

    def __init__(self):
        self._number_of_issues = 0

    @property
    def number_of_issues(self):
        return self._number_of_issues

    def generate_next_idx(self):
        self._number_of_issues += 1
        return self._number_of_issues

    __tablename__ = 'Projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    key = db.Column(db.String(5), nullable=False)

    users = db.relationship(
        "User",
        secondary=users_projects,
        back_populates="projects"
    )

    issues = db.relationship("Issue", back_populates="project")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'key': self.key,
            'users': [user.id for user in self.users],
            'issues': [issue.id for issue in self.issues]
        }
