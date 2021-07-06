from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(username='Demo', email='demo@aa.io',
                password='password', age=16, description="Hi I am 16, very curious in life, and ready to meet new people but most importantly hopefully able to make new friends.")
    demo2 = User(username='Demo2', email='demo2@aa.io',
                password='password', age=18, description="Hi, I just became an adult and looking for new friends and hobbies.")
    demo3 = User(username='Demo3', email='demo3@aa.io',
                password='password', age=30, description="Hi, I'm recently divorced and looking to get back out in the world and make friends.")
    demo4 = User(username='Demo4', email='demo4@aa.io',
                password='password', age=25, description="Hi, I recently graduated college and taking some time off to pick up new hobbies and hopefully some friends on the way.")
    demo5 = User(username='Demo5', email='demo5@aa.io',
                password='password', age=40, description="Hi, my kids are off to college so now that i have more time, I am looking for new friends.")


    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
