"""
Settings extension to be used for production.
"""

import os
import dj_database_url
import sentry_sdk

from core.settings.base import *
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn=os.getenv('SENTRY_DSN'),
    integrations=[DjangoIntegration()],
    traces_sample_rate=1.0,
    send_default_pii=True
)

# project directory
ROOT_DIR = BASE_DIR.parent.parent

SECRET_KEY = os.getenv('SECRET_KEY')

ALLOWED_HOSTS = [os.getenv("PROD_HOST")]

DEBUG = False

CORS_ALLOW_ALL_ORIGINS = False

INSTALLED_APPS.extend(["whitenoise.runserver_nostatic"])

# whitenoise middle - has to be first in the list
MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

# directories with templates or html files
TEMPLATES[0]["DIRS"] = [os.path.join(ROOT_DIR, "frontend", "build")]

# directory where Django can find html, js, css, and other static assets
STATICFILES_DIRS = [os.path.join(ROOT_DIR, "frontend", "build", "static")]

# type of static files storage
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

# directory to which Django will move those static assets and from which it
# will serve them when the app is running
STATIC_ROOT = os.path.join(ROOT_DIR, "staticfiles")

STATIC_URL = "/static/"

# directory where WhiteNoise can find all non-html static assets
WHITENOISE_ROOT = os.path.join(ROOT_DIR, "frontend", "build", "root")

# database url set at env variable in Heroku
DATABASE_URL = os.getenv('DATABASE_URL')

# db config
db_from_env = dj_database_url.config(
    default=DATABASE_URL, conn_max_age=500, ssl_require=True
)

DATABASES = {
    'default': db_from_env
}

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
