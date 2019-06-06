DROP DATABASE IF EXISTS smartTrainer;

CREATE DATABASE smartTrainer;

DROP TABLE athletes;

DROP TABLE exercises;

\c smartTrainer;

CREATE TABLE IF NOT EXISTS athletes (
  id SERIAL UNIQUE PRIMARY KEY,
	goal text NOT NULL,
  username UNIQUE text NOT NULL,
	password varchar(100) NOT NULL,
	salt varchar(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS metrics (
	athleteid INTEGER REFERENCES athletes(id),
	weight FLOAT NOT NULL,
	height FLOAT NOT NULL,
	bodyFat FLOAT NOT NULL,
	entryDate INTEGER NOT NULL,
)

CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL UNIQUE PRIMARY KEY,
  exerciseName text NOT NULL,
  mainTarget text NOT NULL,
  synergists text[],
	video varchar(100)
);

COPY physicians(id, physicianName) FROM 'G:\physicians.csv' (FORMAT CSV);

COPY appointments(physicianid, appNumber, appName, appType, appDate, appTime) FROM 'G:\patients.csv' (FORMAT CSV);

CREATE INDEX athlete_id ON athletes (id);

CREATE INDEX exercises_id ON exercises (id);

CREATE INDEX foreign_id ON appointments (physicianid);

CREATE INDEX date_order ON metrics (entryDate);

CREATE INDEX exercise_names ON exercises (exerciseName);

CREATE INDEX exercise_groups ON exercises (mainTarget);