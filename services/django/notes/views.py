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
  context_object_name = "notes"
  
def detail(request, pk):
  try:
    note = Notes.objects.get(pk=pk)
  except:
    raise Http404("Note Does Not Exist")
  return render(request, 'notes/note_details.html', {'note': note})
