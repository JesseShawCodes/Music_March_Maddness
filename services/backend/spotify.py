'''Spotify Specific Functions'''
import os
import requests

from sqlalchemy.orm import Session

from flask import jsonify

from database import SpotifyAuth, engine

from datamanagement import get_newest_auth
def get_auth_token():
    '''Get Spotify Auth Token'''
    d = {
      'grant_type': 'client_credentials', 
      'client_id': os.environ["SPOTIFY_CLIENT_ID"], 
      'client_secret': os.environ["SPOTIFY_CLIENT_SECRET"]
      }

    result = requests.post(os.environ["SPOTIFY_AUTH_URL"], data=d, timeout=5).json()

    # Update auth_token in database
    with Session(engine) as session:
        auth = SpotifyAuth(auth=result["access_token"])
        session.add(auth)
        session.commit()
    return result

def get_artist_details(artist_id):
    """ function to get artists """
    headers = {'Authorization': f"Bearer {get_newest_auth()}"}
    r = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}",
                     headers=headers,
                     timeout=5)
    print(r.json())
    return jsonify({"Artist": artist_id})

def check_request_status():
    '''Check Request Status Function.'''
    print("Check status code")
