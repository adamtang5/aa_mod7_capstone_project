from .db import db
from .join_u_p import users_projects

class Project(db.Model):
    __tablename__ = 'Projects'

    _new_issue_idx = 0
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    key = db.Column(db.String(5), nullable=False)

    users = db.relationship(
        "User",
        secondary=users_projects,
        back_populates="projects"
    )

    issues = db.relationship("Issue", back_populates="project")

    def generate_next_idx(self):
        self._new_issue_idx += 1
        print("===============", self._new_issue_idx)
        return self._new_issue_idx

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'key': self.key,
            'users': [user.id for user in self.users],
            'issues': [issue.id for issue in self.issues]
        }
