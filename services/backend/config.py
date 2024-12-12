'''Config file for app backend.'''
import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    '''Config defaults'''
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True

class ProductionConfig(Config):
    '''Production Config'''
    DEBUG = False


class StagingConfig(Config):
    '''Staging Config'''
    DEVELOPMENT = True
    DEBUG = True


class DevelopmentConfig(Config):
    '''Development Config'''
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    '''Testing Config'''
    TESTING = True
