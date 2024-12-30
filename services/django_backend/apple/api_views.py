from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend
from apple.serializer import AppleSerializer
from rest_framework.filters import SearchFilter
from rest_framework.pagination import LimitOffsetPagination

from apple.models import AppleAuth

class AppleAuthPagination(LimitOffsetPagination):
  default_limit = 10
  max_limit = 100

class AppleAuthListView(ListAPIView):
  queryset = AppleAuth.objects.all()
  serializer_class = AppleSerializer
  filter_backends = [DjangoFilterBackend, SearchFilter]
  filterset_fields = ['id']
  search_fields = ['auth']
  pagination_class = AppleAuthPagination
