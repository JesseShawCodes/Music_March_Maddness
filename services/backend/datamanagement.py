import os
import requests

from sqlalchemy import select, desc
from sqlalchemy.orm import registry, relationship, Session

from flask import jsonify

from database import SpotifyAuth, engine

def get_newest_auth():

    with Session(engine) as session:
        smt = select(SpotifyAuth).order_by(desc(SpotifyAuth.time_created)).limit(1)
        result = session.execute(smt)
        most_recent_auth = result.scalar()

    return f"{most_recent_auth.auth}"

def delete_old_records():
    connection = engine.connect()
    records = connection.execute('SELECT * FROM spotify_auth')

   # Delete all records that are older than a certain date
    for record in records:
       if record['date'] < '2023-03-29':
           connection.execute('DELETE FROM table WHERE id = {}'.format(record['id']))

   # Commit the changes to the database
    connection.commit()

    # Close the connection to the database
    connection.close()
    return jsonify({"Success": True})