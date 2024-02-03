--for help  \?
--list database \l
-- connect to database \c
--Create database CREATE DATABASE heregoesthenameofthedatabase
-- list all tables \d

CREATE TABLE products (
id INT,
name VARCHAR(50),
price INT,
on_sale boolean

);
ALTER TABLE products ADD COLUMN featured boolean;
ALTER TABLE products DROP COLUMN featured;

CREATE TABLE cards (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 and price_range <=5)
);
INSERT INTO cards (name, location, price_range) values ('Dr. Boom', 'Goblins vs. Gnomes', 5);