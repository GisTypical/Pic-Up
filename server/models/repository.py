import uuid
from datetime import datetime

from app import db
from sqlalchemy.dialects.postgresql.base import UUID


class Repository(db.Model):
    repo_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = db.Column(
        db.String,
        db.ForeignKey("user_account.username", ondelete="cascade"),
        nullable=False,
    )
    repo_name = db.Column(db.String, nullable=False)
    last_mod = db.Column(db.DateTime, default=datetime.now)
    pictures = db.relationship(
        "Picture", backref="repository", cascade="all, delete, delete-orphan", lazy=True
    )
