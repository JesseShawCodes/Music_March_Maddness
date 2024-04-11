import os
import requests

from sqlalchemy.orm import registry, relationship, Session

from flask import jsonify

from database import SpotifyAuth, engine

def get_auth_token():
    d = {'grant_type': 'client_credentials', 'client_id': os.environ["SPOTIFY_CLIENT_ID"], 'client_secret': os.environ["SPOTIFY_CLIENT_SECRET"]}


    result = requests.post(os.environ["SPOTIFY_AUTH_URL"], data=d).json()

    # Update auth_token in database
    with Session(engine) as session:
        auth = SpotifyAuth(auth=result["access_token"])
        session.add(auth)
        session.commit()
    return result

def get_artist_details(artist_name):
    """ function to get artists """
    headers = {'Authorization': "Bearer  BQBAwnJkpNOEvcZAC6OgBm8kbdJBPSW2UrjHmFST6monPYlazefK5R1yKJc4ktZ1ps6vKvSS-Xvq-9DotfV3ULjItoFWzg-WYUa7qePG2VCFkQvWf8U"}
    r = requests.get("https://api.spotify.com/v1/search?query='deftones'&type=artist", headers=headers)
    print(r.json())
    return jsonify({"Artist": artist_name})
