from rest_framework.generics import ListAPIView

from spotify.serializer import SpotifySerializer

from spotify.models import SpotifyAuth

class AuthListView(ListAPIView):
  queryset = SpotifyAuth.objects.all()
  serializer_class = SpotifySerializer
