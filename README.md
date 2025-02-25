# March Maddness - React/Flask/WebSocket/Postgresql App

This is the foundation for a March Madness Music App, but is also used as a place to test a lot of various services. Sorry if it's a bit messy :-)

## Services

### Backend

Backend of application built using Django Framework. Work in Progress

### DB

Database Service using postgresql

### Front End

Front end React Application


### Pandas Virtual Environment (pandas_venv)

```
python3 -m venv pandas-workspace
```

Start Envionment

```
source bin/activate
```

install dependencies
```
pip3 install pandas
```

```
pip3 install jupyter
```

```
pip3 install matplotlib
```

```
pip3 install sqlalchemy
```

Start up Jupyter Notebook
```
jupyter notebook
```

1. Navigate to one of the urls listed in the log
2. Create New Python3 to open a new notebook.

#### Set DB Environment Variable for sqlite file

```
export DB_URI="sqlite:///filename.sqlite"
```

### Django documentation
https://www.djangoproject.com/

### Connect django app to a dockerized postgresql
https://dev.to/mojemoron/how-to-connect-your-django-app-to-a-dockerized-postgresql-and-pgadmin-133o

### New Features
Progress Bar for rating songs

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