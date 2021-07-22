import uuid
from datetime import datetime

from app import db
from sqlalchemy.dialects.postgresql import UUID


class Picture(db.Model):
    picture_id = db.Column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    repo_id = db.Column(UUID(as_uuid=True), db.ForeignKey(
        'repository.repo_id', ondelete='cascade'), nullable=False)
    pic_name = db.Column(db.String, nullable=False)
    img_path = db.Column(db.String, nullable=False)
    uploaded_date = db.Column(db.DateTime, default=datetime.now)
