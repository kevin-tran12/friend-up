from .db import db

class Following(db.Model):
    __tablename__='following'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable = False)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable = False)
