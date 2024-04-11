# app.py
from flask import Flask, request, jsonify, render_template, request, flash, url_for, redirect, abort, make_response
from flask_sqlalchemy import SQLAlchemy
import os
import requests

from flask_cors import CORS, cross_origin

from spotify import *
from datamanagement import delete_old_records, get_newest_auth

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# get and jsonify the data
@app.route("/artists/")
def get_artist_list():
    """ function to get artists """
    r = requests.get('https://httpbin.org/basic-auth/user/pass', auth=('user', 'pass'))
    return jsonify(r.json())

# get and jsonify the data
@app.route("/artists/<artist_name>")
@cross_origin()
def get_artist_details(artist_name):
    """ function to get artists """
    headers = {'Authorization': "Bearer  BQD0C6roenoH7reC3_FPauoCw8cPsHmSf0iyAcbHxxmL2vAduegDJd7HCny38XqOH1p2xmMuQJjSPto3TJhaT4k-"}
    r = requests.get(f"https://api.spotify.com/v1/search?query={artist_name}&type=artist", headers=headers)
    if r.status_code != 200:
        token = get_auth_token()['access_token']
        headers = {'Authorization': f"Bearer  {token}"}
        r = requests.get(f"https://api.spotify.com/v1/search?query={artist_name}&type=artist", headers=headers)
    return jsonify(r.json())

'''
Spotify Authorizations
'''

@app.route("/get_auth_token")
def get_auth_token_route():
    return get_auth_token()


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
