CREATE DATABASE firstapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

INSERT INTO users(name,email) VALUES('Mike Towers','miketowers@gmail.com');
INSERT INTO users(name,email) VALUES('Kenneth Johnson','kennethjohnson@gmail.com');