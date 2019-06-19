DROP DATABASE IF EXISTS smartTrainer;

CREATE DATABASE smartTrainer;

DROP TABLE IF EXISTS athletes;

DROP TABLE IF EXISTS exercises;

\c smarttrainer;

CREATE TABLE IF NOT EXISTS athletes (
  id SERIAL UNIQUE PRIMARY KEY,
	goal text NOT NULL,
  username text UNIQUE NOT NULL,
	password varchar(100) NOT NULL,
	salt varchar(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS metrics (
	athleteid INTEGER REFERENCES athletes(id),
	weight FLOAT NOT NULL,
	height FLOAT NOT NULL,
	bodyFat FLOAT NOT NULL,
	entryDate INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL UNIQUE PRIMARY KEY,
  exerciseName text NOT NULL,
  mainTarget text NOT NULL,
  synergists text ARRAY,
	video varchar (100) NOT NULL
);

CREATE INDEX athlete_id ON athletes (id);

CREATE INDEX exercises_id ON exercises (id);

CREATE INDEX foreign_id ON metrics (athleteid);

CREATE INDEX date_order ON metrics (entryDate);

CREATE INDEX exercise_names ON exercises (exerciseName);

CREATE INDEX exercise_groups ON exercises (mainTarget);

/* run psql -U YOUR_USER_NAME -W < db/schema.sql
from the root directory and enter your password for the prompts 
change lines 20, 22 to absolute paths for respective restaurant and reservation csv raw data files*/