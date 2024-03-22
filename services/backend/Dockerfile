FROM python:3.9-slim-buster

# set working directory
WORKDIR /usr/src/Music_March_Madness_App

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV FLASK_APP=app

# install system dependencies
RUN apt-get update \
  && apt-get -y install netcat gcc postgresql \
  && apt-get clean

# add and install requirements
COPY ./requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip3 install psycopg2-binary
RUN pip3 install sqlalchemy


# add entrypoint.sh
COPY ./entrypoint.sh /usr/src/Music_March_Madness_App/entrypoint.sh
RUN chmod +x /usr/src/Music_March_Madness_App/entrypoint.sh

# add app
COPY . .

CMD ["python","app.py"]