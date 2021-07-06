from flask import Blueprint,request
from app.models import Following, db
from flask_login import login_required

follow_routes = Blueprint('follows', __name__)





@follow_routes.route('/<int:id>', methods=['POST'])
@login_required
def following(id):
    data= request.get_json()
    print(data)
    follows=Following(
        user_id=data['sessUser'],
        following_id=data['userId']
    )
    db.session.add(follows)
    db.session.commit()
    return '',200