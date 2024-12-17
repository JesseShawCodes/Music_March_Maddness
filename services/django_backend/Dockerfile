# syntax=docker/dockerfile:1
FROM python:3.10.14-slim-bullseye

# set working directory
WORKDIR /usr/src/Music_March_Madness_App

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# install system dependencies
RUN apt-get update \
  && apt-get -y install netcat gcc postgresql \
  && apt-get clean

# add and install requirements
COPY ./requirements.txt .

RUN pip install -r requirements.txt
RUN pip install --upgrade pip
RUN pip3 install psycopg2-binary

# add entrypoint.sh
# COPY ./entrypoint.sh /usr/src/Music_March_Madness_App/entrypoint.sh
# RUN chmod +x /usr/src/Music_March_Madness_App/entrypoint.sh

COPY . .