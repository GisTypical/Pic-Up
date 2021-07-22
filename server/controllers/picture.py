from app import db
from flask import Blueprint, request
from server.models.picture import Picture

picture_bp = Blueprint('picture_bp', __name__)


@picture_bp.route('/api/picture', methods=['POST'])
def picture_create():
    data = request.json
    picture = Picture(repo_id=data['repo_id'], pic_name=data['pic_name'], img_path=data['img_path'])
    db.session.add(picture)
    db.session.commit()
    return {'message': 'Picture created'}, 201
