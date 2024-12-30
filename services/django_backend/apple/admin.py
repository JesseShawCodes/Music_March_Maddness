from django.contrib import admin

# Register your models here.

from . import models

class AppleAdmin(admin.ModelAdmin):
    list_display = ('auth',)

class ArtistAdmin(admin.ModelAdmin):
    list_display = ('artist_name','artist_id')

admin.site.register(models.AppleAuth, AppleAdmin)
admin.site.register(models.ArtistDetails, ArtistAdmin)