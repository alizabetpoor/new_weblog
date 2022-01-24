from config.settings.base import *
from decouple import config


#override base settings here

DEBUG=True


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('db_name'),
        'USER': config('db_user'),
        'PASSWORD':config('db_pass'),
        'HOST': 'db',
        'PORT': 5432,
    }
}
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'