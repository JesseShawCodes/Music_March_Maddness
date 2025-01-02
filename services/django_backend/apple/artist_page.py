'''Data Collection for artist page'''
import requests
from apple.auth import get_auth_token

def artist_content(artist_id):
    '''Final render of output to the page'''
    output = {}
    output['top_songs_list'] = top_songs_list_builder(artist_id)
    output['count'] = f"{len(output['top_songs_list'])}"
    return output

def check_substrings(string, substrings):
    '''Substring check. Used to filter out playlists that do not have useful data.'''
    return any(sub in string for sub in substrings)

def playlist_request_url(artist_id):
    '''Method to return proper url for API calls'''
    return f"https://api.music.apple.com/v1/catalog/us/artists/{artist_id}/view/featured-playlists"

def top_songs_list_builder(artist_id):
    '''Create top songs list'''
    top_songs_list = []
    headers = {'Authorization': f"Bearer  {get_auth_token()}"}
    # Add songs based on playlists in apple
    # Remove playlists with the following words in the name (video, influences, inspired)
    playlists_request = requests.get(
      f"https://api.music.apple.com/v1/catalog/us/artists/{artist_id}/view/featured-playlists",
      headers=headers,
      timeout=5
    )
    if playlists_request.status_code != 200:
        headers = {'Authorization': f"Bearer  {get_auth_token()}"}
        r = requests.get(f"https://api.music.apple.com/v1/catalog/us/artists/{artist_id}/view/featured-playlists",
                      headers=headers,
                      timeout=5
                    )
    playlists = playlists_request.json()
    artist_playlist_ids = []
    for item in playlists['data']:
        if check_substrings(item['attributes']['name'], ['Essentials', 'Deep Cuts', 'Set List']):
            artist_playlist_ids.append(item['id'])
        else:
            print("OTHER")
    # Get Multiple playlists
    # https://api.music.apple.com/v1/catalog/us/playlists?ids=pl.b8afd0ec852542f785a5f7a4a9a80d6a,pl.e5bc0180234b40639b5fb6aeb3c6ff68,pl.9c2961c0bd034974a954fa788f7eac3b,pl.34a41c73937e4994a8a5cdc243e917cc,pl.76e456b18b78484fa1aa8e310362ab35
    playlists_content = requests.get(
       f'https://api.music.apple.com/v1/catalog/us/playlists?ids={",".join(artist_playlist_ids)}',
       headers=headers,
       timeout=5
    )
    # loop by intervals of 10
    for i in range(0,100,10):
        r = requests.get(
            f"https://api.music.apple.com/v1/catalog/us/artists/{artist_id}/view/top-songs?offset={i}",
            headers=headers,
            timeout=5
        )
        if 'errors' in r.json().keys():
            break
        for song in r.json()['data']:
            top_songs_list.append(song)
    # Add playlist content to top_songs_list
    for song_list in playlists_content.json()['data']:
        for song in song_list['relationships']['tracks']['data']:
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

def album_details():
    '''This function gets album details for an artist'''
    return "Album details"
