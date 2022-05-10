from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        email='demo@aa.io', password='password', display_name='Demo User')
    dad = User(
        email='dad@coder.io',
        password='dadisawesome!',
        display_name='Coder Dad',
        avatar_url='https://m.media-amazon.com/images/I/71SPIoQQxuL._AC_SX466_.jpg')
    mom = User(
        email='mom@super.io',
        password='momissupper!',
        avatar_url='https://media.newyorker.com/photos/5b23e1b240328426ed9a8b49/2:2/w_378,h_378,c_limit/Lane-Incredibles-2.jpg')
    dash = User(
        email='dash@kids.io',
        password='imthefastest!',
        avatar_url='https://cdn.costumewall.com/wp-content/uploads/2018/09/dash.jpg')
    monkey_boy = User(
        email='monkeyboy@kids.io',
        password='immonkeyking!',
        avatar_url='https://img.freepik.com/free-vector/monkey-king-mascot-design_26838-117.jpg')

    db.session.add(demo)
    db.session.add(dad)
    db.session.add(mom)
    db.session.add(dash)
    db.session.add(monkey_boy)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
