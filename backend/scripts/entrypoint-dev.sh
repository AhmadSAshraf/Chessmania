#!/bin/bash

while ! nc -z db 5432; do
  sleep 0.1
done

python manage.py makemigrations

python manage.py migrate

gunicorn core.wsgi --bind 0.0.0.0:8000 --reload