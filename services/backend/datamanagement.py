import os
import requests

from sqlalchemy.orm import registry, relationship, Session

from flask import jsonify

from database import SpotifyAuth, engine

def get_newest_auth():
    print("Get Newest Auth")
    return jsonify({"get_newest_auth": True})

def delete_old_records():
    print("Delete Old Records")
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