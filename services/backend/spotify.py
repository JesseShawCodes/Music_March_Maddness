import os
import requests

from sqlalchemy.orm import registry, relationship, Session

from flask import jsonify

from database import SpotifyAuth, engine

from datamanagement import get_newest_auth
def get_auth_token():
    d = {'grant_type': 'client_credentials', 'client_id': os.environ["SPOTIFY_CLIENT_ID"], 'client_secret': os.environ["SPOTIFY_CLIENT_SECRET"]}


    result = requests.post(os.environ["SPOTIFY_AUTH_URL"], data=d).json()

    # Update auth_token in database
    with Session(engine) as session:
        auth = SpotifyAuth(auth=result["access_token"])
        session.add(auth)
        session.commit()
    return result

'''
const getArtist = async (id) => {
    var auth = await SpotifyAuth.find({token_type: "Bearer"})
    var data = await spotifyApiRequest(`https://api.spotify.com/v1/artists/${id}`, auth[0].access_token, 'GET')
    return data
}

'''
def get_artist_details(artist_id):
    """ function to get artists """
    headers = {'Authorization': f"Bearer {get_newest_auth()}"}
    r = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}", headers=headers)
    print(r.json())
    return jsonify({"Artist": artist_id})

def check_request_status(status_code):
    print("Check status code")