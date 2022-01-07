from config.settings.base import *
from decouple import config


#override base settings here

DEBUG=False


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

# Host for sending e-mail.
EMAIL_HOST = config('EMAIL_HOST')

# Port for sending e-mail.
EMAIL_PORT = config('EMAIL_PORT')

# Optional SMTP authentication information for EMAIL_HOST.
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = False