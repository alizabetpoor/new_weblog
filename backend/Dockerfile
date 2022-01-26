FROM python:3.9-slim-buster
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY requirements.txt requirements.txt
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip3 install -U pip setuptools wheel ruamel.yaml.clib==0.2.6
RUN pip3 install -r requirements.txt
COPY . .
RUN python manage.py collectstatic