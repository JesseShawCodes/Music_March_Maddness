from django.shortcuts import render
from django.http import Http404
from django.views.generic import ListView, DetailView
# Create your views here.

from .models import Notes

class NotesListView(ListView):
  model = Notes
  context_object_name = "notes"
  template_name = "notes/notes_list.html"

class DetailView(DetailView):
  model = Notes
  context_object_name = "note"
