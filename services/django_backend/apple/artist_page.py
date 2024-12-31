import os
import requests
import json
from django.http import JsonResponse
from apple.auth import get_auth_token, get_newest_auth

def artist_content(artist_id):
    output = {}
    output['top_songs_list'] = top_songs_list(artist_id)
    return output

def top_songs_list(artist_id):
    top_songs_list = []
    headers = {'Authorization': f"Bearer  {get_newest_auth()}"}
    # loop by intervals of 10
    for i in range(0,100,10):
        r = requests.get(
            f"https://api.music.apple.com/v1/catalog/us/artists/{artist_id}/view/top-songs?offset={i}",
            headers=headers,
            timeout=5
        )
        if r.status_code != 200:
          headers = {'Authorization': f"Bearer  {get_auth_token()}"}
          r = requests.get(f"https://api.music.apple.com/v1/catalog/us/artists/{artist_id}/view/top-songs?offset={i}",
                        headers=headers,
                        timeout=5
                      )
        if 'errors' in r.json().keys():
          break
        else:
          for song in r.json()['data']:
              top_songs_list.append(song)
    return top_songs_list
