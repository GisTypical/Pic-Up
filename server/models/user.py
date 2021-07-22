from app import db
from sqlalchemy.orm import backref


class User_account(db.Model):
    username = db.Column(db.String(), primary_key=True, nullable=False)
    full_name = db.Column(db.String(), nullable=False)
    password = db.Column(db.String(), nullable=False)
    repositories = db.relationship(
        'Repository', backref='user_account', cascade='all, delete, delete-orphan', lazy=True)
