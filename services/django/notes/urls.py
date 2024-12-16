from django.urls import path

from . import views

urlpatterns = [
  path('notes', views.NotesListView.as_view(), name="notes.list"),
  path('notes/<int:pk>', views.DetailView.as_view(), name="notes.detail"),
]