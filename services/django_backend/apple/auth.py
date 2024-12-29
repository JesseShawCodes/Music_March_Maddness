'''Apple Music API Authorization Related Functions'''
import jwt
import time
import os
import requests

private_key = open(os.environ["apple_auth_key"]).read()
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

developer_token = jwt.encode(payload, private_key, algorithm="ES256", headers=headers)

print("Developer Token:", developer_token)

'''
def get_auth_token():
    d = {
      'grant_type': 'client_credentials', 
      'client_id': os.environ["spotify_client_id"], 
      'client_secret': os.environ["spotify_client_secret"]
      }

    result = requests.post(os.environ["spotify_auth_url"], data=d, timeout=5).json()

    AppleAuth.objects.add_auth(result['access_token'])

    return result

def get_newest_auth():
    return AppleAuth.objects.order_by('-created').first().auth
'''