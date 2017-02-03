DROP DATABASE IF EXISTS beermo;
CREATE DATABASE beermo;

\c beermo;

DROP TABLE IF EXISTS beermo;
CREATE TABLE beermo (
  id SERIAL PRIMARY KEY,
  Brewery VARCHAR,
  Beername VARCHAR NOT NULL,
  Price INT NOT NULL,
  Category VARCHAR,
  Description VARCHAR,
  ABU DECIMAL
);

INSERT INTO beermo (Brewery, Beername, Price)
  VALUES ('Lagunitas', 'IPA', 5)
