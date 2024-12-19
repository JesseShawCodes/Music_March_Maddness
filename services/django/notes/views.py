from django.shortcuts import render
from django.http import Http404, HttpResponseRedirect
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .forms import NotesForm
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.

from .models import Notes

class NotesListView(ListView, LoginRequiredMixin):
  model = Notes
  context_object_name = "notes"
  template_name = "notes/notes_list.html"
  login_url = "/admin"

  def get_queryset(self):
    return self.request.user.notes.all()

class DetailView(DetailView):
  model = Notes
  context_object_name = "note"

class NotesCreateView(CreateView):
  model = Notes
  success_url = '/smart/notes'
  form_class = NotesForm

  def form_valid(self, form):
    # return super().form_valid(form)
    self.object = form.save(commit=False)
    self.object.user = self.request.user
    self.object.save()
    return HttpResponseRedirect(self.get_success_url())

class NotesUpdateView(UpdateView):
  model = Notes
  success_url = '/smart/notes'
  form_class = NotesForm

class NotesDeleteView(DeleteView):
  model = Notes
  success_url = '/smart/notes'
