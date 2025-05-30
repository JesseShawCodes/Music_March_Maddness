'''Apple Music API Authorization Related Functions'''
import time
import os
import jwt as pyjwt
from apple_search.models import AppleAuth

def get_auth_token():
    '''Initial Get Auth Token. This should run if newest auth_token has expired'''
    private_key = os.environ['apple_auth_key'].replace('\\n', '\n')
    key_id = os.environ["apple_key_id"]
    team_id = os.environ["apple_team_id"]

    headers = {
      "alg": "ES256",
      "kid": key_id
    }

    payload = {
      "iss": team_id,
      "iat": int(time.time()),
      "exp": int(time.time()) + 3600,
    }

    developer_token = pyjwt.encode(payload, private_key, algorithm="ES256", headers=headers)
    AppleAuth.objects.add_auth(developer_token)
    return developer_token

def get_newest_auth():
    '''Get the newest auth token from database.'''
    return AppleAuth.objects.order_by('-created').first().auth
