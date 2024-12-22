from django.apps import AppConfig
import os
import requests

class SpotifyConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'spotify'

def get_auth_token():
    '''Get Spotify Auth Token'''
    d = {
      'grant_type': 'client_credentials', 
      'client_id': os.environ["SPOTIFY_CLIENT_ID"], 
      'client_secret': os.environ["SPOTIFY_CLIENT_SECRET"]
      }

    result = requests.post(os.environ["SPOTIFY_AUTH_URL"], data=d, timeout=5).json()

    