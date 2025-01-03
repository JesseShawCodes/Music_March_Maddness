'''Authorization Related Functions'''
import os
import requests
from spotify.models import SpotifyAuth

def get_auth_token():
    '''Get Spotify Auth Token'''
    d = {
      'grant_type': 'client_credentials', 
      'client_id': os.environ["spotify_client_id"], 
      'client_secret': os.environ["spotify_client_secret"]
      }

    result = requests.post(os.environ["spotify_auth_url"], data=d, timeout=5).json()

    SpotifyAuth.objects.add_auth(result['access_token'])

    return result

def get_newest_auth():
    '''Returns newest auth key as a string'''
    return SpotifyAuth.objects.order_by('-created').first().auth
