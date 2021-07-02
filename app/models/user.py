from .event import Event
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from .following import Following
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  age= db.Column(db.Integer(), nullable = False)
  description= db.Column(db.String(500), nullable = False)
  follow= db.relationship("Following", secondary="following", primaryjoin=(Following.user_id == id), secondaryjoin=(Following.following_id == id), backref=db.backref("users", lazy='dynamic'))
  event= db.relationship('Event', primaryjoin=(Event.userId == id), backref=db.backref('users'))

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "description": self.description,
      "age": self.age
    }
