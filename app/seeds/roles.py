import json
import os

from app.models import db, Role


# Adds predefined set of roles
def seed_roles():
    f = open(os.getcwd()+"/app/seeds/roles.json")

    data = json.load(f)

    for role_d in data:
        new_role = Role(
            role=role_d["role"],
        )
        db.session.add(new_role)

    db.session.commit()

    f.close()


# Uses a raw SQL query to TRUNCATE the "Roles" table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_roles():
    db.session.execute('TRUNCATE "Roles" RESTART IDENTITY CASCADE;')
    db.session.commit()
