from flask import Blueprint, jsonify, request
import json
from app.forms import EventForm
from app.models import Event

event_routes = Blueprint('events', __name__)


@event_routes.route('/')
def get_events():
    events = Event.query.order_by(Event.city).all()
    return {"event": [event.to_dict() for event in events]}

@event_routes.route('/create', methods=["POST"])
def add_events():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)
    # if form.validate_on_submit():
    #     event=Event(
    #         name,
    #         description,

    #     )
    return print('we hit it')