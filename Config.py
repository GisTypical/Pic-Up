from datetime import timedelta
import os

# SqlAlchemy does not allow postgres:// anymore, change into postgresql://
uri = os.environ["DATABASE_URL"]
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)


class Config(object):
    DEBUG = False
    CSRF_ENABLED = True
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)
    MAX_CONTENT_LENGTH = 16 * 1000 * 1000  # 16MB
    APIFAIRY_TITLE = "Pic-Up API"
    APIFAIRY_VERSION = "1.0"
    APIFAIRY_UI = "elements"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = uri
    SECRET_KEY = os.environ["SECRET_KEY"]


class ProductionConfig(Config):
    DEBUG = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
