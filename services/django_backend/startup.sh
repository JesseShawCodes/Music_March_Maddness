#!/bin/bash
python3 manage.py collectstatic && gunicorn --workers 2 apple_search.wsgi