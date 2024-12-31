from django.http import JsonResponse
from apple.artist_search import artist_search

def artist_search_view(request):
    data = artist_search(f"{request.GET.get('q', '')}")
    return JsonResponse(data)