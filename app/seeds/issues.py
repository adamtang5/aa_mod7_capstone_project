from app.models import db, Issue


# Adds seed issues
def seed_issues():
    # users = User.query.all()

    # for user in users:
    #     project = Project(
    #         name="Personal Project",
    #         key="U" + str(user.id)
    #     )
    #     db.session.add(project)
    #     project.users.append(user)

    # db.session.commit()
    pass

# Uses a raw SQL query to TRUNCATE the "Issues" table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_issues():
    db.session.execute('TRUNCATE "Issues" RESTART IDENTITY CASCADE;')
    db.session.commit()
