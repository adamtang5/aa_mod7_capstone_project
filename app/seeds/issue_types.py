from app.models import db, IssueType


# Adds predefined issue types
def seed_issue_types():
    task = IssueType(
        type='Task',
        description='A task that needs to be done.'
    )
    request = IssueType(
        type='Request',
        description='A request that follows normal workflows.'
    )

    db.session.add(task)
    db.session.add(request)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the "IssueTypes" table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_issue_types():
    db.session.execute('TRUNCATE "IssueTypes" RESTART IDENTITY CASCADE;')
    db.session.commit()
