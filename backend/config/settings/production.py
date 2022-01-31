from .base import *
from decouple import config


DEBUG=False


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('db_NAME'),
        'USER': config('db_USER'),
        'PASSWORD':config('db_PASSWORD'),
        'HOST': 'db',
        'PORT': 5432,
    }
}



EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'


EMAIL_HOST = config('EMAIL_HOST')

# Port for sending e-mail.
EMAIL_PORT = config('EMAIL_PORT')

# Optional SMTP authentication information for EMAIL_HOST.
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = False