"""
Django settings for timesheet project.

Generated by 'django-admin startproject' using Django 1.11.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os
import environ

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env = environ.Env()
env.read_env() 


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
#SECRET_KEY = '8in#o9kk4_3tto#_#0@3@es23w-8=t(m2*$2jog^i9$cyp%i$&'
SECRET_KEY = env.str('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG', default=False)

#ALLOWED_HOSTS = ['myotes.com','www.myotes.com','myotes.herokuapp.com']
ALLOWED_HOSTS=['timesheet.gpanw.com']

# Application definition

INSTALLED_APPS = [
    'priortime.apps.PriortimeConfig',
    'leave.apps.LeaveConfig',
    'login.apps.LoginConfig',
    'current.apps.CurrentConfig',
    'project.apps.ProjectConfig',
    'userprofile.apps.UserprofileConfig',
    #'reports.apps.ReportsConfig',
    #'approvals.apps.ApprovalsConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    #'crispy_forms',
    'rest_framework',
    #app to store static files in s3
    'storages',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'timesheet.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR), "template"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'timesheet.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases
DATABASE_URL=env.str('DATABASE_URL', default='localhost')
DATABASE_NAME=env.str('DATABASE_NAME')
DATABASE_USER=env.str('DATABASE_USER')
DATABASE_PASS=env.str('DATABASE_PASS')
DATABASE_PORT=env.str('DATABASE_PORT')
if os.getenv('DATABASE_URL'):
    pass
else:
    DATABASE_URL='postgres.timesheet.com'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': DATABASE_NAME,
        'USER': DATABASE_USER,
        'HOST': DATABASE_URL,
        'PASSWORD': DATABASE_PASS,
        'PORT': DATABASE_PORT,
    }
}

#import dj_database_url
#db_from_env = dj_database_url.config()
#DATABASES['default'].update(db_from_env)


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

#S3 Bucket Config
AWS_ACCESS_KEY_ID = env.str('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = env.str('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME  = env.str('AWS_STORAGE_BUCKET_NAME')
AWS_DEFAULT_ACL = None
STATICFILES_LOCATION = 'timesheet/static'
MEDIAFILES_LOCATION = 'timesheet/media'
DEFAULT_FILE_STORAGE = 'custom_storages.MediaStorage'
STATICFILES_STORAGE = 'custom_storages.StaticStorage'
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
#STATIC_URL = '/static/'
if DEBUG:
    STATIC_URL = 'https://%s/%s/' % (AWS_S3_CUSTOM_DOMAIN,'timesheet')
else:
    STATIC_URL = '/static/our_static/'
STATIC_ROOT = os.path.join(BASE_DIR, "live-static", "static-root")

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static_in_pro", "our_static"),
    #os.path.join(BASE_DIR, "static_in_env"),
    #'/var/www/static/',
)

EMAIL_HOST = 'smtp.mailgun.org'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'postmaster@sandboxc47276f73a5345bea39a7e3f8f8bf688.mailgun.org'
EMAIL_HOST_PASSWORD = 'edbd6960d7d5976dc2f76f840374d0f8'
EMAIL_USE_TLS = True

#STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "live-static", "media-root")

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    #'DEFAULT_PARSER_CLASSES': [
    #    'rest_framework.parsers.JSONParser',
    #    'rest_framework.parsers.FormParser',
    #    'rest_framework.parsers.MultiPartParser'
    #]
    'DEFAULT_AUTHENTICATION_CLASSES': [
    #    'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication'
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated'
    ]
}

CACHE_HOST='127.0.0.1'
CACHE_PORT=11211
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': f'{DATABASE_URL}:{CACHE_PORT}',
    }
}


