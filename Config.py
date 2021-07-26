from datetime import timedelta
import os


class Config(object):
    DEBUG = False
    CSRF_ENABLED = True
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=60)
    MAX_CONTENT_LENGTH = 16*1000*1000 # 16MB


class ProductionConfig(Config):
    DEBUG = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
