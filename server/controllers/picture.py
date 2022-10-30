import os
from random import randint

from apifairy import other_responses, response
from app import db
from flask import Blueprint, request, session
from server.models.picture import Picture, Tag
from server.models.repository import Repository
from server.schemas import ListPicturesSchema, PictureSchema
from werkzeug.utils import secure_filename

picture = Blueprint("picture", __name__)

upload_path = os.path.abspath("server/uploads")


@picture.route("/api/picture", methods=["POST"])
@response(PictureSchema())
def picture_create():
    """Create a new picture

    If the repository does not exist, create a Default repository
    """
    form = request.form
    f = request.files["picture"]
    file_name = f"{randint(0,10000)}{secure_filename(f.filename)}"
    img_path = os.path.join(upload_path, file_name)
    f.save(img_path)

    # Create a Default Repo if user sends a picture without a repo
    if "repo_id" not in form:
        repo = Repository(username=session["username"], repo_name="Default")
        db.session.add(repo)
        db.session.commit()
        picture = Picture(
            repo_id=repo.repo_id, pic_name=form["pic_name"], img_path=file_name
        )

    else:
        picture = Picture(
            repo_id=form["repo_id"], pic_name=form["pic_name"], img_path=file_name
        )

    db.session.add(picture)

    # Add tags to picture
    tags = form["tags"].split(", ")
    for tag in tags:
        db_tag = Tag.query.filter_by(tag_name=tag).first()
        if not db_tag:
            db_tag = Tag(tag_name=tag)
            db.session.add(db_tag)

        db_tag.pictures.append(picture)

    db.session.commit()
    return picture, 201


@picture.route("/api/picture", methods=["GET"])
@response(ListPicturesSchema())
def get_images():
    """Get all uploaded images"""
    return {"pictures": Picture.query.all()}


@picture.route("/api/picture/<string:pic_id>", methods=["GET"])
@response(PictureSchema())
def picture_info(pic_id):
    """Get picture info"""
    return Picture.query.filter_by(picture_id=pic_id).first()


@picture.route("/api/picture", methods=["DELETE"])
@other_responses({200: "Picture deleted"})
def delete_pic():
    """Delete a picture"""
    data = request.json
    pic_db = Picture.query.filter_by(picture_id=data["pic_id"]).first()
    db.session.delete(pic_db)
    db.session.commit()
    return {"message": "Picture deleted"}, 200
