from app import db
from flask import Blueprint, request, session
from server.models.repository import Repository

repository_bp = Blueprint('repository_bp', __name__)


@repository_bp.route('/api/repos', methods=['POST'])
def picture_create():
    data = request.json
    repo = Repository(username=session['username'], repo_name=data['repo_name'])
    db.session.add(repo)
    db.session.commit()
    return {'message': 'Created repo'}, 201


@repository_bp.route('/api/repos', methods=["GET"])
def get_repos():
    repos = Repository.query.filter_by(username=session['username']).all()
    repo_list = []
    for repo in repos:
        repo_cols = {
            'repo_id': repo.repo_id,
            'username': repo.username,
            'repo_name': repo.repo_name,
            'last_mod': repo.last_mod.isoformat(),
            'number_pics': len(repo.pictures)
        }
        repo_list.append(repo_cols)
    return {'repos': repo_list}

@repository_bp.route('/api/repos/<string:repo_id>')
def repo_pictures(repo_id):
    repo_db = Repository.query.filter_by(repo_id=repo_id).first()
    pic_list = []
    for pic in repo_db.pictures:
        tag_list = []
        if pic.tags: 
            tag_list.append(pic.tags[0].tag_name)
            if len(pic.tags) > 1:
                tag_list.clear()
                for i in range(2):
                    tag_list.append(pic.tags[i].tag_name)
        
        pic_list.append({
            'pic_id': pic.picture_id,
            'pic_name': pic.pic_name,
            'img_path': pic.img_path,
            'uploaded_date': pic.uploaded_date,
            'tags': tag_list
        })

    return {'pictures': pic_list, 'repo_name':repo_db.repo_name }

@repository_bp.route('/api/repos', methods=['DELETE'])
def delete_repo():
    print(request.content_type)
    data = request.json
    user = Repository.query.filter_by(repo_id=data['repo_id']).first()
    if not user:
        return {'message': 'No repo found'}, 400
    db.session.delete(user)
    db.session.commit()
    return {'message': 'Repo deleted'}