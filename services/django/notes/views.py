from django.shortcuts import render

# Create your views here.

from .models import Notes

def list(request):
  all_notes = Notes.objects.all()
  return render(request, 'notes/notes_list.html', {'notes': all_notes})

def detail(request, pk):
  note = Notes.objects.get(pk=pk)
  return render(request, 'notes/note_details.html', {'note': note})
