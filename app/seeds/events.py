from app.models import db, Event

def seed_events():

    demo = Event(username='Demo', email='demo@aa.io',
                password='password')

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_events():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()