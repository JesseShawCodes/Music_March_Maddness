'''Search functions to perform the initial artist search from the application search page.'''
import os
import requests
from apple.auth import get_auth_token, get_newest_auth

def artist_search(artist_name):
    '''Search for Artist Function'''
    headers = {'Authorization': f"Bearer  {get_newest_auth()}"}
    r = requests.get(
          f"{os.environ['apple_search_url']}{artist_name}&types=artists",
          headers=headers,
          timeout=5
        )
    if r.status_code != 200:
        headers = {'Authorization': f"Bearer  {get_auth_token()}"}
        r = requests.get(f"{os.environ['apple_search_url']}{artist_name}&types=artists",
                        headers=headers,
                        timeout=5
                      )
    return r
