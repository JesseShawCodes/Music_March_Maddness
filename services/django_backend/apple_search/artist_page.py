'''Data Collection for artist page'''
import os
import requests
from apple_search.auth import get_auth_token, get_newest_auth
from apple_search.artist_search import format_image

def artist_content(artist_id):
    '''Final render of output to the page'''
    output = {}
    artist_details = get_artist_high_level_details(artist_id)
    output['artist_name'] = artist_details['name']
    output['artist_image'] = format_image(artist_details['image_url'])
    output['featured_albums'] = featured_album_details(artist_id)
    if "errors" in output['featured_albums']:
        output['top_songs_list'] = add_weight_to_songs(
          top_songs_list_builder(artist_id),
          []
        )
    else:
        output['top_songs_list'] = add_weight_to_songs(
            top_songs_list_builder(artist_id),
            output['featured_albums']['data']
        )
    return output

def get_artist_high_level_details(artist_id):
    '''Get High Level Artist Details including name and image URL'''
    headers = {'Authorization': f'Bearer {get_newest_auth()}'}
    artist = requests.get(
        f"{os.environ['apple_artist_details_url']}artists/{artist_id}",
        headers=headers,
        timeout=5
    )
    if artist.status_code != 200:
        headers = {'Authorization': f"Bearer  {get_auth_token()}"}
        artist = requests.get(f"{os.environ['apple_artist_details_url']}artists/{artist_id}",
                      headers=headers,
                      timeout=5
                    )
    artist_data = artist.json()['data'][0]['attributes']
    return {
        'name': artist_data['name'],
        'image_url': artist_data['artwork']['url']
    }


def check_substrings(string, substrings):
    '''Substring check. Used to filter out playlists that do not have useful data.'''
    return any(sub in string for sub in substrings)

def top_songs_list_builder(artist_id):
    '''Create top songs list'''
    top_songs_list = []
    headers = {'Authorization': f"Bearer {get_newest_auth()}"}
    # Add songs based on playlists in apple
    # Remove playlists with the following words in the name (video, influences, inspired)
    playlists_request = requests.get(
      f"{os.environ['apple_artist_details_url']}artists/{artist_id}/view/featured-playlists",
      headers=headers,
      timeout=5
    )
    playlists = playlists_request.json()
    artist_playlist_ids = []
    if "errors" not in playlists:
        for item in playlists['data']:
            if check_substrings(
                item['attributes']['name'],
                ['Essentials', 'Deep Cuts', 'Set List']
              ):
                artist_playlist_ids.append(item['id'])
    # Get Multiple playlists
    playlists_content = requests.get(
       f'https://api.music.apple.com/v1/catalog/us/playlists?ids={",".join(artist_playlist_ids)}',
       headers=headers,
       timeout=5
    )
    # Add playlist content to top_songs_list
    if playlists_content.status_code == 200:
        for song_list in playlists_content.json()['data']:
            for song in song_list['relationships']['tracks']['data']:
                top_songs_list.append(song)
    # loop by intervals of 10
    for i in range(0,100,10):
        r = requests.get(
          f"{os.environ['apple_artist_details_url']}artists/{artist_id}/view/top-songs?offset={i}",
          headers=headers,
          timeout=5
        )
        if 'errors' in r.json().keys():
            break
        for song in r.json()['data']:
            top_songs_list.append(song)

    # Remove duplicates
    final_top_songs_list = []
    for song in top_songs_list:
      # Do not add music-videos to list
        if song['type'] == 'music-videos':
            continue
        if song not in final_top_songs_list:
            final_top_songs_list.append(song)
    return final_top_songs_list

def featured_album_details(artist_id):
    '''This function gets album details for an artist'''
    # {os.environ['apple_artist_details_url']}artists/15031628/albums
    headers = {'Authorization': f'Bearer {get_newest_auth()}'}
    albums = requests.get(
        f"{os.environ['apple_artist_details_url']}artists/{artist_id}/view/featured-albums",
        headers=headers,
        timeout=5
    )
    return albums.json()

def add_weight_to_songs(songs_list, albums_list):
    '''
    Clean up of songs list
    This method is here for situations where artist name does not line up appropriately.
    '''
    albums_name_list = []
    for album in albums_list:
        albums_name_list.append(album['attributes']['name'])
    for idx, song in enumerate(songs_list):
        song['rank'] = idx + 1
        song['featured_album'] = song['attributes']['albumName'] in albums_name_list
    # Remove objects with the attribute 'has_attribute' set to True
    return songs_list
