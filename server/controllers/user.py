import bcrypt
from app import db
from flask import Blueprint, request, session
from server.models.user import User_account

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/api/signup', methods=['POST'])
def user_signup():
    data = request.json
    duplicate = User_account.query.filter_by(username=data['username']).first()

    if duplicate:
        return {'message': 'Username already exists'}, 409

    hashed_pass = bcrypt.hashpw(data['password'].encode(), bcrypt.gensalt())
    user = User_account(
        username=data['username'], full_name=data['full_name'], password=hashed_pass.decode())
    db.session.add(user)
    db.session.commit()
    return {'message': 'User created'}, 201


@user_bp.route('/api/login', methods=['POST'])
def user_login():
    data = request.json
    db_user = User_account.query.filter_by(username=data['username']).first()

    if not db_user or not bcrypt.checkpw(data['password'].encode(), db_user.password.encode()):
        return {'message': 'Wrong credentials'}, 401

    session['username'] = db_user.username

    return {'message': 'Autentication successful'}, 200


@user_bp.route('/api/loggedin', methods=['GET'])
def user_loggedin():
    if 'username' in session:
        return session['username'], 200
    return '', 200


@user_bp.route('/api/user', methods=['PUT'])
def update_user():
    data = request.json
    db_user = User_account.query.filter_by(username=data['username']).first()

    if not 'full_name' in data and not 'password' in data:
        return {'message': 'No changes were made'}, 400

    if 'full_name' in data:
        db_user.full_name = data['full_name']

    if 'password' in data:
        hashed_pass = bcrypt.hashpw(
            data['password'].encode(), bcrypt.gensalt())
        db_user.password = hashed_pass.decode()

    db.session.commit()
    return {'message': 'Changes made successfully'}, 200


@user_bp.route('/api/user', methods=['DELETE'])
def user_delete():
    data = request.json
    db_user = User_account.query.filter_by(username=data['username']).first()
    db.session.delete(db_user)
    db.session.commit()
    return {'message': 'User deleted'}


@user_bp.route('/api/logout', methods=['DELETE'])
def user_logout():
    session.pop('username')
    return {'message': 'Logged out'}, 200
