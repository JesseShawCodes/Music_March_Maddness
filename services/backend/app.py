# app.py
from flask import Flask, request, jsonify, render_template, request, flash, url_for, redirect, abort, make_response
from flask_sqlalchemy import SQLAlchemy
import os
import requests

from flask_cors import CORS, cross_origin

from database import getAuth
from spotify import *
from datamanagement import delete_old_records, get_newest_auth

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
from database import ArtistData, engine

'''
# get and jsonify the data
@app.route("/artists/")
def get_artist_list():
    """ function to get artists """
    r = requests.get('https://httpbin.org/basic-auth/user/pass', auth=('user', 'pass'))
    return jsonify(r.json())
'''
# get and jsonify the data
@app.route("/artists/<artist_name>")
@cross_origin()
def get_artist_list(artist_name):
    """ function to get artists """
    headers = {'Authorization': f"Bearer  {get_newest_auth()}"}
    r = requests.get(f"https://api.spotify.com/v1/search?query={artist_name}&type=artist", headers=headers)
    if r.status_code != 200:
        token = get_auth_token()
        headers = {'Authorization': f"Bearer  {get_newest_auth()}"}
        r = requests.get(f"https://api.spotify.com/v1/search?query={artist_name}&type=artist", headers=headers)
    return jsonify(r.json())

@app.route("/artist_page/<artist_id>")
@cross_origin()
def get_artist_info(artist_id):

        
    headers = {'Authorization': f"Bearer  {get_newest_auth()}"}
    artist = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}", headers=headers)

    if artist.status_code != 200:
        token = getAuth()
        headers = {'Authorization': f"Bearer  {token}"}
        artist = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}", headers=headers)
    
    artist = artist.json()
    tracks = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}/top-tracks?market=US", headers=headers)
    albums = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}/albums", headers=headers)
    # Use the Get ALBUMS Request
    # https://developer.spotify.com/documentation/web-api/reference/get-multiple-albums
    # multiple_albums = requests.get(f"https://api.spotify.com/v1/albums?ids=0VEFy5MsBiq0u2lWL0OwOd", headers=headers)
    albums = albums.json()



    all_tracks = []
    for album in albums["items"]:
        url = f"https://api.spotify.com/v1/albums/{album['id']}"
        details = requests.get(url, headers=headers)
        details = details.json()
        all_tracks.append(details)
        album["popularity"] = details['popularity']
    
    return jsonify({
        "artist": artist,
        "tracks": tracks.json(),
        "albums": albums,
        "all_tracks": all_tracks
    })

'''
Spotify Authorizations
'''

@app.route("/get_auth_token")
def get_auth_token_route():
    return get_auth_token()

@app.route("/get_newest_auth")
def get_newest_auth_route():
    return get_newest_auth()

#error handling
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"error": "not found!"}), 404)

@app.errorhandler(400)
def not_found(error):
    return make_response(jsonify({"error": "Bad request!"}), 400)

@app.route("/remove_old_records")
def remove_old_records_auth():
    return delete_old_records()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
