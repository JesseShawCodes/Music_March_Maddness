# March Maddness - React/Flask/WebSocket/Postgresql App

This is the foundation for a March Madness Music App, but is also used as a place to test a lot of various services. Sorry if it's a bit messy :-)

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