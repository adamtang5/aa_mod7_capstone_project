from app.models import db, User, Project


# Adds default personal projects for every existing user
def seed_projects():
    users = User.query.all()

    for user in users:
        project = Project(
            name="Personal Project",
            key="U" + str(user.id)
        )
        user.projects.append(project)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the "Projects" table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_projects():
    db.session.execute('TRUNCATE "Projects" RESTART IDENTITY CASCADE;')
    db.session.commit()
