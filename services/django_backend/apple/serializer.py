from rest_framework import serializers

from apple.models import AppleAuth

class AppleSerializer(serializers.ModelSerializer):
  '''Spotify Serializer'''
  class Meta:
    model = AppleAuth
    fields = "__all__"
