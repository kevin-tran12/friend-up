from flask import Blueprint,request
from app.models import Following,User,db
from flask_login import login_required

follow_routes = Blueprint('follows', __name__)


@follow_routes.route('/<int:id>', methods=['GET', 'POST'])
@login_required
def following(id):
    if request.method == 'POST':
        data= request.get_json()
        follows=Following(
            user_id=data['sessUser'],
            following_id=data['userId']
        )
        db.session.add(follows)
        db.session.commit()
        return '',200
    else:
        follows = Following.query.filter_by(user_id=id).all()
        list= []
        for follow in follows:
            followers= User.query.filter_by(id=follow.following_id).first()
            list.append(followers)
        return {'follow': [user.to_dict() for user in list]}
