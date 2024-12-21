from django.db import models

# Create your models here.

class SpotifyAuthManager(models.Manager):
    def add_auth(self, auth_code):
        auth = self.create(code=auth_code)
        return auth

class SpotifyAuth(models.Model):
    auth = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)

    objects = SpotifyAuthManager()

# auth = SpotifyAuth.objects.add_auth("slakjdflsjdflj")
