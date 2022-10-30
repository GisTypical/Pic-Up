from app import ma

from server.models.picture import Picture
from server.models.repository import Repository
from server.models.user import User_account


# ---- User Schemas ----


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User_account
        ordered = True

    username = ma.auto_field(required=True)
    full_name = ma.auto_field(required=True)
    password = ma.auto_field(required=True, load_only=True)
    repositories = ma.auto_field(dump_only=True)


class LoginSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User_account
        ordered = True

    username = ma.auto_field(required=True)
    password = ma.auto_field(required=True, load_only=True)


class UpdateSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User_account
        ordered = True

    full_name = ma.auto_field(required=True)
    password = ma.auto_field(required=True, load_only=True)


class UserFullNameSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User_account
        ordered = True

    full_name = ma.auto_field(required=True)


# ---- Repository Schema ----


class RepositorySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Repository
        ordered = True

    repo_id = ma.auto_field(dump_only=True)
    username = ma.auto_field(dump_only=True)
    repo_name = ma.auto_field(required=True)
    last_mod = ma.auto_field(dump_only=True)
    pic_count = ma.Int(dump_only=True)


# ---- Picture Schema ----


class PictureSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Picture
        ordered = True

    picture_id = ma.auto_field(dump_only=True)
    pic_name = ma.auto_field(required=True)
    img_path = ma.auto_field(dump_only=True)
    uploaded_date = ma.auto_field(dump_only=True)
    picture_file = ma.String(load_only=True)
    tags = ma.auto_field(dump_only=True)
    secure_url = ma.String(dump_only=True)
    repository = ma.Nested(RepositorySchema)


class ListPicturesSchema(ma.Schema):
    pictures = ma.List(ma.Nested(PictureSchema))


class ListRepoSchema(ma.Schema):
    repos = ma.List(
        ma.Nested(
            RepositorySchema
        )
    )


class ListRepoPicturesSchema(ma.Schema):
    repo_name = ma.Str()
    pictures = ma.List(
        ma.Nested(
            PictureSchema,
            exclude=["repository"],
        )
    )
