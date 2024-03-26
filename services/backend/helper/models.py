import datetime
import os
from app import db
from sqlalchemy.sql import func

class Message(db.Model):

    __tablename__ =  "message"

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    text = db.Column(db.Text())
    date = db.Column(db.DateTime,default=func.now(),nullable=False)

class authTokens(db.Model):

    __tablename__ = "auth_token"
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    token = db.Column(db.Text())
    date = db.Column(db.DateTime,default=func.now(),nullable=False)

class Artist(db.Model):

    __tablename__ = "artist"

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    text = db.Column(db.Text())
    date = db.Column(db.DateTime,default=func.now(),nullable=False)
'''
class SongList(db.Model):

    __tablename__ = "songname"

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)

'''