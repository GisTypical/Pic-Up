import bcrypt
from apifairy import body, other_responses, response
from app import db
from flask import Blueprint, session
from server.models.user import User_account
from server.schemas import LoginSchema, UpdateSchema, UserFullNameSchema, UserSchema

user = Blueprint("user", __name__)
sign_up_schema = UserSchema()
login_schema = LoginSchema()
full_name_schema = UserFullNameSchema()
update_schema = UpdateSchema()


@user.route("/api/signup", methods=["POST"])
@body(sign_up_schema)
@other_responses({201: "User successfully created", 409: "Username already exists"})
def user_signup(user):
    """Register a new user"""

    duplicate = User_account.query.get(user["username"])
    if duplicate:
        return {"message": "Username already exists"}, 409

    hashed_pass = bcrypt.hashpw(user["password"].encode(), bcrypt.gensalt())

    user = User_account(
        username=user["username"],
        full_name=user["full_name"],
        password=hashed_pass.decode(),
    )

    db.session.add(user)
    db.session.commit()
    return {"message": "User successfully created"}, 201


@user.route("/api/login", methods=["POST"])
@body(login_schema)
@other_responses({200: "Authentication successful", 401: "Wrong credentials"})
def user_login(user):
    """Authenticate a user"""

    db_user = User_account.query.get(user["username"])

    if not db_user or not bcrypt.checkpw(
        user["password"].encode(), db_user.password.encode()
    ):
        return {"message": "Wrong credentials"}, 401

    # Set session
    session["username"] = db_user.username

    return {"message": "Authentication successful"}, 200


@user.route("/api/user", methods=["GET"])
@response(full_name_schema)
def user_fullname():
    """Get the full name of the current user"""

    user_db = User_account.query.get(session["username"])

    return {"full_name": user_db.full_name}, 200


@user.route("/api/user", methods=["PUT"])
@body(update_schema)
@other_responses({200: "Changes made successfully"})
def update_user(user):
    """Update the current user"""

    db_user = User_account.query.get(session["username"])

    if user["full_name"]:
        db_user.full_name = user["full_name"]

    if user["password"]:
        hashed_pass = bcrypt.hashpw(user["password"].encode(), bcrypt.gensalt())
        db_user.password = hashed_pass.decode()

    db.session.commit()
    return {"message": "Changes made successfully"}, 200


@user.route("/api/user", methods=["DELETE"])
@other_responses({200: "User deleted successfully"})
def user_delete():
    """Delete the current user"""

    db_user = User_account.query.get(session["username"])
    db.session.delete(db_user)

    db.session.commit()

    session.pop("username")

    return {"message": "User deleted"}, 200


@user.route("/api/loggedin", methods=["GET"])
@other_responses({200: "User's username"})
def user_loggedin():
    """Check if the user is logged in"""

    if "username" in session:
        return session["username"], 200
    return "", 200


@user.route("/api/logout", methods=["DELETE"])
@other_responses({200: "Logged out"})
def user_logout():
    """Log out the current user"""

    session.pop("username")
    return {"message": "Logged out"}, 200
