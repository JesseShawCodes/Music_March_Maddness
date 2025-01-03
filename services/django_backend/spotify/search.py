'''API Search Related Methods'''
import requests
from django.http import JsonResponse
from spotify.auth import get_newest_auth, get_auth_token

def get_artist_list(artist_name):
    """ function to get artists """
    headers = {'Authorization': f"Bearer  {get_newest_auth()}"}
    r = requests.get(
        f"https://api.spotify.com/v1/search?query={artist_name}&type=artist",
        headers=headers,
        timeout=5
      )
    print(r)
    if r.status_code != 200:
        print("Auth token needs to be refreshed")
        headers = {'Authorization': f"Bearer  {get_auth_token()}"}
        r = requests.get(f"https://api.spotify.com/v1/search?query={artist_name}&type=artist",
                         headers=headers,
                         timeout=5
                        )
    return JsonResponse(r.json())

def get_artist_details(artist_id):
    """ function to get artists """
    headers = {'Authorization': f"Bearer {get_newest_auth()}"}
    r = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}",
                     headers=headers,
                     timeout=5)
    print(r.json())
    return JsonResponse({"Artist": artist_id})
