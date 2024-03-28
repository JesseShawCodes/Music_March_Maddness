import os

print(os.environ["DATABASE_URL"])

from sqlalchemy import Column, String, Integer, ForeignKey, create_engine, DateTime
from sqlalchemy.orm import registry, relationship, Session
from sqlalchemy.sql import func
engine = create_engine(os.environ["DATABASE_ENGINE"],
	echo=True)

mapper_registry = registry()

Base = mapper_registry.generate_base()

class Project(Base):
	__tablename__ = 'projects'
	project_id = Column(Integer, primary_key=True)
	title = Column(String(length=50))
	description = Column(String(length=50))

	def __repr__(self):
		return "<Project(title='{0}, description='{1}')>".format(
			self.title, self.description)

class Task(Base):
	__tablename__ = 'tasks'
	task_id = Column(Integer, primary_key=True)
	project_id = Column(Integer, ForeignKey('projects.project_id'))
	description = Column(String(length=50))

	project = relationship("Project")

	def __repr__(self):
		return "<Task(description='{0}')>".format(self.description)

class SpotifyAuth(Base):
   __tablename__ = 'spotify_auth'

   auth_id = Column(Integer, primary_key=True)
   auth = Column(String(length=1000))

   time_created = Column(DateTime(timezone=True), server_default=func.now())

   def __repr__(self):
	   return "<SpotifyAuth(auth='{0}')>".format(self.auth)

Base.metadata.create_all(engine)

with Session(engine) as session:

   initial_spotify_auth = SpotifyAuth(auth="test_auth")
   session.add(initial_spotify_auth)
   session.commit()
   









