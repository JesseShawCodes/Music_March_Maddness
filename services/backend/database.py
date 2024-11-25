import os
import requests

from sqlalchemy import Column, String, Integer, ForeignKey, create_engine, DateTime, JSON
from sqlalchemy.orm import registry, relationship, Session
from sqlalchemy.sql import func

engine = create_engine(os.environ["DATABASE_ENGINE"],
	echo=True)

mapper_registry = registry()

Base = mapper_registry.generate_base()

# Get new auth Token
def getAuth():
	d = {'grant_type': 'client_credentials', 'client_id': os.environ["SPOTIFY_CLIENT_ID"], 'client_secret': os.environ["SPOTIFY_CLIENT_SECRET"]}
	result = requests.post(os.environ["SPOTIFY_AUTH_URL"], data=d).json()
	return result

class SpotifyAuth(Base):
   __tablename__ = 'spotify_auth'

   auth_id = Column(Integer, primary_key=True)
   auth = Column(String(length=1000))

   time_created = Column(DateTime(timezone=True), server_default=func.now())

   def __repr__(self):
	   return "<SpotifyAuth(auth='{0}')>".format(self.auth)

class ArtistData(Base):
	__tablename__ = "artist_data"
	id = Column(Integer, primary_key=True)
	spotify_id = Column(String(length=1000))
	artist_name = Column(String(length=1000))
	artist_data = Column(JSON)
	artist_spotify_id = Column(String(length=1000))

	time_created = Column(DateTime(timezone=True), server_default=func.now())

	def __repr__(self):
		return "<ArtistData(artist_name='{0}')>".format(self.artist_name)	

Base.metadata.create_all(engine)

with Session(engine) as session:

   initial_spotify_auth = SpotifyAuth(auth=getAuth()['access_token'])
   session.add(initial_spotify_auth)
   session.flush()
   session.commit()
