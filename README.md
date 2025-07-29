# March Maddness - React/Flask/WebSocket/Postgresql App

This is the foundation for a March Madness Music App, but is also used as a place to test a lot of various services. Sorry if it's a bit messy :-)

This application can be tested at the link below:
https://dadgad.netlify.app/

## Services

### Backend

Backend of application built using Django Framework. Work in Progress

To start server

```
cd services/django_backend
python3 manage.py runserver
```

### DB

Database Service using MySQL. MySQL container is currently ran locally via Docker. Working on setting up an AWS Hosted MySQL database.

If you have docker:

```
docker compose up -d
```

This starts redis and a Mysql database


### Front End

Front end React Application

To start Front End

```
cd services/frontend
npm install
npm start
```

### Django documentation
https://www.djangoproject.com/

### Testing

#### Django

To run tests and generate a coverage report
```
coverage run manage.py test
```

To view coverage report
```
coverage report
```

### Celery
Start Celery from the django_backend/madness_backend folder
```
celery -A madness_backend worker --concurrency=4 --loglevel=DEBUG
```

### Environment Variables

```
export apple_search_url="https://api.music.apple.com/v1/catalog/us/search?term="
apple_artist_details_url="https://api.music.apple.com/v1/catalog/us/"
UPSTASH_REDIS_URL="redis://localhost:6379/0"
```

