from .db import db


invites = db.Table(
    "Invites",
    db.Column("issue_id", db.Integer, db.ForeignKey("Issues.id"), primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey("Users.id"), primary_key=True)
)
