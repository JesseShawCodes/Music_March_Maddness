from rest_framework import serializers

from spotify.models import SpotifyAuth

class SpotifySerializer(serializers.ModelSerializer):
  '''Spotify Serializer'''
  class Meta:
    model = SpotifyAuth
    fields = "__all__"
