import os

from celery import Celery

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'madness_backend.settings')

app = Celery('madness_backend')

app.config_from_object('django.conf:settings', namespace='CELERY')

# Discover tasks
app.autodiscover_tasks()

# Prevent worker_state_db crash in production
app.conf.worker_state_db = None  # Or use '/tmp/celery_worker_state.db'