'''Spotify API Related Models'''
from django.db import models

class AppleAuthManager(models.Manager):
    '''Apple Music Auth Manage'''
    def add_auth(self, auth_code):
        '''Add Spotify Auth'''
        auth = self.create(auth=auth_code)
        return auth

class AppleAuth(models.Model):
    '''AppleAuth Class.'''
    auth = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)

    objects = AppleAuthManager()
