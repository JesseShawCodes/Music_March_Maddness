'''Apple Music API Authorization Related Functions'''
import jwt
import time
import os
from apple.models import AppleAuth

def get_auth_token():

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
  AppleAuth.objects.add_auth(developer_token)
  return developer_token

def get_newest_auth():
  return AppleAuth.objects.order_by('-created').first().auth

print("Developer Token:", get_auth_token())
