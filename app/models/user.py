from .db import db
from .join_u_p import users_projects
# from .join_i_u import issues_users
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    display_name = db.Column(db.String(50), nullable=False)
    avatar_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

    projects = db.relationship(
        "Project",
        secondary=users_projects,
        back_populates="users"
    )

    # issues = db.relationship(
    #     "Issue",
    #     secondary=issues_users,
    #     back_populates="users"
    # )

    submitted_issues = db.relationship("Issue", foreign_keys="[Issue.submitter_id]", back_populates="submitter")
    assigned_issues = db.relationship("Issue", foreign_keys="[Issue.assignee_id]", back_populates="assignee")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            # 'username': self.username,
            'email': self.email,
            'display_name': self.display_name,
            'avatar_url': self.avatar_url,
            'projects': [project.id for project in self.projects],
            'submitted_issues': [issue.id for issue in self.submitted_issues],
            'assigned_issues': [issue.id for issue in self.assigned_issues],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
