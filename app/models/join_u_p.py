from .db import db


users_projects = db.Table(
    "JoinUP",
    db.Column("user_id", db.Integer, db.ForeignKey("Users.id"), primary_key=True),
    db.Column("project_id", db.Integer, db.ForeignKey("Projects.id"), primary_key=True)
)
