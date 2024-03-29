# app.py
from flask import Flask, request, jsonify, render_template, request, flash, url_for, redirect, abort, make_response
from flask_sqlalchemy import SQLAlchemy
import os
import requests

from spotify import *

app = Flask(__name__)

# get and jsonify the data
@app.route("/artists/")
def get_artist_list():
    """ function to get artists """
    r = requests.get('https://httpbin.org/basic-auth/user/pass', auth=('user', 'pass'))
    return jsonify(r.json())

# get and jsonify the data
@app.route("/artists/<artist_name>")
def get_artist_details(artist_name):
    """ function to get artists """
    headers = {'Authorization': "Bearer  BQBAwnJkpNOEvcZAC6OgBm8kbdJBPSW2UrjHmFST6monPYlazefK5R1yKJc4ktZ1ps6vKvSS-Xvq-9DotfV3ULjItoFWzg-WYUa7qePG2VCFkQvWf8U"}
    r = requests.get("https://api.spotify.com/v1/search?query='deftones'&type=artist", headers=headers)
    print(r.json())
    return jsonify({"Artist": artist_name})

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


@app.route('/query-example')
def query_example():
    # if key doesn't exist, returns None
    language = request.args.get('language')

    # if key doesn't exist, returns a 400, bad request error
    framework = request.args['framework']

    # if key doesn't exist, returns None
    website = request.args.get('website')

    return '''
              <h1>The language value is: {}</h1>
              <h1>The framework value is: {}</h1>
              <h1>The website value is: {}'''.format(language, framework, website)

# allow both GET and POST requests
@app.route('/form-example', methods=['GET', 'POST'])
def form_example():
    # handle the POST request
    if request.method == 'POST':
        language = request.form.get('language')
        framework = request.form.get('framework')
        return '''
                  <h1>The language value is: {}</h1>
                  <h1>The framework value is: {}</h1>'''.format(language, framework)

    # otherwise handle the GET request
    return '''
           <form method="POST">
               <div><label>Language: <input type="text" name="language"></label></div>
               <div><label>Framework: <input type="text" name="framework"></label></div>
               <input type="submit" value="Submit">
           </form>'''

# GET requests will be blocked
@app.route('/json-example', methods=['GET'])
def json_example():
    return jsonify(
        username='g.user.username',
        email='g.user.email',
        id='g.user.id'
    )


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')