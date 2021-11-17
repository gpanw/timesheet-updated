#!/bin/sh
echo "running Django timesheet application"

cd /timesheet/src/

chmod +x scripts/runDjango.sh

export DATABASE_URL=`curl http://169.254.169.254/latest/meta-data/local-ipv4`

echo "running collectstatics!!!"
'yes'|python manage.py collectstatic

echo "running makemigrations!!!"
python manage.py makemigrations

echo "running migrate!!!"
python manage.py migrate

echo "start application"
gunicorn timesheet.wsgi:application --bind 0.0.0.0:$PORT