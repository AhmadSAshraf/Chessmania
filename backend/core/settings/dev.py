"""
Settings extension to be used for development.
"""

import os
from core.settings.base import *

DEBUG = True

# 'backend' is the name of the container attributed in docker-compose file.
ALLOWED_HOSTS = ['backend', 'localhost', '127.0.0.1']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', default='postgres'),
        'USER': os.getenv('DB_USER', default='postgres'),
        'PASSWORD': os.getenv('DB_PASSWORD', default='postgres'),
        'HOST': os.getenv('DB_HOST', default='localhost'),
        'PORT': '5432'
    }
}
