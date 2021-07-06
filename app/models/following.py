from .db import db

class Following(db.Model):
    __tablename__='following'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    def to_dict(self):
        return{
            'id': self.id,
            'user_id': self.user_id,
            'following_id': self.following_id
        }