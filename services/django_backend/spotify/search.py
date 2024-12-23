'''API Search Related Methods'''
import requests
from django.http import JsonResponse
from spotify.auth import get_newest_auth

def get_artist_details(artist_id):
    """ function to get artists """
    headers = {'Authorization': f"Bearer {get_newest_auth()}"}
    r = requests.get(f"https://api.spotify.com/v1/artists/{artist_id}",
                     headers=headers,
                     timeout=5)
    print(r.json())
    return JsonResponse({"Artist": artist_id})
