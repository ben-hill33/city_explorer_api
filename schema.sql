-- assume we have a db created
-- automate the stuff in the cli


-- if the user inputs a new valid location then the results will be requested from each individual API, "if not previously cached" then the results will be cached in a SQL database for future retrieval.
-- given that a user enters a "previously-used" valid location in the input
DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  formatted_query VARCHAR(255),
  latitude VARCHAR(255),
  longitude VARCHAR(255),
  search_query VARCHAR(255) 
);