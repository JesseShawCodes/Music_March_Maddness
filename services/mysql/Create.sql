CREATE DATABASE music_march_madness;

CREATE USER 'user'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' IDENTIFIED BY "password";
