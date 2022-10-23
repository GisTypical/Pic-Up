from apifairy import body, other_responses, response
from app import db
from flask import Blueprint, request, session
from server.models.repository import Repository
from server.schemas import ListRepoPicturesSchema, ListRepoSchema, RepositorySchema

repository = Blueprint("repository", __name__)
repo_schema = RepositorySchema()
post_repo_schema = RepositorySchema(only=['repo_name'])
list_repo_schema = ListRepoSchema()
list_picture_schema = ListRepoPicturesSchema()

@repository.route("/api/repo", methods=["POST"])
@body(post_repo_schema)
@response(repo_schema)
def repo_create(repo):
    """Create a new repository"""

    created_repo = Repository(username=session["username"], repo_name=repo["repo_name"])
    db.session.add(created_repo)
    db.session.commit()

    return created_repo, 201

@repository.route("/api/repo", methods=["GET"])
@response(list_repo_schema)
def list_repos():
    """List user repositories"""

    repos = Repository.query.filter_by(username=session["username"]).all()
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

    return {"repos": repo_list}


# Get repo images and tags
@repository.route("/api/repo/<string:id>")
@response(list_picture_schema)
def repo_pictures(id):
    """Get all pictures in a repository

    Get all pictures in a repository and the tags for each picture
    """

    repo_db = Repository.query.filter_by(repo_id=id).first()
    pic_list = []
    for pic in repo_db.pictures:
        # Get tags for each picture - max 2 tags (this can be refactored)
        tag_list = []
        if pic.tags:
            # If there is one tag, just add it to the list
            tag_list.append(pic.tags[0].tag_name)
            # If there are more than 1 tag, add the first 2 tags to the list
            if len(pic.tags) > 1:
                tag_list.clear()
                for i in range(2):
                    tag_list.append(pic.tags[i].tag_name)

        pic_list.append(
            {
                "pic_id": pic.picture_id,
                "pic_name": pic.pic_name,
                "img_path": pic.img_path,
                "uploaded_date": pic.uploaded_date,
                "tags": tag_list,
            }
        )

    return {"pictures": pic_list, "repo_name": repo_db.repo_name}


@repository.route("/api/repo/<string:id>", methods=["DELETE"])
@other_responses({404: "Repo not found", 200: "Repo deleted"})
def delete_repo(id):
    """Delete a repository"""

    repo = Repository.query.get(id)
    if not repo:
        return {"message": "Repo not found"}, 404
    db.session.delete(repo)
    db.session.commit()
    return {"message": "Repo deleted"}
