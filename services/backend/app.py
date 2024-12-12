# app.py
'''
This is the main app.py file that serves as the foundation for the backend
'''
from flask import Flask, jsonify
import requests

from flask_cors import CORS, cross_origin

import database
from datamanagement import get_newest_auth

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# get and jsonify the data
@app.route("/artists/<artist_name>")
@cross_origin()
def get_artist_list(artist_name):
    """ function to get artists """
    headers = {'Authorization': f"Bearer  {get_newest_auth()}"}
    r = requests.get(
        f"https://api.spotify.com/v1/search?query={artist_name}&type=artist",
        headers=headers,
        timeout=5
      )
    if r.status_code != 200:
        headers = {'Authorization': f"Bearer  {get_newest_auth()}"}
        r = requests.get(f"https://api.spotify.com/v1/search?query={artist_name}&type=artist",
                         headers=headers,
                         timeout=5
                        )
    return jsonify(r.json())

@app.route("/artist_page/<artist_id>")
@cross_origin()
def get_artist_info(artist_id):
    '''Gets artist page content.'''
    headers = {'Authorization': f"Bearer  {get_newest_auth()}"}
    artist = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}",
                          headers=headers,
                          timeout=5
                          )

    if artist.status_code != 200:
        token = database.get_auth()
        headers = {'Authorization': f"Bearer  {token}"}
        artist = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}",
                              headers=headers,
                              timeout=5
                              )

    artist = artist.json()
    tracks = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=US",
                          headers=headers,
                          timeout=5
                          )
    albums = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}/albums",
                          headers=headers,
                          timeout=5
                          )

    albums = albums.json()

    all_tracks = []
    for album in albums["items"]:
        url = f"https://api.spotify.com/v1/albums/{album['id']}"
        details = requests.get(url, headers=headers, timeout=5)
        details = details.json()
        all_tracks.append(details)
        album["popularity"] = details['popularity']

    return jsonify({
        "artist": artist,
        "tracks": tracks.json(),
        "albums": albums,
        "all_tracks": all_tracks
    })

@app.route("/get_newest_auth")
def get_newest_auth_route():
    """Gets newest auth route"""
    return get_newest_auth()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
