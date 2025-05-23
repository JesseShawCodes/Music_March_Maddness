import os

from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'madness_backend.settings')

app = Celery('madness_backend')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()

# Prevent worker_state_db crash in production
# app.conf.worker_state_db = None  # Or use '/tmp/celery_worker_state.db'

def debug_task(self):
    print(f'Request: {self.request!r}')