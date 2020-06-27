-- assume we have a db created
-- automate the stuff in the cli

DROP TABLE IF EXISTS cities;

CREATE table cities (
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  formatted_query VARCHAR(255),
  latitude VARCHAR(255),
  longitude VARCHAR(255)
)