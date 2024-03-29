import os
import requests


def get_auth_token():
    print(os)
    d = {'grant_type': 'client_credentials', 'client_id': os.environ["SPOTIFY_CLIENT_ID"], 'client_secret': os.environ["SPOTIFY_CLIENT_SECRET"]}
    return requests.post(os.environ["SPOTIFY_AUTH_URL"], data=d).json()