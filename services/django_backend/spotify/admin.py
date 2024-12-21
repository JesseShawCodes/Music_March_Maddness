from django.contrib import admin

# Register your models here.

from . import models

class SpotifyAdmin(admin.ModelAdmin):
    list_display = ('auth',)

admin.site.register(models.SpotifyAuth, SpotifyAdmin)
