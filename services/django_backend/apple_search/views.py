from django.http import JsonResponse
from apple_search.artist_search import artist_search
from apple_search.artist_page import artist_content
from apple_search.tasks import fetch_artist_data

def artist_search_view(request):
    data = artist_search(f"{request.GET.get('q', '')}")
    task = fetch_artist_data.delay(data)
    return JsonResponse({"task_id": task.id, "status": "queued"})

def artist_page_view(request, artist_id):
    data = {
        "artist_id": artist_id
    }
    data = artist_content(artist_id)
    return JsonResponse(data)