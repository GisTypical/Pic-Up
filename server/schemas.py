from app import ma
from server.models.picture import Picture
from server.models.repository import Repository
from server.models.user import User_account


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


"""Picture Schema"""


class PictureSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Picture
        ordered = True

    pic_id = ma.String()
    repo_id = ma.auto_field()
    pic_name = ma.auto_field()
    img_path = ma.auto_field()
    uploaded_date = ma.auto_field()
    tags = ma.List(ma.String())
    picture = ma.String(load_only=True)


class ListPicturesSchema(ma.Schema):
    pictures = ma.List(ma.Nested(PictureSchema, exclude=['repo_id']))


"""Repo Schema"""


class RepositorySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Repository
        ordered = True

    repo_id = ma.auto_field()
    username = ma.auto_field()
    repo_name = ma.auto_field()
    last_mod = ma.auto_field()
    pictures = ma.auto_field(dump_only=True)
    number_pics = ma.Int(dump_only=True)


class ListRepoSchema(ma.Schema):
    repos = ma.List(
        ma.Nested(
            RepositorySchema,
            exclude=["pictures"],
        )
    )


class ListRepoPicturesSchema(ma.Schema):
    repo_name = ma.Str()
    pictures = ma.List(
        ma.Nested(
            PictureSchema,
            exclude=["repo_id"],
        )
    )
