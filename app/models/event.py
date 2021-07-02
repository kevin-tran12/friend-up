from .db import db

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable = False)
    description = db.Column(db.String(500), nullable = False)
    category = db.Column(db.String(50), nullable = False)
    location = db.Column(db.String(255), nullable = False)
    city = db.Column(db.String(255), nullable = False)
    when = db.Column(db.String(255), nullable = False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', backref=db.backref('events'))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "category": self.category,
            "location": self.location,
            "city": self.city,
            "when": self.when,
            'userId': self.userId        
        }