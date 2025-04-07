from celery import shared_task
import time

@shared_task
def fetch_artist_data(artist_name):
  print("fetch_artist_data")
  time.sleep(10)
  return {"artist": artist_name, "status": "fetched"}

@shared_task
def add(x, y):
  return x + y