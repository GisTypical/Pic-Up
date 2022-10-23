from datetime import timedelta


class Config(object):
    DEBUG = False
    CSRF_ENABLED = True
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)
    MAX_CONTENT_LENGTH = 16*1000*1000 # 16MB
    APIFAIRY_TITLE = 'Pic-Up API'
    APIFAIRY_VERSION = '1.0'
    APIFAIRY_UI = 'elements'


class ProductionConfig(Config):
    DEBUG = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
