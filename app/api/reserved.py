
from flask import Blueprint,request
from app.models import Reserved, Event, User, db
from flask_login import login_required
import json

reserve_routes = Blueprint('reserve', __name__)


@reserve_routes.route('/<int:id>', methods=['GET', 'POST'])
@login_required
def reserving(id):
    if request.method == 'POST':
        data= request.get_json()
        reserve=Reserved(
            user_id=data['userId'],
            event_id=data['eventId']
        )
        db.session.add(reserve)
        db.session.commit()

        return '',200

    else:
        reserves = db.session.query(Reserved, Event).join(Event).filter(Reserved.user_id==id).all()
        if len(reserves)==0:
            return '',204
        dict = []
        for reserve, event in reserves:
            dict.append({
                'id': reserve.id,
                'user_id': event.userId,
                'event_id': reserve.event_id,
                'name': event.name
            })
        if len(dict)==0:
            return '',200
        return {'reserve': dict}


@reserve_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def unreserve(id):
    data = request.get_json()
    user_id = data['userId']
    event_id = data['eventId']
    unreserve=Reserved.query.filter_by(user_id=user_id, event_id=event_id).first()
    db.session.delete(unreserve)
    db.session.commit()
    return json.dumps(unreserve.id)

@reserve_routes.route('/event/<int:id>')
@login_required
def reservedEvent(id):
    reserves = db.session.query(Reserved, User).join(User).filter(Reserved.event_id==id).all()
    if len(reserves)==0:
        return '',204
    dict = []
    for reserve, user in reserves:
        dict.append({
            'id': reserve.id,
            'user_id': reserve.user_id,
            'event_id': reserve.event_id,
            'name': user.username,
        })
    if len(dict)==0:
        return '',200
    return {'reserve': dict}