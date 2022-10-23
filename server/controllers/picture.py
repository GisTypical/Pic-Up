import os
from random import randint

from app import db
from flask import Blueprint, request, session
from server.models.picture import Picture, Tag
from server.models.repository import Repository
from werkzeug.utils import secure_filename
from apifairy import body, other_responses, response

from server.schemas import ListPicturesSchema, PictureSchema

picture = Blueprint('picture', __name__)
picture_schema = PictureSchema(only=['repo_id', 'pic_name', 'tags', 'picture'])
list_pictures_schema = ListPicturesSchema()
picture_info_schema = PictureSchema()

upload_path = os.path.abspath('server/uploads')


@picture.route('/api/picture', methods=['POST'])
@body(picture_schema)
def picture_create(picture):
    """Create a new picture

    If the repository does not exist, create a Default repository
    """
    f = request.files['picture']
    file_name = f'{randint(0,10000)}{secure_filename(f.filename)}'
    img_path = os.path.join(upload_path, file_name)
    f.save(img_path)

    if not 'repo_id' in picture:
        repo = Repository(username=session['username'], repo_name='Default')
        db.session.add(repo)
        db.session.commit()
        picture = Picture(repo_id=repo.repo_id,
                        pic_name=picture['pic_name'], img_path=file_name)
        db.session.add(repo)

    else:
        picture = Picture(repo_id=picture['repo_id'],
                        pic_name=picture['pic_name'], img_path=file_name)

    db.session.add(picture)
    db.session.commit()

    tags = picture['tags'].split(', ')
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


@ picture.route('/api/picture', methods=['GET'])
@response(list_pictures_schema)
def get_images():
    """Get all uploaded images"""

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

@picture.route('/api/picture/<string:pic_id>', methods=['GET'])
@response(picture_info_schema)
def picture_info(pic_id):
    """Get picture info"""
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

@picture.route('/api/picture', methods=['DELETE'])
@other_responses({200: 'Picture deleted'})
def delete_pic():
    """Delete a picture"""
    data = request.json
    pic_db = Picture.query.filter_by(picture_id=data['pic_id']).first()
    db.session.delete(pic_db)
    db.session.commit()
    return {'message': 'Picture deleted'}, 200
