from flask import Blueprint,request
from app.models import Reserved, Event, db
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
        reserves = Reserved.query.filter_by(user_id=id).all()
        return {'reserve': [reserve.to_dict() for reserve in reserves]}


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
