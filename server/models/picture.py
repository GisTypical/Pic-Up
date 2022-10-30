import uuid
from datetime import datetime

from app import db
from sqlalchemy.dialects.postgresql import UUID

tags = db.Table(
    "picture_tag",
    db.Column("tag_name", db.String, db.ForeignKey("tag.tag_name"), primary_key=True),
    db.Column(
        "picture_id",
        UUID(as_uuid=True),
        db.ForeignKey("picture.picture_id", ondelete="cascade"),
        primary_key=True,
    ),
)


class Picture(db.Model):
    picture_id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    repo_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey("repository.repo_id", ondelete="cascade"),
        nullable=False,
    )
    tags = db.relationship(
        "Tag",
        secondary=tags,
        cascade="all, delete",
        lazy="subquery",
        backref=db.backref("pictures", lazy=True),
    )
    pic_name = db.Column(db.String, nullable=False)
    img_path = db.Column(db.String)
    public_id = db.Column(db.String)
    secure_url = db.Column(db.String)
    uploaded_date = db.Column(db.DateTime, default=datetime.now)


class Tag(db.Model):
    tag_name = db.Column(db.String, primary_key=True)
