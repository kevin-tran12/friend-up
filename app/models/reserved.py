from .db import db

class Reserved(db.Model):
    __tablename__='reserved'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable= False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable= False)
    