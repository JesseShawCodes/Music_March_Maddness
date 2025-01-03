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

### Sportify Specific Resources

https://github.com/firebase/functions-samples/tree/main/Node-1st-gen/spotify-auth
https://cgarethc.medium.com/using-the-spotify-api-with-firebase-to-build-an-album-centric-music-manager-9a53709b7c4f

https://codesandbox.io/p/sandbox/hackathon-discovery-uvkht?file=%2Fsrc%2Fforms%2Fpayments.js

### Django documentation
https://www.djangoproject.com/

### Connect django app to a dockerized postgresql
https://dev.to/mojemoron/how-to-connect-your-django-app-to-a-dockerized-postgresql-and-pgadmin-133o

### New Features
Progress Bar for rating songs
