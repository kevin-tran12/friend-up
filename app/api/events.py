from flask import Blueprint, jsonify, request
import json
from app.forms import EventForm
from app.models import Event, db

event_routes = Blueprint('events', __name__)


@event_routes.route('/')
def get_events():
    events = Event.query.order_by(Event.city).all()
    return {"event": [event.to_dict() for event in events]}

@event_routes.route('/create', methods=["POST"])
def add_events():
    print('hit the post')
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event=Event(
            name=form.data['name'],
            category=form.data['category'],
            location=form.data['location'],
            description=form.data['description'],
            city=form.data['city'],
            when=form.data['when'],
            userId=form.data['userId']
        )
        db.session.add(event)
        db.session.commit()
    return '',200


@event_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_event(id):
    event= Event.query.filter_by(id=id).first()
    db.session.delete(event)
    db.session.commit()
    return '',200


@event_routes.route('/update/<int:id>', methods=["PUT"])
def update_event(id):
    data=request.get_json()
    event= Event.query.filter_by(id=id).first()
    event.name=data['name']
    event.category=data['category']
    event.location=data['location']
    event.description=data['description']
    event.city=data['city']
    event.when=data['when']
    db.session.commit()
    return '',200
    