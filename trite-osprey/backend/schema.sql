DROP DATABASE IF EXISTS beermo;
CREATE DATABASE beermo;

\c beermo;

DROP TABLE IF EXISTS beermo;
CREATE TABLE beermo (
  id SERIAL PRIMARY KEY,
  brewery VARCHAR,
  beername VARCHAR NOT NULL,
  image VARCHAR,
  price INT NOT NULL,
  category VARCHAR,
  description VARCHAR,
  abu DECIMAL
);

INSERT INTO beermo (brewery, beername, price, image)
  VALUES ('Lagunitas', 'IPA', 5, 'India_Pale_Ale'),('Modelo', 'Especial', 3, 'Especial'),('Pabst', 'Blue Ribbon', 6, 'Pabst_Blue_Ribbon')
