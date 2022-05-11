import json
import os

from app.models import db, Status


# Adds predefined set of statuses and their adjacency lists
def seed_statuses():
    f = open(os.getcwd()+"/app/seeds/statuses.json")

    data = json.load(f)

    for status_d in data:
        new_status = Status(
            status=status_d["status"],
            description=status_d["description"],
            adjacency_list=status_d["adjacency_list"]
        )
        db.session.add(new_status)

    db.session.commit()

    f.close()


# Uses a raw SQL query to TRUNCATE the "Statuses" table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_statuses():
    db.session.execute('TRUNCATE "Statuses" RESTART IDENTITY CASCADE;')
    db.session.commit()
