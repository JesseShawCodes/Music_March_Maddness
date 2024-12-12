# app/config.py
'''app/config.py file'''
import os

class BaseConfig:
    '''BaseConfig docstring'''
    DEBUG = True
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(BaseConfig):
    '''Development Config Docstring'''
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL")
    SECRET_KEY = os.environ.get("SECRET_KEY")
