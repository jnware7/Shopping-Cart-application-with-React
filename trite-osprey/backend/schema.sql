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

INSERT INTO beermo ( brewery, beername, image, price, category, description, abu)
  VALUES ('Lagunitas', 'India Pale Ale', 'India_Pale_Ale', 5, 'IPA', 'A great beer', 5),
  ('Modelo', 'Especial', 'Especial', 5, 'Lager', 'The best mexican beer ever', 4),
  ('Pabst', 'Blue Ribbon', 'Pabst_Blue_Ribbon', 4, 'Ale', 'A cheap beer', 4),
  ('Lost Coast', '8 Ball Stout', '8Ball', 6, 'Stout', 'A great stout', 6),
  ('Lost Coast', 'Downtown Brown', 'DowntownBrown', 6, 'Brown Ale', 'A great brown ale', 6),
  ('Lost Coast', 'Great White', 'GreatWhite', 6, 'Heffeweizen', 'A great heffeweizen', 6),
  ('Lost Coast', 'Indica', 'Indica', 6, 'IPA', 'A great IPA', 6),
  ('Tecate', 'Original', 'Tecate', 3, 'Ale', 'A cheap mexican beer', 4),
    ('North Coast Brewing ', 'Brother Thelonious','brother-thelonious', 12, 'Belgian Ale', 'this beer is rich and robust', 9.4)

  -- ('Modelo', 'Especial', 3, 'Especial'),('Pabst', 'Blue Ribbon', 6, 'Pabst_Blue_Ribbon')
