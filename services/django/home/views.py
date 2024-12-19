from django.shortcuts import render
from django.http import HttpResponse
from datetime import datetime
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic.edit import CreateView
from django.contrib.auth.forms import UserCreationForm

from django.shortcuts import redirect

class HomeView(TemplateView):
  template_name = 'home/welcome.html'
  extra_content = {'today': datetime.today()}

class AuthorizedView(LoginRequiredMixin, TemplateView):
  template_name = "home/authorize.html"
  login_url = "/admin"

class LoginInterfaceView(LoginView):
  template_name = "home/login.html"

class LogoutInterfaceView(LogoutView):
  template_name = "home/logout.html"

class SignupView(CreateView):
  form_class = UserCreationForm
  template_name = "home/register.html"
  success_url = "/smart/notes"

  def get(self, request, *args, **kwargs):
    if self.request.user.is_authenticated:
      return redirect('notes.list')
    return super().get(request, *args, **kwargs)