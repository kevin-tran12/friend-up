from .db import db

class Event(db.Model):
    __tablename__='events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable = False)
    description= db.Column(db.String(500), nullable = False)
    category = db.Column(db.String(50), nullable = False)
    location = db.Column(db.String(255), nullable = False)
    city = db.Column(db.String(255), nullable = False)
    when = db.Column(db.DateTime(), nullable = False)
    