from apifairy import body, other_responses, response
from app import db
from flask import Blueprint, session
from server.models.picture import Picture
from server.models.repository import Repository
from server.schemas import (ListRepoPicturesSchema, ListRepoSchema,
                            RepositorySchema)

repository = Blueprint("repository", __name__)


@repository.route("/api/repo", methods=["POST"])
@body(RepositorySchema(only=["repo_name"]))
@response(RepositorySchema(exclude=["pic_count"]))
def repo_create(repo):
    """Create a new repository"""

    created_repo = Repository(username=session["username"], repo_name=repo["repo_name"])
    db.session.add(created_repo)
    db.session.commit()

    return created_repo, 201


@repository.route("/api/repo", methods=["GET"])
@response(ListRepoSchema())
def list_repos():
    """List user repositories"""

    repos = db.session.execute(
        db.select(Repository).filter_by(
            username=session["username"]
        )
    ).scalars().all()

    for repo in repos:
        repo.pic_count = len(repo.pictures)

    return {"repos": repos}


# Get repo images and tags
@repository.route("/api/repo/<string:id>")
@response(ListRepoPicturesSchema())
def repo_pictures(id):
    """Get all pictures in a repository

    Get all pictures in a repository and the tags for each picture
    """

    pictures = db.session.execute(
        db.select(Picture).filter_by(repo_id=id)
    ).scalars().all()

    repo = db.session.execute(
        db.select(Repository.repo_name).filter_by(repo_id=id)
    ).one()

    return {"pictures": pictures, "repo_name": repo.repo_name}


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
