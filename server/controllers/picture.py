import os
from random import randint

from app import db
from flask import Blueprint, request, session
from server.models.picture import Picture, Tag
from server.models.repository import Repository
from werkzeug.utils import secure_filename

picture_bp = Blueprint('picture_bp', __name__)

upload_path = os.path.abspath('server/uploads')


@picture_bp.route('/api/picture', methods=['POST'])
def picture_create():
    data = request.form
    f = request.files['picture']
    file_name = f'{randint(0,10000)}{secure_filename(f.filename)}'
    img_path = os.path.join(upload_path, file_name)
    f.save(img_path)

    if not 'repo_id' in data:
        repo = Repository(username=session['username'], repo_name='General')
        db.session.add(repo)
        db.session.commit()
        picture = Picture(repo_id=repo.repo_id,
                        pic_name=data['pic_name'], img_path=file_name)
        db.session.add(repo)

    else:
        picture = Picture(repo_id=data['repo_id'],
                        pic_name=data['pic_name'], img_path=file_name)

    db.session.add(picture)
    db.session.commit()

    tags = data['tags'].split(', ')
    for tag in tags:
        db_tag = Tag.query.filter_by(tag_name=tag).first()
        if db_tag:
            db_tag.pictures.append(picture)
            continue
        db_tag = Tag(tag_name=tag)
        db.session.add(db_tag)
        db_tag.pictures.append(picture)

    db.session.commit()
    return {'message': 'Picture created'}, 201


@ picture_bp.route('/api/picture', methods=['GET'])
def get_images():
    pic_list = []
    pics_db = Picture.query.all()
    for pic in pics_db:
        tag_list = []
        for tag in pic.tags:
            tag_list.append(tag.tag_name)
            
        pic_list.append({
            'pic_id': pic.picture_id,
            'pic_name': pic.pic_name,
            'img_path': pic.img_path,
            'uploaded_date': pic.uploaded_date,
            'tags': tag_list
        })

    return {'pictures': pic_list}

@picture_bp.route('/api/picture/<string:pic_id>', methods=['GET'])
def picture_info(pic_id):
    pic_db = Picture.query.filter_by(picture_id=pic_id).first()
    tag_list = []
    for tag in pic_db.tags:
        tag_list.append(tag.tag_name)
    return {
        'pic_id': pic_db.picture_id,
        'pic_name': pic_db.pic_name,
        'username': pic_db.repository.username,
        'tags': tag_list,
        'uploaded_date': pic_db.uploaded_date,
        'img_path': pic_db.img_path
    }

@picture_bp.route('/api/picture', methods=['DELETE'])
def delete_pic():
    data = request.json
    pic_db = Picture.query.filter_by(picture_id=data['pic_id']).first()
    db.session.delete(pic_db)
    db.session.commit()
    return {'message': 'Picture deleted'}, 200