from django.shortcuts import render
from django.http import Http404
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .forms import NotesForm

# Create your views here.

from .models import Notes

class NotesListView(ListView):
  model = Notes
  context_object_name = "notes"
  template_name = "notes/notes_list.html"

class DetailView(DetailView):
  model = Notes
  context_object_name = "note"

class NotesCreateView(CreateView):
  model = Notes
  success_url = '/smart/notes'
  form_class = NotesForm

class NotesUpdateView(UpdateView):
  model = Notes
  success_url = '/smart/notes'
  form_class = NotesForm

class NotesDeleteView(DeleteView):
  model = Notes
  success_url = '/smart/notes'
