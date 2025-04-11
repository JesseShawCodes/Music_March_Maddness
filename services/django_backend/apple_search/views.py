from django.http import JsonResponse
from apple_search.artist_search import artist_search
from apple_search.artist_page import artist_content
from apple_search.tasks import fetch_artist_data

from celery.result import AsyncResult

def artist_search_view(request):
    data = artist_search(f"{request.GET.get('q', '')}")
    # Potential task functions / returns
    # task = fetch_artist_data.delay(data)
    # return JsonResponse({"task_id": task.id, "status": "queued"})
    return JsonResponse(data)

def artist_page_view(request, artist_id):
    data = {
        "artist_id": artist_id
    }
    data = artist_content(artist_id)
    return JsonResponse(data)

def task_status_view(request):
    print(request)
    result = AsyncResult(f"{request.GET.get('q', '')}")
    print(result)
    if result.ready():
      print("TESTING")
      return JsonResponse({
          "status": result.status,
          "result": result.result
      })

    
    return JsonResponse({"status": result.status, "request_id": request.GET.get('q', '')})