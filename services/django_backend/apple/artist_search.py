'''Search functions to perform the initial artist search from the application search page.'''
import os
import requests
import json
from django.http import JsonResponse
from apple.auth import get_auth_token, get_newest_auth

def artist_search(artist_name):
    '''Search for Artist Function'''
    headers = {'Authorization': f"Bearer  {get_newest_auth()}"}
    r = requests.get(
          f"{os.environ['apple_search_url']}{artist_name}&types=artists&limit=20",
          headers=headers,
          timeout=5
        )
    if r.status_code != 200:
        headers = {'Authorization': f"Bearer  {get_auth_token()}"}
        r = requests.get(f"{os.environ['apple_search_url']}{artist_name}&types=artists&limit=20",
                        headers=headers,
                        timeout=5
                      )
    return format_images(r)

def format_images(data):
    result1 = data.json()
    for result in result1['results']['artists']['data']:
        if "artwork" in result['attributes']:
          formatted_url = result['attributes']['artwork']['url']
          formatted_url = formatted_url.replace('{w}', "400")
          formatted_url = formatted_url.replace('{h}', "400")
          result['attributes']['artwork']['url'] = formatted_url
    return result1
    
