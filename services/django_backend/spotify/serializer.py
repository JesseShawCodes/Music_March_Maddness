from rest_framework import serializers

from spotify.models import SpotifyAuth

class SpotifySerializer(serializers.ModelSerializer):
  '''Spotify Serializer'''
  class Meta:
    model = SpotifyAuth
    fields = "__all__"

  def to_representation(self, instance):
    return super().to_representation(instance)
