from app import db
from flask import Blueprint, request
from server.models.repository import Repository

repository_bp = Blueprint('repository_bp', __name__)


@repository_bp.route('/api/repository', methods=['POST'])
def picture_create():
    data = request.json
    repo = Repository(username=data['username'], repo_name=data['repo_name'])
    db.session.add(repo)
    db.session.commit()
    return {'message': 'Created repo'}, 201