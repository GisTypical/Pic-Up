from app import db
from flask import Blueprint, request
from server.models.repository import Repository

repository_bp = Blueprint('repository_bp', __name__)


@repository_bp.route('/api/repos', methods=['POST'])
def picture_create():
    data = request.json
    repo = Repository(username=data['username'], repo_name=data['repo_name'])
    db.session.add(repo)
    db.session.commit()
    return {'message': 'Created repo'}, 201


@repository_bp.route('/api/repos', methods=["GET"])
def get_repos():
    username = request.args.get('username')
    repos = Repository.query.filter_by(username=username).all()
    repo_list = []
    for repo in repos:
        repo_cols = {
            'repo_id': repo.repo_id,
            'username': repo.username,
            'repo_name': repo.repo_name,
            'last_mod': repo.last_mod
        }
        repo_list.append(repo_cols)
    return {'repos': repo_list}